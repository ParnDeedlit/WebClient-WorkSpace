import * as React from 'react';

import { List, Card } from 'antd';
const { Meta } = Card;

const data = [
    {
      title: '黑色背景',
      url: "https://www.arcgis.com/sharing/rest/content/items/bf024b8d0b4b48f5a486070214e87c5f/info/thumbnail/ago_downloaded.png?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
    },
    {
      title: '浅色背景',
      url: "https://www.arcgis.com/sharing/rest/content/items/23fe7e8317ba4331b6ca72bf2a8eddb6/info/thumbnail/_E5_BE_AE_E5_8D_9A_E6_A1_8C_E9_9D_A2_E6_88_AA_E5_9B_BE_20130828171658.jpg?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
    },
    {
      title: '天地图',
      url: "https://www.arcgis.com/sharing/rest/content/items/017a6ec857ec4150a1f6d51e74d755bb/info/thumbnail/ago_downloaded.png?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
    },
    {
      title: '高德地图',
      url: "https://www.arcgis.com/sharing/rest/content/items/017a6ec857ec4150a1f6d51e74d755bb/info/thumbnail/ago_downloaded.png?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
    },
  ];

export function bindBackMenus(click) {
    return (
        <List
            grid={{
            gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3,
            }}
            dataSource={data}
            renderItem={item => (
            <List.Item>
                <Card hoverable
                  cover={<img alt="example" src={item.url} />}
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