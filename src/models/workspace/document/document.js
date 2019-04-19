import { NameSpaceDocument } from "../index";

export default {
  namespace: NameSpaceDocument,
  state: {
    current: {
      id: "mapboxlight",
      type: "background"
    },
    backgrounds: [
      {
        title: "浅色背景",
        name: "MapBox浅色背景",
        id: "mapboxlight",
        key: "mapboxlight",
        icon: "icon-background",
        type: "background",
        tileUrl:
          "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiY2hlbmdkYWRhIiwiYSI6ImNqZDFjaGo0ZjFzcnoyeG54enoxdnNuZHUifQ.hTWXXBUQ0wdGeuDF3GWeUw",
        imgUrl:
          "https://www.arcgis.com/sharing/rest/content/items/23fe7e8317ba4331b6ca72bf2a8eddb6/info/thumbnail/_E5_BE_AE_E5_8D_9A_E6_A1_8C_E9_9D_A2_E6_88_AA_E5_9B_BE_20130828171658.jpg?token=J2AaiNAlnstPvsJzidWbhWK2R4Tmq8nbd-FGwxlRjIHbNuHK4LzX5YLOUhHa7czJxP2X2XzObWfL__l_L6Ff_0EcOJmNcBzWf2NU6vX4Mn28lKikRg3RYkuwhUU0b_9ZnB-QBI6yTXi-CEg-waKgVoEZzs18ElFJr0KZP8854o_Il3stSyJMXBM21Dw51FEz"
      }
    ],
    layers: [
      {
        type: "vectortile",
        url:
          "http://localhost:6163/igs/rest/mrms/vtiles/styles/vectortile.json",
        style:
          "http://localhost:6163/igs/rest/mrms/vtiles/styles/vectortile.json",
        name: "矢量瓦片-地类图斑",
        id: "hunan"
      }
    ]
  },
  reducers: {
    current({ payload: current }) {
      var newState = { ...state, current };
      return newState;
    },
    changeBackgroud(state, { payload: backgrounds }) {
      var newState = { ...state, backgrounds };
      return newState;
    },
    getLayers(state, { payload: layer }) {
      var newState = { ...state };
      return newState;
    }
  }
};
