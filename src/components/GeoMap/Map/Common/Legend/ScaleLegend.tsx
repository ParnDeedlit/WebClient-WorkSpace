import * as React from 'react';

import './ScaleLegend.less';
import { getRoundNum } from '../scale/mapScale';

interface IProps {
    width?: number;
    scale?: number;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}

interface IState {

}

class ScaleLegend extends React.Component<IProps, IState> {
    public state: IState = {

    }

    getShowScale(scale){
        return getRoundNum(scale);
    }

    getShowLabel(meters){
        let label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';
        return label;
    }    

    getScaleWidth(showScale, trueScale){
        let {width}  = this.props;
        if(!width) width = 200;
        let radio = showScale / trueScale;
        return Math.round(width * radio);
    }  

    /*     updateScale(scale, text, ratio) {
            scale.style.width = Math.round(this.options.maxWidth * ratio) + 'px';
            scale.innerHTML = text;
        } */

    //----------------------Menu 菜单相关配置 结束--------------------
    render() {
        let { scale, left, right, top, bottom, width } = this.props;
        width = width ? width : 200;
        let midLabel, endLabel, showScale;
        if (typeof scale == 'number') {
            showScale = this.getShowScale(scale);
            let mid = showScale / 2;
            midLabel = mid < 1000 ? mid : (mid / 1000);
            endLabel = this.getShowLabel(showScale);
            width = this.getScaleWidth(showScale, scale);
        }

        return (
            <div className="Scalebar" style={{ left: left, right: right, top: top, bottom: bottom }}>
                <div style={{ width: width }}>
                    <div className="ScalebarRuler">
                        <div className="ScalebarRulerBlock upper_firstpiece" />
                        <div className="ScalebarRulerBlock upper_secondpiece" />
                        <div className="ScalebarRulerBlock lower_firstpiece" />
                        <div className="ScalebarRulerBlock lower_secondpiece" />
                    </div>
                    <div className="scaleLabelDiv">
                        <div className="ScalebarLabel" style={{ left: "-3%" }}>0</div>
                        <div className="ScalebarLabel ScalebarFirstNumber">{midLabel}</div>
                        <div className="ScalebarLabel ScalebarSecondNumber">{endLabel}</div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ScaleLegend;
