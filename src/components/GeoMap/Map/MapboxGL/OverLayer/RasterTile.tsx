import * as React from 'react';
import * as MapboxGL from 'mapbox-gl';
import { withMap } from '../Global/context';
import { RasterTileLayer, RasterTileStyle, defaultRasterTileStyle, RasterTileLayout, defaultRasterTileLayout } from '../../../../../utilities/map/rastertile';
import { deepEqual } from '../../../../../utilities/deepequal';


interface IProps {
    map: MapboxGL.Map;
    rastertile: RasterTileLayer;
    style?: RasterTileStyle;
    layout?: RasterTileLayout;
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

    parseLayout(layout: RasterTileLayout) {
        return {
            "visibility": layout.visible ? "visible" : "none",
        }
    }

    private createLayer = () => {
        let { map, rastertile, before, style, layout } = this.props

        if (!style) style = defaultRasterTileStyle;
        if (!layout) layout = defaultRasterTileLayout;

        let paintValue = this.parsePaint(style);
        let layoutValue = this.parseLayout(layout);

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
            "layout": layoutValue,
            "paint": paintValue,
            "minzoom": 0,
            "maxzoom": 20
        }, before);
    };

    private changeLayerStyle(style: RasterTileStyle) {
        const { map, rastertile } = this.props;
        map.setPaintProperty(rastertile.id, "raster-opacity", style.opacity);
        map.setPaintProperty(rastertile.id, "raster-hue-rotate", style.hue);
    }

    private changeLayerLayout(layout: RasterTileLayout) {
        const { map, rastertile } = this.props;
        let visible = layout.visible ? 'visible' : 'none';
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
        if (nextProps.style) {
            this.changeLayerStyle(nextProps.style);
            /* if (!deepEqual(this.props.style, nextProps.style)) {
                console.log("!deepqual-style", this.props.style, nextProps.style);
            } */
        }

        if (nextProps.layout) {
            this.changeLayerLayout(nextProps.layout);
            /* if (!deepEqual(this.props.layout, nextProps.layout)) {
                console.log("!deepqual-layout", this.props.style, nextProps.style);
                this.changeLayerLayout(nextProps.layout);
            } */
        }
    }

    public render() {
        return null;
    }
}

export default withMap(RasterTile);