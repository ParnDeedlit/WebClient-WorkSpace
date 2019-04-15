import * as React from 'react';
import { Tooltip, Menu, Dropdown, Popover, Icon } from 'antd';
import IconFont from '../IconFont/mapgis';

interface IToolbarMenuProps {
  command: any,
  icon:string,
  text: string,
  ui: any,
  ui_content : any,
  tooltip: string, 
  options: any
}

class ToolbarMenu extends React.Component<IToolbarMenuProps, {}>{
  render() {
    const { command, icon, text, ui, ui_content, tooltip,  options } = this.props;

    return (
      <div className="mapgis-command-menu">
        <IconFont type={`${icon}`} /> 
        {ui == "button" &&
            <Tooltip placement="bottom" title={tooltip}>
              <a className="ant-dropdown-link" onClick={command}>
                {text}
              </a>    
            </Tooltip>
        }
        {ui == "dropdown" &&
            <Dropdown overlay={ui_content} trigger={["click"]}>
              <a className="ant-dropdown-link">
                {text}
              </a>
            </Dropdown>}
        {ui == "popup" &&
          <Popover placement="bottom" content={ui_content} trigger="click">
            <a className="ant-dropdown-link" /* href="#" */>
                {text}
            </a>
          </Popover>
        }
      </div>
    );
  }
}


export default ToolbarMenu;
