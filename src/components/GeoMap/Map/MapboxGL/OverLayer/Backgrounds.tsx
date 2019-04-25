import * as React from 'react';
import * as MapboxGL from 'mapbox-gl';
import { withMap } from '../Global/context';
import { BackGround, BackGroundStyle, defaultBackGroundStyle } from '../../../../../utilities/layer';

interface IBackgroundsProps {
    map: MapboxGL.Map;
    background: BackGround;
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
        console.log("background constructor", props);
    }

    onStyleDataChange() {
        //throw new Error("Method not implemented.");
    }

    initialize() {
        this.createLayer();
    }

    parsePaint(style) {
        return {
            "raster-opacity": style.opacity,
            "raster-hue-rotate": style.hue,
        }
    }

    parseLayout(style) {
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

    private unbind() {
        const { map, background } = this.props;
        console.log("background unbind", background)

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
        console.log("background componentWillMount");
        const { map } = this.props;
        this.initialize();
        map.on('styledata', this.onStyleDataChange);
    }

    public componentWillUnmount() {
        const { map } = this.props;

        if (!map || !map.getStyle()) {
            return;
        }

        this.unbind();
    }

    public componentWillReceiveProps(props: IBackgroundsProps) {

    }

    public render() {
        console.log("background render");
        return null;
    }
}

export default withMap(Backgrounds);