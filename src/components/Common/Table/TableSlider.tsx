import * as React from 'react';
import {
  Button, Table, Row, Col, Popconfirm
} from 'antd';
import { EditableFormRow, EditableCell } from './TableNumberEdit.jsx';
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";

import './TableSlider.less';

interface IProps {
  min: number;
  max: number;
  step: number;
  current: PropertyValueSpecification<number>;
  marks?: any;
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
    dataSource: this.parseDefault(this.props.current),
    count: this.parseCount(this.parseDefault(this.props.current)),
  }

  parseDefault(current: PropertyValueSpecification<number>) {
    let defaultData = [{
      key: 0,
      level: 0,
      value: 1,
    }];
    if (typeof current === "number") {
      defaultData[0].value = current;
      return defaultData;
    } else {
      if (!current.stops) return defaultData;
      return [].concat(current.stops.map((item, index) => {
        let level = Math.round(item[0] * 100) / 100;
        let value = Math.round(item[1] * 100) / 100;
        return { key: index, level: level, value: value }
      }));
    }
  }

  parseCount(dataSource) {
    let max = -1, temp = 0;
    dataSource.map((item, index) => {
      item.key = index;
      if (typeof item.level === 'string') {
        temp = parseInt(item.level);
      } else {
        temp = item.level;
      }
      if (max < temp) {
        max = temp;
      }
    });
    return max;
  }


  parseStops(dataSource) {
    let result = { stops: [] };
    dataSource.map(item => {
      let level = typeof item.level === "string" ? parseFloat(item.level) : item.level;
      let value = typeof item.value === "string" ? parseFloat(item.value) : item.value;
      result.stops.push([level, value]);
    });
    return result;
  }

  _sort(a, b) {
    return a.level - b.level;
  }

  slideChange = (dataSource) => {
    let { onChange } = this.props;
    let value = this.parseStops(dataSource);
    if (onChange) {
      onChange(value);
    }
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const { step, min, max } = this.props;

    let value = min + count * step;
    value = value > max ? max : value;
    value = Math.round(value * 100) / 100;
    const newData = {
      key: count + 1,
      level: count + 1,
      value: value
    };

    let newDatasource = [...dataSource, newData];
    newDatasource = newDatasource.sort(this._sort);
    this.slideChange(newDatasource);

    let newCount = this.parseCount(newDatasource);

    this.setState({
      dataSource: newDatasource,
      count: newCount,
    });
  }

  handleDelete = (key) => {
    const { count, dataSource } = this.state;
    let newDatasource = dataSource.filter(item => item.key !== key);
    if (newDatasource.length <= 0) newDatasource = [{ key: 0, level: 0, value: 1, }];
    newDatasource = newDatasource.sort(this._sort);
    this.slideChange(newDatasource);

    let maxCount = this.parseCount(newDatasource);
    let newCount = -1;

    let delDatasource = dataSource.filter(item => item.key == key);
    delDatasource.map(item => {
      newCount = typeof item.level === 'string' ? parseInt(item.level) : item.level
    });
    if (newCount >= maxCount) newCount = maxCount;

    this.setState({ dataSource: newDatasource, count: newCount });
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    let newDatasource = newData;
    newDatasource = newDatasource.sort(this._sort);
    let newCount = this.parseCount(newDatasource);

    this.slideChange(newDatasource);
    this.setState({ dataSource: newDatasource, count: newCount });
  }

  componentWillReceiveProps(next) {
    const { current } = next;
    let dataSource = this.parseDefault(current);
    this.setState({ dataSource: dataSource });
  }

  render() {
    const { title, step, min, max, marks, current } = this.props;
    let { inputValue, dataSource } = this.state;

    dataSource = this.parseDefault(current);

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
