import * as React from 'react';
import { connect } from "dva";
import { Divider, Collapse } from 'antd';
import IDocument from '../../utilities/map/document';
import BodyStyle from './BodyStyle';

import StringInput from '../Common/Input/StringInput';
import BlockCheckbox from '../Common/Select/BlockChecbox';
import BlockSlider from '../Common/Select/BlockSlider';
import { opacityMarks, hueMarks } from '../Common/Select/BlockSliderMarker';

import { NameSpaceDocument, NameSpaceMapState } from '../../models/workspace';
import { changeLayerName } from '../../utilities/map/layer';
import { changeRasterTileStyle, RasterTileStyle, IRasterTileSytle, defaultRasterTileStyle, RasterTileLayout, changeRasterTileLayout, defaultRasterTileLayout } from '../../utilities/map/rastertile';
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";

import './index.less';
import { ILayer } from '../../utilities/map/layer';
import TableSlider from '../Common/Table/TableSlider';
import ZoomHueScale from '../Common/Scale/ZoomHueScale';
import ZoomOpacityScale from '../Common/Scale/ZoomOpacityScale';

const clone = require('clone');
const Panel = Collapse.Panel;

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
        visible: this.getCurrentVisible(),
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

        let style = idoc.getCurrentStyle();

        if (!style) {
            style = clone(defaultRasterTileStyle);
        }

        return style;
    }

    getCurrentLayout(doc?: IDocument) {
        let { document } = this.props;
        document = doc ? doc : document;
        let { name, current, backgrounds, layers, maprender } = document;
        let idoc = new IDocument(name, current, backgrounds, layers, maprender);

        let layout = idoc.getCurrentLayout();

        if (!layout) {
            layout = clone(defaultRasterTileLayout);
        }

        return layout;
    }

    dispatchStyleChange(layer: ILayer, style: RasterTileStyle, doc: IDocument) {
        const { dispatch } = this.props;
        dispatch(changeRasterTileStyle(layer, style, doc));
    }

    dispatchLayoutChange(layer: ILayer, layout: RasterTileLayout, doc: IDocument) {
        const { dispatch } = this.props;
        dispatch(changeRasterTileLayout(layer, layout, doc));
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
        if (!style) style = clone(defaultRasterTileStyle);
        let { hue } = style;

        let newStyle = new RasterTileStyle(opacity, hue);

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
        let { opacity } = style;

        let newStyle = new RasterTileStyle(opacity, hue);

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
        let layout = idoc.getCurrentLayout();

        let newLayout = new RasterTileLayout(visible);

        self.dispatchLayoutChange(layer, newLayout, idoc);
        this.setState({ visible: value });
    }

    getCurrentVisible() {
        let visible = this.getCurrentLayout().visible;
        visible = visible ? "visible" : "unvisible";
        return visible;
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
        let visible = this.getCurrentVisible();

        this.setState({ opacity: opacity, hue: hue, name: name, visible: visible });
    }

    renderHeader(title) {
        return <strong style={{ fontSize: 15 }}>{title}</strong>
    }

    render() {
        const { document, zoom } = this.props;
        const { visible, opacity, hue, name } = this.state;
        const customPanelStyle = {
            /*             background: '#f7f7f7',
                        borderRadius: 4,
                        marginBottom: 24,
                        border: 0,
                        overflow: 'hidden',
                        fontsize: '16px' */
        };

        return (
            <Collapse bordered={false} defaultActiveKey={['1', '2', '3']} >
                <Panel header={this.renderHeader("信息")} key="1" style={customPanelStyle}>
                    <BodyStyle title="名称">
                        <StringInput title={name}
                            placeholder="请输入名称"
                            tooltip="实时修改图层名称"
                            onChange={this.onNameChange} />
                    </BodyStyle>
                </Panel>
                <Panel header={this.renderHeader("布局")} key="2" style={customPanelStyle}>
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
                </Panel>
                <Panel header={this.renderHeader("样式")} key="3" style={customPanelStyle}>
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
                </Panel>
            </Collapse>
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

