import * as React from "react";

import { IDocument } from '../../../../utilities/document';
import MapboxGlMap from './MapboxGlMap'
import Backgrounds from './OverLayer/Backgrounds';


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

    renderBackground(docment: IDocument) {
        //return <Backgrounds />;
        return null;
    }

    render() {
        const { document, options, layout, dispatch, children } = this.props;

        const backsLayer = this.renderBackground(document);

        return <MapboxGlMap
            document={document}
            options={options}
            layout={layout}
            dispatch={dispatch}
        >
            <Backgrounds />
        </MapboxGlMap>
    }
}

export default MapboxGlWraper;
