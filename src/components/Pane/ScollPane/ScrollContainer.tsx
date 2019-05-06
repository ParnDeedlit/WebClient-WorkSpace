import * as React from 'react';
import './index.less';

interface IScrollProps {
  children: React.ReactNode;
}

class ScrollContainer extends React.Component<IScrollProps, {}> {

  render() {
    return <div className="mapgis-scroll-container">
      {this.props.children}
    </div>
  }
}

export default ScrollContainer
