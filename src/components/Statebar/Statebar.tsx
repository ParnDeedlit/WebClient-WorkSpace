import * as React from 'react';
import { connect } from 'dva';

import { Row, Col, Progress, Tag, Input } from 'antd';

import { NameSpaceDocument, NameSpaceMapState } from '../../models/workspace';

import './index.less';
import IDocument from '../../utilities/document';
import { State } from '../../utilities/map';

export interface IStatebarProps {
  document: IDocument;
  mapstate: State;
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
    const { current } = this.props.document;
    const { name } = current;
    const { mousePosition, zoom } = this.props.mapstate;
    let lng = mousePosition[0], lat = mousePosition[1];

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
        <Col span={8} >
          <Tag >当前选中的图层是:</Tag> <Tag color="#0079c1">{name}</Tag>
        </Col>
        <Col span={3} >
          <div className="rightState">
            <Input addonBefore="级别:" addonAfter="级" defaultValue="0" size="small" value={zoom}/>
          </div>
        </Col>
        <Col span={3}>
          <div className="rightState">
            <Input addonBefore="X坐标:" addonAfter="度" defaultValue="0" size="small" value={lng} />
          </div>
        </Col>
        <Col span={3}>
          <div className="rightState">
            <Input addonBefore="Y坐标:" addonAfter="度" defaultValue="0" size="small" value={lat} />
          </div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    document: state[NameSpaceDocument],
    mapstate: state[NameSpaceMapState],
  }
}

export default connect(mapStateToProps)(Statebar);