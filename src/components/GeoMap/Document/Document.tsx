import * as React from 'react';
import { Tree } from 'antd';
import { connect } from "dva";
import IconFont from '../../IconFont/mapgis';
import BackMenu from '../../Menu/BackMenu';
import BackPopver from '../../Popover/BackPopver';
import VectorTilePopver from '../../Popover/VectorTilePopver';
import RasterTilePopver from '../../Popover/RasterTilePopver';

import { NameSpaceDocument } from '../../../models/workspace';
import { IDocument, toggleCurrent } from '../../../utilities/document';
import { LayerType, ILayer, BackGround, VectorTileLayer } from '../../../utilities/layer';

import './index.less';

const { TreeNode } = Tree;

/* const treeData = [{{
    title: '栅格瓦片',
    icon: 'icon-tile-view_',
    key: 'rastertile',
}]; */

interface IDocumentProps {
    document: IDocument;
    dispatch?: any;
}

interface IDocumentState {
    expandedKeys: Array<string>,
    autoExpandParent: boolean,
    checkedKeys: Array<string>,
    selectedKeys: Array<string>,
}

let self = null;
class Document extends React.Component<IDocumentProps, IDocumentState> {
    constructor(props: any) {
        super(props);
        self = this;
    }

    public state: IDocumentState = {
        expandedKeys: ['background', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['background'],
        selectedKeys: [],
    };

    changeCurrent = (id) => {
        const { current, backgrounds, layers } = this.props.document;
        let document: IDocument = new IDocument(current, backgrounds, layers);
        this.props.dispatch(toggleCurrent(id, document))
    }

    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', selectedKeys, info);
        const type = info.node.props.type;
        const isleaf = info.node.isLeaf;
        if (isleaf && type) {
            const key = selectedKeys[0];
            if (type == LayerType.BackGround) {
                self.changeCurrent(key);
            } else if (type == LayerType.RasterTile) {
                self.changeCurrent(key);
            } else if (type == LayerType.VectorTile) {
                self.changeCurrent(key);
            }
        }
        this.setState({ selectedKeys });
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            if (item.icon) {
                return <TreeNode icon={<IconFont type={item.icon} />}
                    title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            }
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        if (item.icon && item.type == LayerType.BackGround) {
            return <TreeNode {...item} icon={<BackPopver {...item} />} />
        } else if (item.icon && item.type == LayerType.RasterTile) {
            return <TreeNode {...item} icon={<RasterTilePopver {...item} />} />
        } else if (item.icon && item.type == LayerType.VectorTile) {
            return <TreeNode {...item} icon={<VectorTilePopver {...item} />} />
        }
        return <TreeNode {...item} />;
    })

    getBackgrounds(backgrounds: Array<BackGround>) {
        let backgournd = {
            title: '背景底图',
            icon: 'icon-background',
            key: 'background',
            type: LayerType.BackGround,
            children: []
        };
        backgrounds.map(back => {
            backgournd.children.push(back);
        });
        return backgournd;
    }

    getVectorTiles(vectortiles: Array<VectorTileLayer>) {
        let vectortile = {
            title: '矢量瓦片',
            icon: 'icon-vector',
            key: 'vectortile',
            type: LayerType.VectorTile,
            children: []
        };

        let customChldren = {
            title: '湖南',
            icon: 'icon-vector',
            key: 'vectortile',
            type: LayerType.VectorTile,
            children: []
        };
        vectortiles.map(layer => {
            if (layer.type == LayerType.VectorTile) {
                customChldren.children.push(layer);
            }
        });
        vectortile.children.push(customChldren);
        return vectortile;

        /* vectortiles.map(layer => {
            if (layer.type == LayerType.VectorTile) {
                vectortile.children.push(layer);
            }
        });
        return vectortile; */
    }

    render() {
        if (!this.props.document) return (<div />);

        let { backgrounds, layers } = this.props.document;

        let trees = [];
        let groupBack = this.getBackgrounds(backgrounds);
        let groupVectorTile = this.getVectorTiles(layers);

        trees.push(groupBack);
        trees.push(groupVectorTile);

        return (
            <div>
                <Tree
                    /* showLine */
                    checkable
                    showIcon
                    defaultExpandAll
                    onExpand={this.onExpand}
                    /* expandedKeys={this.state.expandedKeys} */
                    /* autoExpandParent={this.state.autoExpandParent} */
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderTreeNodes(trees)}
                </Tree>
            </div>
        );
    }

}

//export default Document;
function mapStateToProps(state: any, ownProps: any) {
    return {
        document: state[NameSpaceDocument],
    };
}

export default connect(mapStateToProps)(Document);
