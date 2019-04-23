import * as React from "react";
import { Radio } from "antd";

import { IDocument, MapRender, resetMapRender } from '../../../utilities/document';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface ISettingProps {
  document: IDocument;
  dispatch: any;
}

export class SettingMap extends React.Component<ISettingProps, {}> {
  constructor(props) {
    super(props);
  }

  onChange(e) {
    switch (e.target.value) {
      case MapRender.MapBoxGL:
        this.props.dispatch(resetMapRender(MapRender.MapBoxGL));
        break;
      case MapRender.Cesium:
        this.props.dispatch(resetMapRender(MapRender.Cesium));
        break;
    }
  }

  render() {
    let { document } = this.props;
    let { maprender } = document;

    return (
      <div>
        <RadioGroup onChange={this.onChange.bind(this)} defaultValue={maprender}>
          <RadioButton value={MapRender.MapBoxGL}>Mapbox-GL-Zondy</RadioButton>
          <RadioButton value={MapRender.Cesium}>Cesium-Zondy</RadioButton>
        </RadioGroup>
      </div>
    );
  }
}

export default SettingMap;
