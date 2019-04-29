import * as React from 'react';
import * as MapboxGL from 'mapbox-gl';
import { withMap } from '../Global/context';
import { BackGroundLayer, BackGroundStyle, defaultBackGroundStyle } from '../../../../../utilities/map/background';
import style from '../../../../../utilities/style';

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

    private createLayer = () => {
        let { map, background, before, style } = this.props;
        if (!style) style = defaultBackGroundStyle;
        let paint = this.parsePaint(style);
        let layout = this.parseLayout(style);

        if (!before) before = "background";

        const { id, tileUrl } = background;
        if (!id || !tileUrl) return;

        map.addSource(id, {
            "type": "raster",
            "tiles": [tileUrl],
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