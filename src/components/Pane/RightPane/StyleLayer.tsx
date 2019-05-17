import * as React from 'react';
import { IDocument } from '../../../utilities/map/document';
import './index.less'
import { ILayer, LayerType } from '../../../utilities/map/layer';
import BackgroudStyleView from '../../Style/BackgroundStyle';
import RasterStyleView from '../../Style/RasterStyle';
import DemWMSStyleView from '../../Style/DemWMSStyle';

interface IProps {
    document: IDocument;
}

interface IState {

}

class StyleLayer extends React.Component<IProps, IState> {
    //-----------------------------------------Menu 菜单相关配置 开始------------------------------------
    state: IState = {

    }

    changeStyle(doc: IDocument) {
        let document = new IDocument(doc.name, doc.current, doc.backgrounds, doc.layers, doc.maprender);
        const current = document.getCurrentLayer();

        switch (current.type) {
            case LayerType.BackGround:
                return <BackgroudStyleView document={document} />
            case LayerType.RasterTile:
                return <RasterStyleView document={document} />
            case LayerType.DemWMS:
                return <DemWMSStyleView document={document} />
        }

        return;
    }

    //-----------------------------------------Menu 菜单相关配置 结束--------------------------------------------
    render() {
        const { document } = this.props;
        const tabUI = this.changeStyle(document);
        return (
            <div className="tab-scroll">
                {tabUI}
            </div >
        );
    }
}


export default StyleLayer;
