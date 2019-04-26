import * as React from 'react';
import { IDocument } from '../../../utilities/document';
import './index.less'
import { ILayer, LayerType } from '../../../utilities/layer';
import BackgroudStyleView from '../../Style/BackgroundStyle';

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
        const idocment = new IDocument(doc.current, doc.backgrounds, doc.layers, doc.maprender);
        const currents = idocment.getCurrentLayer();
        if (currents.length > 0) {
            const layer = currents[0];
            switch (layer.type) {
                case LayerType.BackGround:
                    return <BackgroudStyleView document={doc} />
                    break;
            }
        }
        return;
    }

    //-----------------------------------------Menu 菜单相关配置 结束--------------------------------------------
    render() {
        const { document } = this.props;
        const tabUI = this.changeStyle(document);
        return (
            <div className="card-container">
                {tabUI}
            </div >
        );
    }
}


export default StyleLayer;
