import * as d3 from "d3";
import * as topojson from "topojson";

var self = null;

class D3BaseGeometry {
  constructor() {
    this.context = null;
    self = this;
    //this.zoom = d3.zoom().scaleExtent([1, 0x10]);
  }

  drawFill() {
    var gradient = this.context.createLinearGradient(0, 0, this.width/2, this.height/2);
    gradient.addColorStop(0.5, 'blue');
    gradient.addColorStop(0.75, 'purple');
    gradient.addColorStop(1.0, 'yellow');

    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();
    this.context.beginPath();
    this.path(this.geometry);
    this.context.strokeStyle = "#a0a0a088";
    this.context.lineWidth = 5;
    this.context.stroke();
    this.context.restore();

    this.context.fillStyle = gradient;
    this.context.fill();
  }

  drawLine() {
    var gradient = this.context.createLinearGradient(0, 0, this.width/2, this.height/2);
    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(0.5, 'purple');
    gradient.addColorStop(1, 'yellow');

    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();
    this.context.beginPath();
    this.path(this.geometry);
    this.context.strokeStyle = gradient;
    this.context.lineWidth = 5;
    this.context.stroke();
    this.context.restore();

    this.context.fillStyle = "#a0a0a088";
    this.context.fill();
  }  

  create(el, data, bbox, point, scale, options) {
    //console.log("d3-create", el, data, bbox, point);
    if (!el) return;
    var canvas = d3.select(el).select("canvas");//.call(self.zoom);

    this.context = canvas.node().getContext("2d");
    this.width = canvas.property("width");
    this.height = canvas.property("height");

    this.lambda = d3
      .scaleLinear()
      .domain([0, this.width])
      .range([-180, 180]);

    this.phi = d3
      .scaleLinear()
      .domain([0, this.height])
      .range([85, -85]);

    this.projection = d3
      .geoMercator()
      .translate([this.width / 2, this.height / 2]);

    this.path = d3
      .geoPath()
      .projection(this.projection)
      .context(this.context);

    this.geometry = data;

    this.drawLine();
    //canvas.on("zoom", this.drawLine);
  }

  update(el, data, bboxScale, point, scale, options) {
    if (!el || !data || !bboxScale || !point) return;
    //console.log("d3-update", el, data, bboxScale, point);

    if(!scale) scale = 1;
    if(scale < 1) scale = 1;

    this.projection = d3
      .geoMercator()
      .center(point)
      .scale(bboxScale * scale)
      .translate([this.width / 2, this.height / 2]);

    this.path = d3
      .geoPath()
      .projection(this.projection)
      .context(this.context);

    this.geometry = data;
    /* var scale = this.zoom.scale();
    console.log("scale", scale); */
    if(this.geometry && this.geometry.geometry && this.geometry.geometry.type){
      if(this.geometry.geometry.type == "Polygon"){
        this.drawFill();
      }else if(this.geometry.geometry.type == "LineString"){
        this.drawLine();  
      }
    }
  }

  destory() {}
}

export default D3BaseGeometry;
