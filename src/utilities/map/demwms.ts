import * as THREE from "three";
import { ILayer, LayerType, IStyle, ILayout } from "./layer";
import { NameSpaceDocument } from "../../models/workspace";
import IDocument from "./document";
import { PropertyValueSpecification } from "@mapbox/mapbox-gl-style-spec/types";

export class DemWMSLayer extends ILayer {
  title?: string;
  tileUrl?: string;
  imgUrl?: string;
  layout?: DemWMSLayout;
  style?: DemWMSStyle;
}

//-------------------------------------DemWMSStyle----------------------------------
//------------------------------------地形画布样式-开始-----------------------------------
//-------------------------------------DemWMSStyle----------------------------------
export class DemWMSStyle extends IStyle {
  opacity?: PropertyValueSpecification<number>;
  hue?: PropertyValueSpecification<number>;

  constructor(
    opacity: PropertyValueSpecification<number>,
    hue: PropertyValueSpecification<number>
  ) {
    super();
    this.opacity = opacity ? opacity : 1;
    this.hue = hue ? hue : 0;
  }

  setOpacity(opacity: PropertyValueSpecification<number>) {
    this.opacity = opacity;
  }

  setHue(hue: PropertyValueSpecification<number>) {
    this.hue = hue;
  }
}

export interface IDemWMSSytle {
  dispatchStyleChange(layer: ILayer, style: DemWMSStyle, doc: IDocument);
  onOpacityChange(opacity: PropertyValueSpecification<number>);
  onHueChange(hue: PropertyValueSpecification<number>);
}

export const defaultOpacity: PropertyValueSpecification<number> = {
  stops: [[0, 1], [5, 1], [10, 1], [15, 1], [20, 1]]
};

export const defaultHue: PropertyValueSpecification<number> = {
  stops: [[0, 0]]
};

export const defaultDemWMSStyle: DemWMSStyle = new DemWMSStyle(
  defaultOpacity,
  defaultHue
);

export function changeDemWMSStyle(
  raster: ILayer,
  style: any,
  document: IDocument
) {
  let layers = document.layers;
  if (!layers) return undefined;

  layers.map(layer => {
    if (layer.id == raster.id) {
      if (layer.type == LayerType.DemWMS) {
        layer.style = style;
      }
    }
  });

  return {
    type: NameSpaceDocument + "/changeDemWMSStyle",
    payload: layers
  };
}
//-------------------------------------DemWMSStyle----------------------------------
//------------------------------------地形画布样式-结束-----------------------------------
//-------------------------------------DemWMSStyle----------------------------------

//-------------------------------------DemWMSLayout----------------------------------
//------------------------------------地形画布布局-开始-----------------------------------
//-------------------------------------DemWMSLayout----------------------------------
export class DemWMSLayout extends ILayout {
  visible?: boolean;

  constructor(visible: boolean) {
    super();
    this.visible = visible;
  }
}

export const defaultVisible: boolean = true;

export const defaultDemWMSLayout: DemWMSLayout = new DemWMSLayout(
  defaultVisible
);

export function changeDemWMSLayout(
  raster: ILayer,
  layout: DemWMSLayout,
  document: IDocument
) {
  let layers = document.layers;
  if (!layers) return undefined;

  layers.map(layer => {
    if (layer.id == raster.id) {
      if (layer.type == LayerType.DemWMS) {
        layer.layout = layout;
      }
    }
  });

  return {
    type: NameSpaceDocument + "/changeDemWMSLayout",
    payload: layers
  };
}
//-------------------------------------DemWMSLayout----------------------------------
//---------------------------------------地形画布布局-结束-----------------------------------
//-------------------------------------DemWMSLayout----------------------------------

export class DemWMSLoader {
  loader: THREE.TextureLoader;

  rotating: boolean;
  extrusionRatio: number;
  imgWidth: number;
  imgHeight: number;
  imgURL: string;
  heightImgURL: string;

  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  ambientlight: THREE.AmbientLight;

  bufferPlane: any;
  bufferPlaneMesh: any;
  canvas: any;
  image: any;

  self: any;

  constructor(option) {
    this.loader = new THREE.TextureLoader();

    this.rotating = true;
    this.extrusionRatio = 0.15;
    this.imgWidth = 100;
    this.imgHeight = 100;
    // var imgURL = './map_natural2.jpg';
    this.imgURL = "./assets/Westeros2_natural.jpg";
    this.heightImgURL = "./assets/height3.png";

    this.scene = option.scene;
    this.camera = option.camera;
    this.renderer = option.renderer;
    this.canvas = option.canvas;

    this.self = this;
  }

