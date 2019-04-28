import * as React from 'react';
import { connect } from "dva";
import { Divider } from 'antd';
import IDocument from '../../utilities/document';
import BodyStyle from './BodyStyle';
import BlockCheckbox from '../Common/Select/BlockChecbox';
import BlockSlider from '../Common/Select/BlockSlider';
import { opacityMarks, hueMarks } from '../Common/Select/BlockSliderMarker';
import { NameSpaceDocument } from '../../models/workspace';
import { changeBackgroundStyle, BackGround, BackGroundStyle, IBackGroundSytle, defaultBackGroundStyle } from '../../utilities/layer';


import './index.less';

interface IProps {
    document: IDocument;
    dispatch: any;
}

interface IStates {
    value: string;
}

let self = null;
class BackgroudStyleView extends React.Component<IProps, IStates> implements IBackGroundSytle {
    public state: IStates = {
        value: "visible"
    };

    constructor(props: IProps) {
        super(props);
        self = this;
    }

    dispatchStyleChange(backgrounds: Array<BackGround>, style: BackGroundStyle) {
        const { dispatch } = this.props;
        dispatch(changeBackgroundStyle(backgrounds, style));
    }

    onOpacityChange(opacity: number) {
        let { backgrounds } = self.props.document;
        if (backgrounds.length <= 0) return;

        let { style } = backgrounds[0];
        if (!style) style = defaultBackGroundStyle;
        let { visible, hue } = style;

        let newStyle = new BackGroundStyle(visible, opacity, hue);

        self.dispatchStyleChange(backgrounds, newStyle);
    }

    onHueChange(hue: number) {
        let { backgrounds } = self.props.document;
        if (backgrounds.length <= 0) return;

        let { style } = backgrounds[0];
        if (!style) style = defaultBackGroundStyle;
        let { visible, opacity } = style;

        let newStyle = new BackGroundStyle(visible, opacity, hue);

        self.dispatchStyleChange(backgrounds, newStyle);
    }

    onVisibleChange(value) {
        let visible = value == "visible" ? true : false;
        let { backgrounds } = self.props.document;
        if (backgrounds.length <= 0) return;

        let { style } = backgrounds[0];
        if (!style) style = defaultBackGroundStyle;
        let { opacity, hue } = style;

        let newStyle = new BackGroundStyle(visible, opacity, hue);

        self.dispatchStyleChange(backgrounds, newStyle);
        this.setState({ value: value });
    }

    render() {
        const { document } = this.props;
        return (
            <div className="style-content">
                <BodyStyle title="背景样式设置">
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
                    />
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

export default connect(mapStateToProps)(BackgroudStyleView);

