import * as  React from 'react';
import {
  Input, Tooltip, Icon, Row, Col, Tag
} from 'antd';
import './StringInput.less';
import { string } from 'prop-types';

interface IProps {
  input?: string;
  title?: string;
  placeholder?: string;
  tooltip?: string;
  onChange?: Function;
}

interface IStates {
  inputValue: string;
}

class StringInput extends React.Component<IProps, IStates> {
  public state: IStates = {
    inputValue: this.props.title,
  }

  onInputChange(e) {
    let value = e.target.value;
    let { onChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    this.setState({
      inputValue: value
    });
  }

  renderTitle(title) {
    return <Row><h3 className="style-body-title">{title}</h3></Row>;
  }

  componentWillReceiveProps(next) {
    const { title } = next;
    if (title == this.props.title) return;

    this.setState({ inputValue: title });
  }

  render() {
    const { title, placeholder, tooltip } = this.props;
    const { inputValue } = this.state;

    return (<div style={{ marginTop: 5 }}>
      <Row gutter={10}>
        <Col span={24}>
          <Input
            placeholder={placeholder}
            onChange={this.onInputChange.bind(this)}
            value={inputValue}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            suffix={
              <Tooltip title={tooltip}>
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
