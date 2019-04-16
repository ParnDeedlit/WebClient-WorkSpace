import * as React from 'react';
import { Tooltip } from 'antd';
import IconFont from '../../IconFont';
import './index.less';

const ToolbarButton = props => {
  const { command, icon, text } = props;

  return (
    <div className="mapgis-command-item">
      <Tooltip
        title={text || command}
        placement="bottom"
        overlayClassName="tooltip"
      >
        <IconFont type={`icon-${icon || command}`} />
      </Tooltip>
    </div>
  );
};

export default ToolbarButton;
