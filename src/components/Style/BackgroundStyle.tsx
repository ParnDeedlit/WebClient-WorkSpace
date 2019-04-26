import * as React from 'react';
import { Divider } from 'antd';
import IDocument from '../../utilities/document';
import BodyStyle from './BodyStyle';
import BlockCheckbox from '../Common/Select/BlockChecbox';
import BlockSlider from '../Common/Select/BlockSlider';

import { opacityMarks, hueMarks } from '../Common/Select/BlockSliderMarker';

import './index.less';

interface IProps {
    document: IDocument;
}

class BackgroudStyleView extends React.Component<IProps, {}> {

    render() {
        const { document } = this.props;
        return (
            <div className="style-content">
                <BodyStyle title="背景样式设置">
                    <BlockCheckbox
                        list={[
                            {
                                key: 'dark',
                                url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                                title: "黑暗主题",
                            },
                            {
                                key: 'light',
                                url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                                title: '亮色主题',
                            },
                        ]}
                        value="dark"
                        onChange={value => console.log(value)}
                    />
                </BodyStyle>

                <Divider />

                <BodyStyle title="透明度">
                    <BlockSlider
                        min={0}
                        max={1}
                        step={0.05}
                        marks={opacityMarks}
                    />
                </BodyStyle>

                <Divider />

                <BodyStyle title="色调值">
                    <BlockSlider
                        min={0}
                        max={1000}
                        step={10}
                        marks={hueMarks}
                    />
                </BodyStyle>
            </div>
        )
    }
}

export default BackgroudStyleView;

