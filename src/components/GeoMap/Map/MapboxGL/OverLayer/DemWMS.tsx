import * as React from 'react';
import * as MapboxGL from 'mapbox-gl';
import * as THREE from 'three';
import { withMap } from '../Global/context';
import {
    DemWMSLayer, DemWMSStyle, defaultDemWMSStyle,
    DemWMSLayout, defaultDemWMSLayout, DemWMSLoader
} from '../../../../../utilities/map/demwms';
import { number } from 'prop-types';

interface IProps {
    map: MapboxGL.Map;
    demwms: DemWMSLayer;
    style?: DemWMSStyle;
    layout?: DemWMSLayout;
    before?: string;
}

interface IStates {
    modelOrigin: Array<number>;
    modelAltitude: number;
    modelRotate: Array<number>;
    modelScale: number;
}

class DemWMS extends React.Component<IProps, IStates> {
    public state: IStates = {
        modelOrigin: defaultDemWMSLayout.center,
        modelAltitude: 0,
        modelRotate: [Math.PI / 2, 0, 0],
        modelScale: defaultDemWMSLayout.scale,
    };

    public canvas: any = null;
    public scene: THREE.Scene;
    public camera: THREE.Camera;
    public renderer: THREE.WebGLRenderer;
    public terrainLoader: DemWMSLoader;

    public modelTransform: any;

    constructor(props) {
        super(props);
    }

    onStyleDataChange() {
        //throw new Error("Method not implemented.");
    }

    createCanvas() {
        var canvas = document.createElement('canvas');
        canvas.id = this.props.demwms.id;
        canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.width = parseInt(this.props.map.getCanvas().style.width);
        canvas.height = parseInt(this.props.map.getCanvas().style.height);
        canvas.style.width = this.props.map.getCanvas().style.width;
        canvas.style.height = this.props.map.getCanvas().style.height;
        this.canvas = canvas;
        return canvas;
    }

    parsePaint(style: DemWMSStyle) {

    }

    parseLayout(layout: DemWMSLayout) {

    }

    parseTransform(origin?, altitude?, rotate?, scale?) {
        // parameters to ensure the THREE plane is georeferenced correctly on the map
        let { modelOrigin, modelAltitude, modelRotate, modelScale } = this.state;
        modelOrigin = origin ? origin : modelOrigin;
        modelAltitude = altitude ? altitude : modelAltitude;
        modelRotate = rotate ? rotate : modelRotate;
        modelScale = scale ? scale : modelScale;
        // transformation parameters to position, rotate and scale the 3D model onto the map
        this.modelTransform = {
            translateX: MapboxGL.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).x,
            translateY: MapboxGL.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).y,
            translateZ: MapboxGL.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).z,
            rotateX: modelRotate[0],
            rotateY: modelRotate[1],
            rotateZ: modelRotate[2],
            scale: modelScale
        };
    }


    private createLayer = () => {
        let { map, demwms, before, style, layout } = this.props

        let dem = this;

        if (!style) style = defaultDemWMSStyle;
        if (!layout) layout = defaultDemWMSLayout;

        let paintValue = this.parsePaint(style);
        let layoutValue = this.parseLayout(layout);

        const { id, imgUrl, heightImgUrl, url } = demwms;
        if (!id || !(url || imgUrl)) return;

        this.parseTransform();

        var demcanvs = {
            id: id,
            type: 'custom',
            renderingMode: '3d',
            onAdd: function (map, gl) {
                dem.camera = new THREE.Camera();
                dem.scene = new THREE.Scene();

                // use the Mapbox GL JS map canvas for three.js
                dem.renderer = new THREE.WebGLRenderer({
                    canvas: map.getCanvas(),
                    context: gl
                });

                dem.terrainLoader = new DemWMSLoader({
                    scene: dem.scene,
                    camera: dem.camera,
                    renderer: dem.renderer,
                    imgUrl: imgUrl,
                    heightImgUrl: heightImgUrl,
                    canvas: dem.canvas
                });
                var item = dem.terrainLoader;

                dem.renderer.autoClear = false;
                dem.terrainLoader.initTerrainLayer(item);
                dem.terrainLoader.loadTerrainLayer(item);
            },
            render: function (gl, matrix) {
                var rotationX = new THREE.Matrix4()
                    .makeRotationAxis(new THREE.Vector3(1, 0, 0), dem.modelTransform.rotateX);
                var rotationY = new THREE.Matrix4()
                    .makeRotationAxis(new THREE.Vector3(0, 1, 0), dem.modelTransform.rotateY);
                var rotationZ = new THREE.Matrix4()
                    .makeRotationAxis(new THREE.Vector3(0, 0, 1), dem.modelTransform.rotateZ);

                var m = new THREE.Matrix4().fromArray(matrix);
                var l = new THREE.Matrix4()
                    .makeTranslation(
                        dem.modelTransform.translateX,
                        dem.modelTransform.translateY,
                        dem.modelTransform.translateZ)
                    .scale(new THREE.Vector3(
                        dem.modelTransform.scale,
                        -dem.modelTransform.scale,
                        dem.modelTransform.scale))
                    .multiply(rotationX)
                    .multiply(rotationY)
                    .multiply(rotationZ);

                // sync mapbox matrix with THREE camera.
                dem.camera.projectionMatrix.elements = matrix;
                dem.camera.projectionMatrix = m.multiply(l);
                dem.renderer.state.reset();
                dem.renderer.render(dem.scene, dem.camera);
                map.triggerRepaint();
            }
        };

        map.addLayer(demcanvs, before);
    };

    private changeLayerStyle(style: DemWMSStyle) {
        const { map, demwms } = this.props;
        //map.setPaintProperty(demwms.id, "raster-opacity", style.opacity);
    }

    private changeLayerLayout(layout: DemWMSLayout) {
        const { map, demwms } = this.props;
        let visible = layout.visible ? 'visible' : 'none';
        map.setLayoutProperty(demwms.id, "visibility", visible);

        var modelOrigin = layout.center;
        var modelScale = layout.scale;

        this.parseTransform(modelOrigin, null, null, modelScale);
    }

    private bind() {
        this.createCanvas();
        this.createLayer();
    }

    private unbind() {
        const { map, demwms } = this.props;

        map.off('styledata', this.onStyleDataChange);

        if (map.getSource(demwms.id)) {
            const { layers } = map.getStyle();

            if (layers) {
                layers
                    .filter(layer => layer.source === demwms.id)
                    .forEach(layer => map.removeLayer(layer.id));
            }

            map.removeSource(demwms.id);
        }
    }

    public componentWillMount() {
        const { map } = this.props;
        this.bind();
        map.on('styledata', this.onStyleDataChange);
    }

    public componentWillUnmount() {
        const { map } = this.props;

        if (!map || !map.getStyle()) {
            return;
        }

        this.unbind();
    }

    public componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.style) {
            this.changeLayerStyle(nextProps.style);
            /* if (!deepEqual(this.props.style, nextProps.style)) {
                console.log("!deepqual-style", this.props.style, nextProps.style);
            } */
        }

        if (nextProps.layout) {
            this.changeLayerLayout(nextProps.layout);
            /* if (!deepEqual(this.props.layout, nextProps.layout)) {
                console.log("!deepqual-layout", this.props.style, nextProps.style);
                this.changeLayerLayout(nextProps.layout);
            } */
        }
    }

    public render() {
        return null;
    }
}

export default withMap(DemWMS);