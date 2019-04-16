import * as React from 'react';
import { connect } from 'dva';

import { Row, Col, Progress, Tag, Input } from 'antd';

import './index.less';

export interface IStatebarProps {

}

export interface IStatebarState {

}

class Statebar extends React.Component<IStatebarProps, IStatebarState> {
  private _isRTLEnabled: boolean;

  constructor(props: IStatebarProps) {
    super(props);
  }

  public render(): JSX.Element {
    /* '0%': '#108ee9',
    '100%': '#87d068', */
    return (
      <Row type="flex" justify="space-between">
        <Col span={4} >
          <div className="leftState">
            <Progress
              strokeColor={{
                '0%': '#e4e4e4',
                '100%': '#108ee9',
              }}
              /* size="small" */
              percent={100}
              status="active"
            />
          </div>

        </Col>
        <Col span={11} >

        </Col>
        <Col span={3} >
          <div className="rightState">
            <Input addonBefore="级别:" addonAfter="级" defaultValue="0" size="small" />
          </div>
        </Col>
        <Col span={3}>
          <div className="rightState">
            <Input addonBefore="X坐标:" addonAfter="度" defaultValue="0" size="small" />
          </div>
        </Col>
        <Col span={3}>
          <div className="rightState">
            <Input addonBefore="Y坐标:" addonAfter="度" defaultValue="0" size="small" />
          </div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    //content: state.content
  }
}

export default connect(mapStateToProps)(Statebar);