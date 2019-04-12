import * as d3 from "d3";
import * as topojson from "topojson";

var self = null;

export class D3LonlatProject {
  constructor() {
    this.context = null;
    self = this;
  }

  move() {
    var p = self.touch ? d3.touches(this)[0] : d3.mouse(this);
    self.projection.rotate([self.lambda(p[0]), self.phi(p[1])]), self.drawFill();
    d3.event.preventDefault();
  }

  drawFill() {
    var gradient = this.context.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'green');
    gradient.addColorStop(1, 'red');

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

    this.context.beginPath();
    this.path(this.graticule());
    this.context.strokeStyle = "#000";
    this.context.lineWidth = 1;
    this.context.stroke();
  }

  drawLine() {
    var gradient = this.context.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'green');
    gradient.addColorStop(1, 'red');

    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();
    this.context.beginPath();
    this.path(this.geometry);
    this.context.strokeStyle = gradient;
    this.context.lineWidth = 3;
    this.context.stroke();
    this.context.restore();

    this.context.fillStyle = "#a0a0a088";
    this.context.fill();
  }  

  create(el, data, options) {
    console.log("d3-create", el, data);
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
      .range([90, -90]);

    this.projection = d3
      .geoNaturalEarth1()
      .scale(125)
      .center([0, 0])
      .translate([this.width / 2, this.height / 2]);

    this.path = d3
      .geoPath()
      .projection(this.projection)
      .context(this.context);

    this.geometry = topojson.feature(data, data.objects.land);
    this.graticule = d3.geoGraticule();

    this.drawFill();

    this.touch = "ontouchstart" in window;
    canvas.on(this.touch ? "touchmove" : "mousemove", this.move);
  }

  update(el, data, options) {
    if (!el || !data) return;
    this.projection = d3
      .geoNaturalEarth1()
      .scale(75)
      .center([0, 0])
      .translate([this.width / 2, this.height / 2]);

    this.path = d3
      .geoPath()
      .projection(this.projection)
      .context(this.context);

    this.geometry = topojson.feature(data, data.objects.land);
    this.graticule = d3.geoGraticule();

    this.drawLine();  
  
  }

  destory() {}
}

export default D3LonlatProject;
