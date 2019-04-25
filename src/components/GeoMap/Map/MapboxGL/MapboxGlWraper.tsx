import * as React from "react";

import { IDocument } from '../../../../utilities/document';
import MapboxGlMap from './MapboxGlMap'
import Backgrounds from './OverLayer/Backgrounds';
import { BackGround, RasterTileLayer } from '../../../../utilities/layer';


interface IMapboxGlMapProps {
    document: IDocument;
    options: any;
    layout: any;
    dispatch?: any;
    children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
}

interface IMapboxGlMapStates {
    map: any;
    isLoad: boolean;
}

export class MapboxGlWraper extends React.Component<
    IMapboxGlMapProps,
    IMapboxGlMapStates
    > {

    public state: IMapboxGlMapStates = {
        map: null,
        isLoad: false,
    };

    constructor(props) {
        super(props);
    }

    renderBackground(backgrounds: Array<BackGround>) {
        return backgrounds.map(background => {
            return <Backgrounds
                background={background}
                style={background.style}
                key={background.key}
            />;
        });
    }

    render() {
        const { document, options, layout, dispatch, children } = this.props;
        const { backgrounds } = document;

        const backsLayer = this.renderBackground(backgrounds);

        return <MapboxGlMap
            document={document}
            options={options}
            layout={layout}
            dispatch={dispatch}
        >
            {backsLayer}

        </MapboxGlMap>
    }
}

export default MapboxGlWraper;
