import * as React from 'react';
import { Tree } from 'antd';
import IconFont from '../../IconFont/mapgis';
import BackMenu from '../../Menu/BackMenu';
import BackPopver from '../../Popover/BackPopver';
import VectorTilePopver from '../../Popover/VectorTilePopver';
import RasterTilePopver from '../../Popover/RasterTilePopver';

import { IDocument, toggleCurrent } from '../../../utilities/document';
import { LayerType, ILayer, BackGround } from '../../../utilities/layer';

import './index.less';
import { getBackground } from '../../../config/backgroud';

const { TreeNode } = Tree;

const treeData = [{
    title: '背景底图',
    icon: 'icon-background',
    key: 'background',
    type: 'background',
}, {
    title: '栅格瓦片',
    icon: 'icon-tile-view_',
    key: 'rastertile',
    children: [
        {
            title: 'IGServer',
            key: 'igserver_rastertile',
            icon: 'icon-tile-view_',
            children: [
                { title: '湖南地类图斑', key: 'hunan', icon: 'icon-tile-view_', type: 'rastertile' },
            ],
        },
    ],
}, {
    title: '矢量瓦片',
    icon: 'icon-vector',
    key: 'vectortile',
    children: [
        { title: 'IGServer', key: 'igserver_vectortile', icon: 'icon-vector', type: 'vectortile', },
    ],
}];

interface IDocumentProps {
    document: IDocument;
}

interface IDocumentState {
    expandedKeys: Array<string>,
    autoExpandParent: boolean,
    checkedKeys: Array<string>,
    selectedKeys: Array<string>,
}

class Document extends React.Component<IDocumentProps, IDocumentState> {
    constructor(props: any) {
        super(props);
    }

    public state: IDocumentState = {
        expandedKeys: ['background', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['background'],
        selectedKeys: [],
    };

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
            if (type == "background") {

            } else if (type == "rastertile") {

            } else if (type == "vectortile") {

            }
        }
        this.setState({ selectedKeys });
    }

    renderTreeNodes = data => data.map((item) => {
        console.log(item);
        if (item.children) {
            if (item.icon) {
                return <TreeNode icon={<IconFont type={item.icon} />} title={item.title} key={item.key} dataRef={item}>
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

    getBackgrounds(backgrounds: Array<BackGround>){
        let backgournd = {
            title: '背景底图',
            icon: 'icon-background',
            key: 'background',
            type: LayerType.BackGround,
            children: []
        };
        backgrounds.map(back=>{
            backgournd.children.push(back);
        });
        return backgournd;
    }

    render() {
        if (!this.props.document) return (<div />);

        let { backgrounds, layers } = this.props.document;

        let trees = [];
        let groupBack = this.getBackgrounds(backgrounds);

        trees.push(groupBack);

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
                    /* onSelect={this.onSelect} */
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderTreeNodes(trees)}
                </Tree>
            </div>
        );
    }

}

export default Document;
