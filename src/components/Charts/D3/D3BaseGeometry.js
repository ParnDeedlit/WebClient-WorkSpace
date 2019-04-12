import * as d3 from "d3";
import * as topojson from 'topojson'

var self = null;

class D3BaseGeometry {
  constructor() {
      this.context = null;
      self = this;
  }

  move() {
    var p = this.touch ? d3.touches(this)[0] : d3.mouse(this);
    self.projection.rotate([self.lambda(p[0]), self.phi(p[1])]), self.draw();
    d3.event.preventDefault();
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();
    this.context.beginPath();
    this.path(this.sphere);
    this.context.fillStyle = "#fff";
    this.context.fill();
    this.context.clip();
    this.context.beginPath();
    this.path(this.land);
    this.context.fillStyle = "#000";
    this.context.fill();
    this.context.restore();
    this.context.beginPath();
    this.path(this.sphere);
    this.context.stroke();
  }

  create(el, data, options) {
    var canvas = d3.select(el).select('canvas');
    this.context = canvas.node().getContext("2d");
    var context = this.context;
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

    this.path = d3.geoPath()
      .projection(this.projection)
      .context(context);

    this.land = topojson.feature(data, data.objects.land);
    this.sphere = {type: "Sphere"};
    this.touch = "ontouchstart" in window;

    this.draw();
    canvas.on(this.touch ? "touchmove" : "mousemove", this.move);
  }

  update(node, data, options, chart) {}

  destory() {}
}

export default D3BaseGeometry;
