import * as React from 'react';
import * as MapboxGL from 'mapbox-gl';
import { withMap } from '../Global/context';
import { RasterTileLayer } from '../../../../../utilities/layer';

interface IRasterTileProps {
    map: MapboxGL.Map;
    rastertile: RasterTileLayer;
    before?: string;
}

interface IRasterTileStates {

}

export class RasterTile extends React.Component<IRasterTileProps, IRasterTileStates> {
    public state: IRasterTileStates = {

    };

    constructor(props) {
        super(props);
        console.log("RasterTile constructor", props);
    }

    onStyleDataChange() {
        //throw new Error("Method not implemented.");
    }

    initialize() {
        this.createLayer();
    }

    private createLayer = () => {
        let { map, rastertile, before } = this.props;

        if (!before) before = "background";


        const { id, tileUrl } = rastertile;
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

    };

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
        console.log("RasterTile componentWillMount");
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

    public componentWillReceiveProps(props: IRasterTileProps) {

    }

    public render() {
        console.log("RasterTile render");
        return null;
    }
}

export default withMap(RasterTile);