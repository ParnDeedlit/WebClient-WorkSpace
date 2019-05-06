import * as React from "react";

import { IDocument } from '../../../../utilities/map/document';
import MapboxGlMap from './MapboxGlMap'
import Backgrounds from './OverLayer/Backgrounds';
import RasterTile from './OverLayer/RasterTile';
import { BackGroundLayer } from '../../../../utilities/map/background';
import { RasterTileLayer } from '../../../../utilities/map/rastertile';
import { MapEvent } from '../../../../utilities/map/mapevent';
import { LayerType, ILayer } from '../../../../utilities/map/layer';
import { array } from 'prop-types';
import { VectorTileLayer } from '../../../../utilities/map/vectortile';



interface IMapboxGlMapProps {
    document: IDocument;
    options: any;
    layout: any;
    dispatch?: any;
}

interface IMapboxGlMapStates {
    map: any;
    isLoad: boolean;
    before: string;
}

export class MapboxGlWraper extends React.Component<
    IMapboxGlMapProps,
    IMapboxGlMapStates
    > implements MapEvent {

    public state: IMapboxGlMapStates = {
        map: null,
        isLoad: false,
        before: undefined
    };

    constructor(props) {
        super(props);
    }

    onMapLoad(event: any, target: any, option: any) {
        if (option && option.before && option.before.id) {
            this.setState({ before: option.before.id });
        }
    }

    onMapChange(event: any, target: any, option: any) {

    }

    getFirstLayer(layers) {
        if (!layers) return "";
        if (layers.length <= 0) return "";

        var backgrounds = layers.filter(layer => {
            return layer.type === 'background';
        });
        if (backgrounds && backgrounds.length > 0) {
            //有背景图层存在,返回最后一个背景图层id
            return backgrounds[backgrounds.length - 1];
        }
        var rastertiles = layers.filter(layer => {
            return layer.type === 'rastertile';
        });
        if (rastertiles && rastertiles.length > 0) {
            //有栅格图层存在,返回第一个栅格图层id
            return rastertiles[rastertiles.length - 1];
        }
        return layers[layers.length - 1];
    }

    renderBackground(backgrounds: Array<BackGroundLayer>) {
        if (!this.state.before) return;
        return backgrounds.map(background => {
            return <Backgrounds
                background={background}
                style={background.style}
                key={background.key}
                before={this.state.before}
            />;
        });
    }

    renderRasterTile(rastertiles: Array<ILayer>) {
        if (!this.state.before) return;
        return rastertiles.map(rastertile => {
            return <RasterTile
                rastertile={rastertile}
                style={rastertile.style}
                key={rastertile.key}
                before={this.state.before}
            />;
        }).reverse();
    }

    render() {
        const { document, options, layout, dispatch } = this.props;
        const { name, current, backgrounds, layers, maprender } = document;
        let idoc = new IDocument(name, current, backgrounds, layers, maprender);

        const backsLayer = this.renderBackground(idoc.getBackgrouds());
        const rastersLayer = this.renderRasterTile(idoc.getLayersByType(LayerType.RasterTile));
        let children = undefined;
        if (backsLayer) {
            children = backsLayer.concat(rastersLayer);
        }

        return <MapboxGlMap
            document={document}
            options={options}
            layout={layout}
            dispatch={dispatch}
            onStyleLoad={this.onMapLoad.bind(this)}
        >
            {children}
        </MapboxGlMap>
    }
}

export default MapboxGlWraper;
