import * as React from 'react';
import { Row, Col } from 'antd';
import div, { Flow } from 'gg-editor';


import { FlowToolbar } from '../../components/Toolbar/EditorToolbar';

import './index.less';

const FlowPage = () => {
    return (
        <div className="editor">
            <Row type="flex" className="editorHd">
                <Col span={24}>
                    <FlowToolbar />
                </Col>
            </Row>
            <Row type="flex" className="editorBd">
                <Col span={4} className="editorSidebar">
                    {/* <FlowItemPanel /> */}
                </Col>
                <Col span={16} className="editorContent">
                    {/* <Flow className={styles.flow} /> */}
                </Col>
                <Col span={4} className="editorSidebar">

                </Col>
            </Row>
        </div>
    );
};

export default FlowPage;