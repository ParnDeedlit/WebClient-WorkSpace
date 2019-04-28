import * as React from 'react';

import backgrouds from '../../../config/backgroud'

import { List, Card } from 'antd';
const { Meta } = Card;



function getImage(name){
  return require('../../../assets/background/' + name + '.png') 
}

export function bindBackMenus(click) {
    return (
        <List
            grid={{
            gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3,
            }}
            dataSource={backgrouds}
            renderItem={(item,index) => (
            <List.Item style={{width:250}} key={item.id} onClick={()=>click(item.id)}>
                <Card hoverable 
                  cover={<img style={{width:180}} alt="example" src={getImage(item.id)} />}
                >
                  <Meta
                    title={item.title}
                    description={item.title}
                  />
                </Card>
            </List.Item>
            )}
        />
    );
}

export let BackItems = {
    icon:"icon-shitujuzhen",
    command: "icon-shitujuzhen",
    text:"底图", 
    ui:"popup", 
    ui_content: null,
    options: {}
};

export default BackItems;