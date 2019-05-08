import * as React from 'react';
import {
  Slider, InputNumber, Row, Col, Switch
} from 'antd';

import './BlockSlider.less';

interface IProps {
  min: number;
  max: number;
  marks?: any;
  step: number;
  title?: string;
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
  onChange?: Function;
}

interface IStates {
  inputValue: number;
  basicView: boolean;
}

class IntegerStep extends React.Component<IProps, IStates> {
  public state: IStates = {
    inputValue: 1,
    basicView: true
  }

  onSlideChange = (value) => {
    let { onChange } = this.props;
    this.setState({
      inputValue: value,
    });
    if (onChange) {
      onChange(value);
    }
  }

  onViewChange(checked) {
    this.setState({ basicView: checked })
  }


  renderTitle(title) {
    return <Row><h3 className="style-body-title">{title}</h3></Row>;
  }

  render() {
    const { title, step, min, max, marks, children } = this.props;
    const { inputValue, basicView } = this.state;

    let visible = typeof title === 'string';
    const titleUI = this.renderTitle(title);


    return (<div>
      {visible && titleUI}
      <Row>
        <Col span={24}>
          <Switch checkedChildren="统一设置界面" unCheckedChildren="缩放级别界面"
            defaultChecked size="default" onChange={this.onViewChange.bind(this)} />
        </Col>
      </Row>
      {basicView && <Row>
        <Col span={16}>
          <Slider
            min={min}
            max={max}
            step={step}
            marks={marks}
            onChange={this.onSlideChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={6}>
          <InputNumber
            min={min}
            max={max}
            step={step}
            style={{ marginLeft: 16, marginTop: 12.5 }}
            value={inputValue}
            onChange={this.onSlideChange}
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

export default IntegerStep;
