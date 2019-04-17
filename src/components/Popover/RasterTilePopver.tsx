import * as React from 'react';
import { Popover, Button } from 'antd';
import IconFont from '../IconFont/mapgis';

interface IVectorTilePropsProps {
    title: string;
};

class RasterTilePopver extends React.Component<IVectorTilePropsProps, {}> {
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
                title="栅格瓦片"
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

export default RasterTilePopver;
