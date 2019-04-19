import * as React from 'react';
import { Tooltip } from 'antd';
import IconFont from '../../IconFont';
import './index.less';

const ToolbarButton = props => {
  const { command, icon, text, enable } = props;
  let tooltip = enable ? text : "未激活状态";
  return (
    <div className="mapgis-command-item">
      <Tooltip
        title={tooltip}
        placement="bottom"
        overlayClassName="tooltip"
      >
        <IconFont type={`icon-${icon || command}`} />
      </Tooltip>
    </div>
  );
};

export default ToolbarButton;
