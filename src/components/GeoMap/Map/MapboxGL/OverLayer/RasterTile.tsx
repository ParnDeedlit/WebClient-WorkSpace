import * as React from 'react';
import * as MapboxGL from 'mapbox-gl';
import { withMap } from '../Global/context';
import { RasterTileLayer, RasterTileStyle, defaultRasterTileStyle } from '../../../../../utilities/map/rastertile';

interface IProps {
    map: MapboxGL.Map;
    rastertile: RasterTileLayer;
    style?: RasterTileStyle;
    before?: string;
}

interface IStates {

}

export class RasterTile extends React.Component<IProps, IStates> {
    public state: IStates = {

    };

    constructor(props) {
        super(props);
    }

    onStyleDataChange() {
        //throw new Error("Method not implemented.");
    }

    parsePaint(style: RasterTileStyle) {
        return {
            "raster-opacity": style.opacity,
            "raster-hue-rotate": style.hue,
        }
    }

    parseLayout(style: RasterTileStyle) {
        return {
            "visibility": style.visible ? "visible" : "none",
        }
    }

    private createLayer = () => {
        let { map, rastertile, before, style } = this.props

        if (!style) style = defaultRasterTileStyle;
        let paint = this.parsePaint(style);
        let layout = this.parseLayout(style);

        const { id, tileUrl, url } = rastertile;
        if (!id || !(url || tileUrl)) return;

        map.addSource(id, {
            "type": "raster",
            "tiles": [url || tileUrl],
            "minZoom": 0,
            "maxZoom": 20
        });

        map.addLayer({
            "id": id,
            "type": "raster",
            "source": id,
            "layout": layout,
            "paint": paint,
            "minzoom": 0,
            "maxzoom": 20
        }, before);
    };

    private changeLayerStyle(style: RasterTileStyle) {
        const { map, rastertile } = this.props;
        map.setPaintProperty(rastertile.id, "raster-opacity", style.opacity);
        map.setPaintProperty(rastertile.id, "raster-hue-rotate", style.hue);

        let visible = style.visible ? 'visible' : 'none';
        map.setLayoutProperty(rastertile.id, "visibility", visible);
    }

    private bind() {
        this.createLayer();
    }

    private unbind() {
        const { map, rastertile } = this.props;

        map.off('styledata', this.onStyleDataChange);

        if (map.getSource(rastertile.id)) {
            const { layers } = map.getStyle();

            if (layers) {
                layers
                    .filter(layer => layer.source === rastertile.id)
                    .forEach(layer => map.removeLayer(layer.id));
            }

            map.removeSource(rastertile.id);
        }
    }

    public componentWillMount() {
        const { map } = this.props;
        this.bind();
        map.on('styledata', this.onStyleDataChange);
    }

    public componentWillUnmount() {
        const { map } = this.props;

        if (!map || !map.getStyle()) {
            return;
        }

        this.unbind();
    }

    public componentWillReceiveProps(nextProps: IProps) {
        if (this.props.style != nextProps.style) {
            this.changeLayerStyle(nextProps.style);
        }
    }

    public render() {
        return null;
    }
}

export default withMap(RasterTile);