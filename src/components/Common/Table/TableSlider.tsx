import * as React from 'react';
import {
  Button, Table, Row, Col, Popconfirm
} from 'antd';
import { EditableFormRow, EditableCell } from './TableNumberEdit.jsx';

import './TableSlider.less';

interface IProps {
  min: number;
  max: number;
  marks?: any;
  step: number;
  title: string;
  onChange?: Function;
}

interface IStates {
  inputValue: number;
  dataSource: any;
  count: number;
}

class TableSlider extends React.Component<IProps, IStates> {
  public columns = [{
    title: '级别',
    dataIndex: 'level',
    width: '20%',
    editable: true,
  }, {
    title: this.props.title,
    dataIndex: 'value',
    width: '50%',
    editable: true,
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: '30%',
    render: (text, record) => (
      this.state.dataSource.length >= 1
        ? (
          <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        ) : null
    ),
  }]

  public state: IStates = {
    inputValue: 1,
    dataSource: [{
      key: '0',
      level: 4,
      value: 0.4,
    }, {
      key: '1',
      level: 8,
      value: 0.8,
    }],
    count: 2,
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

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { title, step, min, max, marks, children } = this.props;
    const { inputValue, dataSource } = this.state;

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (<div>
      <Row>
        <Col span={24}>
          <Button size="small" onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
            新增级别节点
        </Button>
          <Table
            pagination={false}
            components={components}
            size="small"
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </Col>
      </Row>
    </div>
    );
  }
}

export default TableSlider;
