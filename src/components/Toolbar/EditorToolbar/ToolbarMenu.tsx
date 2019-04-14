import * as React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import IconFont from '../IconFont/mapgis';

interface IToolbarMenuProps {
  command: string,
  icon:string,
  text: string,
  ui: any,
  ui_content : any,
  options: any
}

class ToolbarMenu extends React.Component<IToolbarMenuProps, {}>{
  render() {
    const { command, icon, text, ui, ui_content, options } = this.props;

    return (
      <div className="mapgis-command-menu">
        <IconFont type={`${icon || command}`} /> 
        {ui == "button" &&
            <a className="ant-dropdown-link" /* href="#" */>
              {text}
            </a>
        }
        {ui == "dropdown" &&
            <Dropdown overlay={ui_content} trigger={["click"]}>
              <a className="ant-dropdown-link" /* href="#" */>
                {text}
              </a>
            </Dropdown>}
        {ui == "dialog" &&
            <a className="ant-dropdown-link" /* href="#" */>
              {text}
            </a>
        }
      </div>
    );
  }
}


export default ToolbarMenu;
