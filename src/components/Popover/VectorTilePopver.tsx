import * as React from 'react';
import { Popover, Button } from 'antd';
import IconFont from '../IconFont/mapgis';

interface IVectorTileProps {
    title: string;
};

class VectorTilePopver extends React.Component<IVectorTileProps, {}> {
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
                title="矢量瓦片"
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

export default VectorTilePopver;
