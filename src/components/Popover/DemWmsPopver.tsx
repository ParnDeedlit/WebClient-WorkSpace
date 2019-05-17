import * as React from 'react';
import { Popover, Button } from 'antd';
import IconFont from '../IconFont/mapgis';

interface IDemWmsProps {
    title: string;
};

class DemWmsPopver extends React.Component<IDemWmsProps, {}> {
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
        return (
            <Popover
                title="地形DEM"
                /* content={} */
                trigger="click"
                placement="right"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <IconFont type="icon-moreread">
                </IconFont>
            </Popover>
        );
    }
}

export default DemWmsPopver;
