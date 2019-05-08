import * as React from 'react';
import { connect } from "dva";
import { Divider } from 'antd';
import IDocument from '../../utilities/map/document';
import BodyStyle from './BodyStyle';

import ZoomLevelScale from '../Common/Scale/ZoomLevelScale';
import StringInput from '../Common/Input/StringInput';
import BlockCheckbox from '../Common/Select/BlockChecbox';
import BlockSlider from '../Common/Select/BlockSlider';
import { opacityMarks, hueMarks } from '../Common/Select/BlockSliderMarker';

import { NameSpaceDocument } from '../../models/workspace';
import { changeRasterTileStyle, RasterTileStyle, IRasterTileSytle, defaultRasterTileStyle } from '../../utilities/map/rastertile';
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";

import './index.less';
import { ILayer } from '../../utilities/map/layer';
import TableSlider from '../Common/Table/TableSlider';

interface IProps {
    document: IDocument;
    dispatch: any;
}

interface IStates {
    value: string;
}

let self = null;
class RasterStyleView extends React.Component<IProps, IStates> implements IRasterTileSytle {
    public state: IStates = {
        value: "visible"
    };

    constructor(props: IProps) {
        super(props);
        self = this;
    }

    dispatchStyleChange(layer: ILayer, style: RasterTileStyle, doc: IDocument) {
        const { dispatch } = this.props;
        dispatch(changeRasterTileStyle(layer, style, doc));
    }

    onOpacityChange(opacity: PropertyValueSpecification<number>) {
        let { document } = self.props;
        let { name, current, backgrounds, layers, maprender } = document;
        let idoc = new IDocument(name, current, backgrounds, layers, maprender);

        let layer = idoc.getCurrentLayer();
        let style = idoc.getCurrentStyle();
        if (!style) style = defaultRasterTileStyle;
        let { visible, hue } = style;

        let newStyle = new RasterTileStyle(visible, opacity, hue);

        self.dispatchStyleChange(layer, newStyle, idoc);
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
        this.setState({ value: value });
    }

    render() {
        const { document } = this.props;
        return (
            <div className="style-content">
                <BodyStyle title="名称">
                    <StringInput />
                </BodyStyle>

                <Divider />

                <BodyStyle title="栅格样式设置">
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
                        value={this.state.value}
                        onChange={value => this.onVisibleChange(value)}
                    />
                </BodyStyle>

                <Divider />

                <BodyStyle title="透明度">
                    <BlockSlider
                        min={0}
                        max={1}
                        step={0.05}
                        marks={opacityMarks}
                        onChange={this.onOpacityChange}
                    >
                        <ZoomLevelScale />
                        <TableSlider title="透明度"
                            min={0} max={1} origin={1} step={0.1}
                            onChange={this.onOpacityChange} />
                    </BlockSlider>
                </BodyStyle>

                <Divider />

                <BodyStyle title="色调值">
                    <BlockSlider
                        min={0}
                        max={1000}
                        step={10}
                        marks={hueMarks}
                        onChange={this.onHueChange}
                    />
                </BodyStyle>
            </div>
        )
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        document: state[NameSpaceDocument],
    };
}

export default connect(mapStateToProps)(RasterStyleView);

