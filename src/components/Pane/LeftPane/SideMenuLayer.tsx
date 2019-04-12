import * as React from 'react';
import DrawerMenu from 'rc-drawer';

import { Icon } from 'antd';

import ScrollContainer from '../ScollPane/ScrollContainer';

import 'rc-drawer/assets/index.css';

class SideMenuLayer extends React.PureComponent {
  state = {
    homeMenuOpen: false,
    chartMenuOpen: false,
    mapMenuOpen: false,
    flowMenuOpen: false,
    geometryOpen: false,
    lockModalShow: false,
  };

  //-----------------------------------------Menu 菜单相关配置 开始------------------------------------
  hideAllMenu = () => {
    this.setState({
      homeMenuOpen: false,
      chartMenuOpen: false,
      mapMenuOpen: false,
      flowMenuOpen: false,
      geometryOpen: false,
    });
  };

  showHomeMenu = () => {
    this.setState({
      homeMenuOpen: true,
      chartMenuOpen: false,
      mapMenuOpen: false,
      flowMenuOpen: false,
      geometryOpen: false,
    });
  };

  showChartMenu = () => {
    this.setState({
      homeMenuOpen: false,
      chartMenuOpen: true,
      mapMenuOpen: false,
      flowMenuOpen: false,
      geometryOpen: false,
    });
  };

  showMapMenu = () => {
    this.setState({
      homeMenuOpen: false,
      chartMenuOpen: false,
      mapMenuOpen: true,
      flowMenuOpen: false,
      geometryOpen: false,
    });
  };

  showFlowMenu = () => {
    this.setState({
      homeMenuOpen: false,
      chartMenuOpen: false,
      mapMenuOpen: false,
      flowMenuOpen: true,
      geometryOpen: false,
    });
  }

  showGeometryMenu = () => {
    this.setState({
      homeMenuOpen: false,
      chartMenuOpen: false,
      mapMenuOpen: false,
      flowMenuOpen: false,
      geometryOpen: true,
    });
  }

  //-----------------------------------------Menu 菜单相关配置 结束--------------------------------------------

  render() {
    //        const chartLayer = this.props.chartLayer;
    return (
      <div className="edit-side-menu-wrapper ms-color-neutralLighter" /* onMouseLeave={this.hideAllMenu} */>
        <DrawerMenu
          level={null}
          getContainer={null}
          handler={null}
          open={this.state.homeMenuOpen}
          wrapperClassName="edit-side-drawer"
        >
          <div className="mapx-content-wrapper">
            <div className="maputnik-layout-list">
              <ScrollContainer>

              </ScrollContainer>
            </div>
            <div className="maputnik-layout-drawer">
              <ScrollContainer>

              </ScrollContainer>
            </div>
          </div>
        </DrawerMenu>
        <DrawerMenu
          level={null}
          getContainer={null}
          handler={null}
          open={this.state.chartMenuOpen}
          wrapperClassName="chart-side-drawer"
        >
          <div className="chart-content-wrapper">

          </div>
        </DrawerMenu>
        <DrawerMenu
          level={null}
          getContainer={null}
          handler={null}
          open={this.state.mapMenuOpen}
          wrapperClassName="other-side-drawer"
        >
          <div className="other-content-wrapper">

          </div>
        </DrawerMenu>
        <DrawerMenu
          level={null}
          getContainer={null}
          handler={null}
          open={this.state.geometryOpen}
          wrapperClassName="geometry-side-drawer"
        >
          <div className="geometry-content-wrapper">

          </div>
        </DrawerMenu>
        <div className="edit-side-menu">
          <div className="add" onMouseEnter={this.hideAllMenu}>
            <Icon type="rollback" />
          </div>
          <div className="add" onMouseEnter={this.showHomeMenu}>
            <Icon type="edit" />
            地图文档
          </div>
          <div className="add" onMouseEnter={this.showChartMenu}>
            <Icon type="area-chart" />
            图表
          </div>
          <div className="add" onMouseEnter={this.showMapMenu}>
          <Icon type="project" />
            属性
          </div>
          <div className="add" onMouseEnter={this.showGeometryMenu}>
            <Icon type="layout" />
            几何
          </div>
        </div>
      </div >
    );
  }
}
export default SideMenuLayer;
