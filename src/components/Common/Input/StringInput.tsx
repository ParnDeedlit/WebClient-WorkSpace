import * as  React from 'react';
import {
  Input, Tooltip, Icon, Row, Col, Tag
} from 'antd';
import './StringInput.less';

interface IProps {
  input?: string;
  title?: string;
  onChange?: Function;
}

interface IStates {
  inputValue: number;
}

class StringInput extends React.Component<IProps, IStates> {
  public state: IStates = {
    inputValue: 1,
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


  renderTitle(title) {
    return <Row><h3 className="style-body-title">{title}</h3></Row>;
  }

  render() {
    const { title } = this.props;
    const { inputValue } = this.state;

    return (<div>
      <Row gutter={10}>
        <Col span={24}>
          <Input
            placeholder="Enter your username"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            suffix={
              <Tooltip title="Extra information">
                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />
        </Col>
      </Row>
    </div>
    );
  }
}

export default StringInput;
