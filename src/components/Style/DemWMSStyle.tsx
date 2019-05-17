import * as React from 'react';
import { connect } from "dva";
import { Divider, Collapse } from 'antd';
import IDocument, { cloneDocument } from '../../utilities/map/document';
import BodyStyle from './BodyStyle';

import StringInput from '../Common/Input/StringInput';
import BlockCheckbox from '../Common/Select/BlockChecbox';
import BlockSlider from '../Common/Select/BlockSlider';
import { opacityMarks, hueMarks, opacityScale } from '../Common/Select/BlockSliderMarker';

import { NameSpaceDocument, NameSpaceMapState } from '../../models/workspace';
import { changeLayerName, ICommonAction } from '../../utilities/map/layer';
import { ILayer } from '../../utilities/map/layer';
import {
    changeDemWMSStyle, DemWMSStyle, defaultDemWMSStyle, IDemWMSSytle,
    DemWMSLayout, changeDemWMSLayout, defaultDemWMSLayout, IDemWMSLayout
} from '../../utilities/map/demwms';
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";

import './index.less';
import BlockPosition from '../Common/Select/BlockPosition';


const clone = require('clone');
const Panel = Collapse.Panel;

interface IProps {
    document: IDocument;
    zoom?: number;
    dispatch: any;
}

interface IStates {
    visible: string;
    name: string;
    imageUrl: string;
    imageHeightUrl: string;
    scale: number;
    center: Array<number>;
}

let self = null;
class DemWMSStyleView extends React.Component<IProps, IStates>
    implements ICommonAction, IDemWMSSytle, IDemWMSLayout {

    public state: IStates = {
        visible: this.getCurrentVisible(),
        name: this.getCurrentStyle().name,
        imageUrl: "",
        imageHeightUrl: "",
        scale: this.getCurrentLayout().scale,
        center: this.getCurrentLayout().center
    };

    private defaultScale: number;

    constructor(props: IProps) {
        super(props);
        self = this;
        this.defaultScale = this.state.scale;
    }

    getCurrentStyle(doc?: IDocument) {
        let { document } = this.props;
        document = doc ? doc : document;
        let idoc = cloneDocument(document);
        let style = idoc.getCurrentStyle();

        if (!style) {
            style = clone(defaultDemWMSStyle);
        }

        return style;
    }

    getCurrentLayout(doc?: IDocument) {
        let { document } = this.props;
        document = doc ? doc : document;
        let idoc = cloneDocument(document);
        let layout = idoc.getCurrentLayout();

        if (!layout) {
            layout = clone(defaultDemWMSLayout);
        }

        return layout;
    }

    getCurrentVisible() {
        let visible = this.getCurrentLayout().visible;
        visible = visible ? "visible" : "unvisible";
        return visible;
    }

    dispatchNameChange(layer: ILayer, name: string, doc: IDocument) {
        const { dispatch } = this.props;
        dispatch(changeLayerName(layer, name, doc));
    }

    dispatchStyleChange(layer: ILayer, style: DemWMSStyle, doc: IDocument) {
        const { dispatch } = this.props;
        dispatch(changeDemWMSStyle(layer, style, doc));
    }

    dispatchLayoutChange(layer: ILayer, layout: DemWMSLayout, doc: IDocument) {
        const { dispatch } = this.props;
        dispatch(changeDemWMSLayout(layer, layout, doc));
    }


    handleVisibleChange(visible: boolean) {
        //onVisibleChange
        throw new Error("Method not implemented.");
    }

    onVisibleChange(value) {
        let visible = value == "visible" ? true : false;
        let { document } = self.props;
        let idoc = cloneDocument(document);

        let layer = idoc.getCurrentLayer();
        let layout = idoc.getCurrentLayout();
        if (!layout) layout = defaultDemWMSLayout;

        let { scale, center } = layout;

        let newLayout = new DemWMSLayout(visible, scale, center);
        self.dispatchLayoutChange(layer, newLayout, document);
        this.setState({ visible: value });
    }

    handleScaleChange(scaleRadio: PropertyValueSpecification<number>) {
        let { document } = self.props;
        let { name, current, backgrounds, layers, maprender } = document;
        let idoc = new IDocument(name, current, backgrounds, layers, maprender);

        let layer = idoc.getCurrentLayer();
        let layout = idoc.getCurrentLayout();
        if (!layout) layout = defaultDemWMSLayout;

        let { visible, scale, center } = layout;
        if (scaleRadio >= -1 && scaleRadio <= 1) {
            scale = self.defaultScale
        } else if (scaleRadio > 1) {
            scale = self.defaultScale * scaleRadio;
        } else if (scaleRadio < -1) {
            scale = self.defaultScale / (-scaleRadio);
        }

        let newLayout = new DemWMSLayout(visible, scale, center);
        self.dispatchLayoutChange(layer, newLayout, document);
    }

    handleCenterChange(newCenter){
        let { document } = self.props;
        let { name, current, backgrounds, layers, maprender } = document;
        let idoc = new IDocument(name, current, backgrounds, layers, maprender);

        let layer = idoc.getCurrentLayer();
        let layout = idoc.getCurrentLayout();
        if (!layout) layout = defaultDemWMSLayout;

        let { visible, scale, center } = layout;
        
        center[0] = newCenter[0];
        center[1] = newCenter[1];

        let newLayout = new DemWMSLayout(visible, scale, center);
        self.dispatchLayoutChange(layer, newLayout, document);
    }

    handleNameChange(newName: string) {
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

        this.setState({ name: name, visible: visible });
    }

    renderHeader(title) {
        return <strong style={{ fontSize: 15 }}>{title}</strong>
    }

    render() {
        const { document, zoom } = this.props;
        const { visible, name } = this.state;

        return (
            <Collapse bordered={false} defaultActiveKey={['1', '2', '3']} >
                <Panel header={this.renderHeader("信息")} key="1">
                    <BodyStyle title="名称">
                        <StringInput title={name}
                            placeholder="请输入名称"
                            tooltip="实时修改图层名称"
                            onChange={this.handleNameChange} />
                    </BodyStyle>

                    <BodyStyle title="遥感底图">
                        <StringInput title={name}
                            placeholder="请输入遥感底图资源Url"
                            tooltip="实时修改遥感底图Url"
                            onChange={this.handleNameChange} />
                    </BodyStyle>

                    <BodyStyle title="遥感高程">
                        <StringInput title={name}
                            placeholder="请输入高程图片资源Url"
                            tooltip="实时修改高程图片资源Url"
                            onChange={this.handleNameChange} />
                    </BodyStyle>
                </Panel>
                <Panel header={this.renderHeader("布局")} key="2">
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
                            title="缩放比例"
                            min={-10}
                            max={10}
                            step={1}
                            marks={opacityScale}
                            onChange={this.handleScaleChange.bind(this)}
                        >
                        </BlockSlider>
                    </BodyStyle>
                    <Divider />
                    <BodyStyle>
                        <BlockPosition
                            title="中心点"
                            min={-180}
                            max={180}
                            step={1}
                            onChange={this.handleCenterChange.bind(this)}
                        />
                    </BodyStyle>
                </Panel>
                <Panel header={this.renderHeader("样式")} key="3">

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

export default connect(mapStateToProps)(DemWMSStyleView);

