import * as React from 'react';
import * as MapboxGL from 'mapbox-gl';
import { withMap } from '../Global/context';
import { BackGround } from '../../../../../utilities/layer';

interface IBackgroundsProps {
    map: MapboxGL.Map;
    backgrounds: Array<BackGround>;
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

    initialize() {
        this.createLayer();
    }

    private createLayer = () => {
        let { map, backgrounds, before } = this.props;
        if (!before) before = "background";

        backgrounds.forEach(background => {
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
                "minzoom": 0,
                "maxzoom": 20
            }, before);
        });
    };

    private unbind() {
        const { map, backgrounds } = this.props;
        backgrounds.forEach(background => {
            if (map.getSource(background.id)) {
                const { layers } = map.getStyle();

                if (layers) {
                    layers
                        .filter(layer => layer.source === background.id)
                        .forEach(layer => map.removeLayer(layer.id));
                }

                map.removeSource(background.id);
            }
        });
    }

    public componentWillMount() {
        const { map } = this.props;
        this.initialize();
        map.on('styledata', this.onStyleDataChange);
    }

    public componentWillUnmount() {
        const { map } = this.props;

        if (!map || !map.getStyle()) {
            return;
        }

        map.off('styledata', this.onStyleDataChange);

        this.unbind();
    }

    public render() {
        return null;
    }
}

export default withMap(Backgrounds);