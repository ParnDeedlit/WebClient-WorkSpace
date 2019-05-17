import * as React from 'react';
import {
  InputNumber, Row, Col, Switch
} from 'antd';

import './BlockSlider.less';
import { number } from 'prop-types';

interface IProps {
  min: number;
  max: number;
  step: number;
  title?: string;
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
  onChange?: Function;
}

interface IStates {
  longitude: number;
  latitude: number;
  height: number;
  x: number;
  y: number;
  z: number;
  basicView: boolean;
}

class BlockPosition extends React.Component<IProps, IStates> {
  public state: IStates = {
    longitude: 0,
    latitude: 0,
    height: 0,
    x: 0,
    y: 0,
    z: 0,
    basicView: true
  }

  onLongitudeChange = (value) => {
    if (typeof value != 'number') {
      return;
    } else {
      value = value >= 180 ? 179.99 : value <= -180 ? -179.99 : value;
    }

    let { onChange } = this.props;
    let { longitude, latitude, height } = this.state;

    longitude = value;

    if (onChange) {
      onChange([longitude, latitude, height]);
    }

    this.setState({
      longitude: longitude,
    });
  }

  onLatitudeChange = (value) => {
    if (typeof value != 'number') {
      return;
    } else {
      value = value >= 90 ? 89.99 : value <= -90 ? -89.99 : value;
    }

    let { onChange } = this.props;
    let { longitude, latitude, height } = this.state;

    latitude = value;

    if (onChange) {
      onChange([longitude, latitude, height]);
    }

    this.setState({
      latitude: latitude,
    });
  }

  onHeightChange = (value) => {
    if (typeof value != 'number') {
      return;
    }
    let { onChange } = this.props;
    let { longitude, latitude, height } = this.state;
    height = value;

    if (onChange) {
      onChange([longitude, latitude, height]);
    }

    this.setState({
      height: height,
    });
  }

  onViewChange(checked) {
    this.setState({ basicView: checked })
  }


  renderTitle(title) {
    return <Row></Row>;
  }

  render() {
    const { title, step, min, max, children } = this.props;
    const { longitude, latitude, height, basicView } = this.state;

    return (<div>
      <Row>
        <Col span={12}>
          <h3 className="style-body-title"><strong>{title}</strong></h3>
        </Col>
        <Col span={10} offset={2}>
          <Switch style={{ marginLeft: 15 }}
            checkedChildren="统一设置界面" unCheckedChildren="地图交互界面"
            defaultChecked size="default" onChange={this.onViewChange.bind(this)} />
        </Col>
      </Row>
      {basicView && <Row style={{ marginTop: 10 }}>
        <Col span={8}>
          <InputNumber
            min={-180}
            max={180}
            size="small"
            step={step}
            value={longitude}
            onChange={this.onLongitudeChange.bind(this)}
          />
        </Col>
        <Col span={8} >
          <InputNumber
            min={-90}
            max={90}
            size="small"
            step={step}
            value={latitude}
            onChange={this.onLatitudeChange.bind(this)}
          />
        </Col>
        <Col span={8} >
          <InputNumber
            /*             min={min}
                        max={max} */
            size="small"
            step={step}
            value={height}
            onChange={this.onHeightChange.bind(this)}
          />
        </Col>
      </Row>}
      {!basicView && <Row>
        <Col span={24}>
          {children}
        </Col>
      </Row>}
    </div>
    );
  }
}

export default BlockPosition;
