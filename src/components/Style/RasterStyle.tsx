import * as React from 'react';
import { connect } from "dva";
import { Divider } from 'antd';
import IDocument from '../../utilities/map/document';
import BodyStyle from './BodyStyle';

import StringInput from '../Common/Input/StringInput';
import BlockCheckbox from '../Common/Select/BlockChecbox';
import BlockSlider from '../Common/Select/BlockSlider';
import { opacityMarks, hueMarks } from '../Common/Select/BlockSliderMarker';

import { NameSpaceDocument, NameSpaceMapState } from '../../models/workspace';
import { changeLayerName } from '../../utilities/map/layer';
import { changeRasterTileStyle, RasterTileStyle, IRasterTileSytle, defaultRasterTileStyle } from '../../utilities/map/rastertile';
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";

import './index.less';
import { ILayer } from '../../utilities/map/layer';
import TableSlider from '../Common/Table/TableSlider';
import ZoomHueScale from '../Common/Scale/ZoomHueScale';
import ZoomOpacityScale from '../Common/Scale/ZoomOpacityScale';

const cloneDeep = require('clone-deep');

interface IProps {
    document: IDocument;
    zoom?: number;
    dispatch: any;
}

interface IStates {
    visible: string;
    opacity: PropertyValueSpecification<number>;
    hue: PropertyValueSpecification<number>;
    name: string;
}

let self = null;
class RasterStyleView extends React.Component<IProps, IStates> implements IRasterTileSytle {
    public state: IStates = {
        visible: "visible",
        opacity: this.getCurrentOpacity(),
        hue: this.getCurrentHue(),
        name: this.getCurrentStyle().name
    };

    constructor(props: IProps) {
        super(props);
        self = this;
    }

    getCurrentStyle(doc?: IDocument) {
        let { document } = this.props;
        document = doc ? doc : document;
        let { name, current, backgrounds, layers, maprender } = document;
        let idoc = new IDocument(name, current, backgrounds, layers, maprender);
        //console.log("getCurrentStyle-0", name, current, layers);
        let style = idoc.getCurrentStyle();
        console.log("rasterstyle-getCurrentStyle-0", style);
        if (!style) style = {
            opacity: {
                stops: [[0, 1], [5, 1], [10, 1], [15, 1], [20, 1]]
            },
            hue: {
                stops: [[0, 0]]
            },
            visible: true
        };
        console.log("rasterstyle-getCurrentStyle-1", style);
        return style;
    }

    dispatchStyleChange(layer: ILayer, style: RasterTileStyle, doc: IDocument) {
        const { dispatch } = this.props;
        dispatch(changeRasterTileStyle(layer, style, doc));
    }

    dispatchNameChange(layer: ILayer, name: string, doc: IDocument) {
        const { dispatch } = this.props;
        dispatch(changeLayerName(layer, name, doc));
    }

    onOpacityChange(opacity: PropertyValueSpecification<number>) {
        let { document } = self.props;
        let { name, current, backgrounds, layers, maprender } = document;
        let idoc = new IDocument(name, current, backgrounds, layers, maprender);

        let layer = idoc.getCurrentLayer();
        let style = idoc.getCurrentStyle();
        if (!style) style = cloneDeep(defaultRasterTileStyle);
        let { visible, hue } = style;

        let newStyle = new RasterTileStyle(visible, opacity, hue);

        self.dispatchStyleChange(layer, newStyle, idoc);
        self.setState({ opacity: opacity });
    }

    getCurrentOpacity() {
        return this.getCurrentStyle().opacity;
    }

    onHueChange(hue: PropertyValueSpecification<number>) {
        let { document } = self.props;
        let { name, current, backgrounds, layers, maprender } = document;
        let idoc = new IDocument(name, current, backgrounds, layers, maprender);

        let layer = idoc.getCurrentLayer();
        let style = idoc.getCurrentStyle();
        if (!style) style = defaultRasterTileStyle;
        let { visible, opacity } = style;

        let newStyle = new RasterTileStyle(visible, opacity, hue);

        self.dispatchStyleChange(layer, newStyle, idoc);
        self.setState({ hue: hue });
    }

    getCurrentHue() {
        return this.getCurrentStyle().hue;
    }

    onVisibleChange(value) {
        let visible = value == "visible" ? true : false;
        let { document } = self.props;
        let { name, current, backgrounds, layers, maprender } = document;
        let idoc = new IDocument(name, current, backgrounds, layers, maprender);

        let layer = idoc.getCurrentLayer();
        let style = idoc.getCurrentStyle();
        if (!style) style = defaultRasterTileStyle;
        let { opacity, hue } = style;

        let newStyle = new RasterTileStyle(visible, opacity, hue);

        self.dispatchStyleChange(layer, newStyle, idoc);
        this.setState({ visible: value });
    }

    onNameChange(newName) {
        let { document } = self.props;
        let { name, current, backgrounds, layers, maprender } = document;
        let idoc = new IDocument(name, current, backgrounds, layers, maprender);

        let layer = idoc.getCurrentLayer();
        self.dispatchNameChange(layer, newName, idoc);
    }

    componentWillReceiveProps(next) {
        const { document } = next;
        if (document == this.props.document) return;

        let style = this.getCurrentStyle(document);
        let opacity = style.opacity;
        let hue = style.hue;
        let name = document.current.name;

        console.log("rasterstyle-will", document, name, opacity, hue);

        this.setState({ opacity: opacity, hue: hue, name: name });
    }

    render() {
        const { document, zoom } = this.props;
        const { visible, opacity, hue, name } = this.state;

        console.log("rasterstyle-render", name, opacity, hue);

        return (
            <div className="style-content">
                <BodyStyle title="名称">
                    <StringInput title={name}
                        placeholder="请输入名称"
                        tooltip="实时修改图层名称"
                        onChange={this.onNameChange} />
                </BodyStyle>

                <Divider />

                <BodyStyle title="可见状态">
                    <BlockCheckbox
                        list={[
                            {
                                key: 'visible',
                                url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                                title: "可见状态",
                            },
                            {
                                key: 'unvisible',
                                url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                                title: '不可见状态',
                            },
                        ]}
                        value={visible}
                        onChange={value => this.onVisibleChange(value)}
                    />
                </BodyStyle>

                <Divider />

                <BodyStyle>
                    <BlockSlider
                        title="透明度"
                        min={0}
                        max={1}
                        step={0.05}
                        marks={opacityMarks}
                        onChange={this.onOpacityChange}
                    >
                        <ZoomOpacityScale title="透明度"
                            min={0} max={1} step={0.1}
                            current={opacity}
                            zoom={zoom}
                            onChange={this.onOpacityChange}
                        />
                        <TableSlider title="透明度"
                            min={0} max={1} step={0.1}
                            current={opacity}
                            onChange={this.onOpacityChange}
                        />
                    </BlockSlider>
                </BodyStyle>

                <Divider />

                <BodyStyle >
                    <BlockSlider
                        title="色调值"
                        min={0}
                        max={1000}
                        step={100}
                        marks={hueMarks}
                        onChange={this.onHueChange}
                    >
                        <ZoomHueScale title="色调值"
                            min={0} max={1000} step={100}
                            current={hue}
                            zoom={zoom}
                            onChange={this.onHueChange}
                        />
                        <TableSlider title="色调值"
                            min={0} max={1000} step={100}
                            current={hue}
                            onChange={this.onHueChange}
                        />
                    </BlockSlider>
                </BodyStyle>
            </div>
        )
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        document: state[NameSpaceDocument],
        zoom: state[NameSpaceMapState].zoom
    };
}

export default connect(mapStateToProps)(RasterStyleView);

