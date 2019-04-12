import * as React from "react";

import LineIcon from './LineIcon'
import FillIcon from './FillIcon'
import SymbolIcon from './SymbolIcon'
import BackgroundIcon from './BackgroundIcon'
import CircleIcon from './CircleIcon'

interface ILayerIconProps {
  type: string;
  style: object;
}

class LayerIcon extends React.Component<ILayerIconProps, {}> {

  render() {
    const iconProps = { style: this.props.style }
    switch(this.props.type) {
      case 'fill-extrusion': return <BackgroundIcon {...iconProps} />
      case 'raster': return <FillIcon {...iconProps} />
      case 'hillshade': return <FillIcon {...iconProps} />
      case 'heatmap': return <FillIcon {...iconProps} />
      case 'fill': return <FillIcon {...iconProps} />
      case 'background': return <BackgroundIcon {...iconProps} />
      case 'line': return <LineIcon {...iconProps} />
      case 'symbol': return <SymbolIcon {...iconProps} />
      case 'circle': return <CircleIcon {...iconProps} />
    }
  }
}

export default LayerIcon
