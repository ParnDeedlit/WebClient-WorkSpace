import * as React from 'react';
interface IScrollProps {
  children: any;
}

class ScrollContainer extends React.Component<IScrollProps, {}> {

  render() {
    return <div className="mapgis-scroll-container">
      {this.props.children}
    </div>
  }
}

export default ScrollContainer
