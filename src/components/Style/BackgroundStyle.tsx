import * as React from 'react';
import { Divider } from 'antd';
import IDocument from '../../utilities/document';
import BodyStyle from './BodyStyle';
import BlockCheckbox from '../Common/Select/BlockChecbox';

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
            </div>
        )
    }
}

export default BackgroudStyleView;

