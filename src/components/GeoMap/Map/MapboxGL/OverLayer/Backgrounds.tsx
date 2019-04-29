import * as React from 'react';
import * as MapboxGL from 'mapbox-gl';
import { withMap } from '../Global/context';
import { BackGroundLayer, BackGroundStyle, defaultBackGroundStyle } from '../../../../../utilities/map/background';

interface IBackgroundsProps {
    map: MapboxGL.Map;
    background: BackGroundLayer;
    style?: BackGroundStyle;
    before?: string;
}

interface IBackgroundsStates {

}

export class Backgrounds extends React.Component<IBackgroundsProps, IBackgroundsStates> {
    public state: IBackgroundsStates = {

    };

    constructor(props) {
        super(props);
    }

    onStyleDataChange() {
        //throw new Error("Method not implemented.");
    }

    parsePaint(style: BackGroundStyle) {
        return {
            "raster-opacity": style.opacity,
            "raster-hue-rotate": style.hue,
        }
    }

    parseLayout(style: BackGroundStyle) {
        return {
            "visibility": style.visible ? "visible" : "none",
        }
    }

    getFirstLayer() {
        const { map } = this.props;
        if (!map) return undefined
        const layers = map.getStyle().layers;
        if (layers.length <= 0) return undefined
        return layers[0].id;
    }

    private createLayer = () => {
        let { map, background, before, style } = this.props
        let layerTop = this.getFirstLayer();

        before = layerTop ? layerTop : before;

        if (!style) style = defaultBackGroundStyle;
        let paint = this.parsePaint(style);
        let layout = this.parseLayout(style);

        const { id, tileUrl, url } = background;
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

    private changeLayerStyle(style: BackGroundStyle) {
        const { map, background } = this.props;
        map.setPaintProperty(background.id, "raster-opacity", style.opacity);
        map.setPaintProperty(background.id, "raster-hue-rotate", style.hue);

        let visible = style.visible ? 'visible' : 'none';
        map.setLayoutProperty(background.id, "visibility", visible);
    }

    private bind() {
        this.createLayer();
    }

    private unbind() {
        const { map, background } = this.props;

        map.off('styledata', this.onStyleDataChange);

        if (map.getSource(background.id)) {
            const { layers } = map.getStyle();

            if (layers) {
                layers
                    .filter(layer => layer.source === background.id)
                    .forEach(layer => map.removeLayer(layer.id));
            }

            map.removeSource(background.id);
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

    public componentWillReceiveProps(nextProps: IBackgroundsProps) {
        if (this.props.style != nextProps.style) {
            this.changeLayerStyle(nextProps.style);
        }
    }

    public render() {
        return null;
    }
}

export default withMap(Backgrounds);