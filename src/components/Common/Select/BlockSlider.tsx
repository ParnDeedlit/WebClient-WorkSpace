import * as  React from 'react';
import {
  Slider, InputNumber, Row, Col, Tag
} from 'antd';
import './BlockSlider.less';

interface IProps {
  min: number;
  max: number;
  marks?: any;
  step: number;
  title?: string;
  onChange?: Function;
}

interface IStates {
  inputValue: number;
}

class IntegerStep extends React.Component<IProps, IStates> {
  public state: IStates = {
    inputValue: 1,
  }

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  }


  renderTitle(title) {
    return <Row><h3 className="style-body-title">{title}</h3></Row>;
  }

  render() {
    const { title, step, min, max, marks } = this.props;
    const { inputValue } = this.state;

    let visible = typeof title === 'string';
    const titleUI = this.renderTitle(title);


    return (<div>
      {visible && titleUI}
      <Row>
        <Col span={12}>
          <Slider
            min={min}
            max={max}
            step={step}
            marks={marks}
            onChange={this.onChange}
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
            onChange={this.onChange}
          />
        </Col>
      </Row>
    </div>
    );
  }
}

export default IntegerStep;
