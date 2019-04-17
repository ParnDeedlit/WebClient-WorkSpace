import * as React from 'react';
import { Popover, Button } from 'antd';
import IconFont from '../IconFont/mapgis';
import BackContent from './BackContent';

import './index.less';

interface IBackProps {
    title: string;
};

class BackPopup extends React.Component<IBackProps, {}> {
    state = {
        visible: false,
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }

    render() {
        const {title} = this.props;
        return (
            <Popover
                title={title}
                arrowPointAtCenter={true}
                content={<BackContent />}
                trigger="click"
                placement="rightTop"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <IconFont type="icon-moreread">
                </IconFont>
            </Popover>
        );
    }
}

export default BackPopup;