  initTerrainLayer() {
    this.ambientlight = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.ambientlight);
  }

  loadTerrainLayer() {
    let self = this;
    self.image = new Image();
    self.image.onload = evt => {
      self.imgWidth = evt.target.width;
      self.imgHeight = evt.target.height;
      // !!important, align vertice and imgPix count by - 1.
      self.bufferPlane = self.bufferPlaneGeom(
        self.imgWidth - 1,
        self.imgHeight - 1,
        self.imgWidth - 1,
        self.imgHeight - 1
      );
      self.loadHeight();
    };
    self.image.src = self.imgURL;
  }

  addTexture(texture) {
    let self = this;
    texture.mapping = THREE.CubeReflectionMapping;
    console.log("texture loaded. mapping type is : " + texture.mapping);
    var imgMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.DoubleSide
    });

    let wireMaterial = new THREE.MeshLambertMaterial({
      color: 0x88eeff,
      wireframe: true
    });

    // console.log('bufferPlane has faces number: ' + customMesh.faces.length);
    self.bufferPlaneMesh = new THREE.Mesh(self.bufferPlane, imgMaterial);
    self.bufferPlaneMesh.position.set(-288, 0, 55);
    self.bufferPlaneMesh.rotation.x -= Math.PI / 2;
    self.bufferPlaneMesh.receiveShadow = true;
    self.scene.add(self.bufferPlaneMesh);
  }

  private bufferPlaneGeom(width, height, xseg, yseg) {
    var geometry = new THREE.PlaneBufferGeometry(width, height, xseg, yseg);
    // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, wireframe: true} );
    // var plane = new THREE.Mesh( geometry, material );
    // plane.position.set(0, 0, -10);
    return geometry;
  }

  private loadHeight() {
    var self = this;
    // Malloc memory for Array length with 1024*1024, storing uint8(0~255)
    var data = new Uint8Array(self.imgWidth * self.imgHeight);
    self.canvas.width = self.imgWidth;
    self.canvas.height = self.imgHeight;

    let context = self.canvas.getContext("2d");
    context.fillStyle = "#000";
    context.fillRect(0, 0, self.imgWidth, self.imgHeight);

    var img = new Image();
    img.onload = function() {
      context.drawImage(img, 0, 0);

      // get FlatArray of band value [r,g,b,r1,g1,b1...] for JPG, [r,g,b,a,r1,g1,b1,a1...] for PNG.
      self.image = context.getImageData(0, 0, self.imgWidth, self.imgHeight);
      let imageData = self.image.data;
      console.warn(`image data length: ${imageData.length}, extract band g`);
      // get the Second band value from height source image.
      for (var i = 0, j = 0, l = imageData.length; i < l; j++, i += 4) {
        // var hue = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
        data[j] = imageData[i];
        // // //// green * 1.2 - blue * .6 - hue * .2
        // data[j] = imageData[i + 1] * 1.2 - imageData[i + 2] * .6 - hue * .4; // + 1 to get second band as height value.
        // extract imageData as single band.
        imageData[i] = data[j];
        imageData[i + 1] = 0;
        imageData[i + 2] = 0;
      }
      context.clearRect(0, 0, self.imgWidth, self.imgHeight);
      context.putImageData(self.image, 0, 0);
      // attach height to bufferPlane geometry.
      self.attachHeight(self.bufferPlane, data);
      self.loadTexture();
    };
    // img.src = imgURL;
    img.src = self.heightImgURL;
    return data;
  }

  private attachHeight(geometry, data) {
    var self = this;
    // return position flatArray [x,y,z,x1,y1,z1...] in geometry
    var flatArray = geometry.attributes.position.array;
    var verticesCount = flatArray.length / 3.0;
    console.warn("bufferGeom Vertices Array length: " + verticesCount);
    // Actually you would find triangle verticeCount is more than imgWidth*imgHeight by (imgWidth + imgHeight + 1). Align required.
    for (var i = 0, j = 0; i < verticesCount; i++, j += 3) {
      if (data[i] === undefined) {
        console.warn(`data[${i}] is  undefined..`);
        break;
      } else {
        // set each vertice z-depth value with height
        flatArray[j - 1] = data[i] * self.extrusionRatio;
      }
    }
    console.warn("height attach finished... height[i]:" + data[i - 200]);
    return geometry;
  }

  private loadTexture() {
    let self = this;
    self.loader.load(
      // resource URL
      self.imgURL,
      // Function when resource is loaded
      this.addTexture,
      // Function called when download progresses
      function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // Function called when download errors
      function(xhr) {
        console.log("An error happened");
      }
    );
  }
}
