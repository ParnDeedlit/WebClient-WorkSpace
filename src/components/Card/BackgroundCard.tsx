import * as React from 'react';
import { Card, Icon, Avatar, Tooltip } from 'antd';
import { BackGround, LayerType } from '../../utilities/layer';


const { Meta } = Card;

interface IBottomPaneProps {
    backgroud: BackGround;
}

class BackgroudCard extends React.Component<IBottomPaneProps, {}> {


    render() {
        const style = { "marginLeft": 20 };
        const { name, key, description, imgUrl, tileUrl } = this.props.backgroud;
        const img = imgUrl ? <img alt="图片预览" src={imgUrl} /> : null
        return (<div style={style}>
            <Card
                hoverable
                style={{ width: 300 }}
                cover={img}
                actions={
                    [
                        <Tooltip title={name}><Icon type="setting" /></Tooltip>,
                        <Tooltip title={key}><Icon type="key" /></Tooltip>,
                        <Tooltip title={tileUrl}><Icon type="ellipsis" /></Tooltip>,
                    ]
                }
            >
                <Meta
                    avatar={<Avatar size="large">背景图层</Avatar>}
                    title={name}
                    description={description}
                />
            </Card>
        </div>)
    }
}

export default BackgroudCard;

