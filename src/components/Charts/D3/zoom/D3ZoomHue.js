import * as d3 from "d3";

let self = null;

export class D3ZoomHue {
  constructor() {
    this.context = null;
    self = this;
  }

  move() {
    /* var p = self.touch ? d3.touches(this)[0] : d3.mouse(this);
    console.log("move", p, self.touch);
    self.projection.rotate([self.lambda(p[0]), self.phi(p[1])]);
    self.draw();
    d3.event.preventDefault(); */
  }

  clicked(d) {
    d3.select(this)
      .transition()
      .attr("r", 15)
      .transition()
      .attr("r", 6);
  }

  drag(d) {
    //self.svg.selectAll("path").remove();
    var circle = d3.select(this).classed("dragging", true);
    d[1] = self.y_reveser(d3.event.y);
    circle
      .raise()
      .attr("cy", d3.event.y)
      .attr("r", 10);
    self.drawDashLine();
    self.drawZoomLine();
  }

  end(d) {
    var circle = d3.select(this).classed("dragging", false);
    d[1] = self.y_reveser(d3.event.y);
    circle
      .raise()
      .attr("cy", d3.event.y)
      .attr("r", 6);

    self.draw();
    self.drawZoomLine();

    if (self.option.callback && self.option.callback.dragEnd) {
      let result = { stops: [] };
      result.stops = self.stops;
      self.option.callback.dragEnd(result);
    }
  }

  drawDashLine() {
    //self.lastline.remove();
    var lastline = self.svg.append("path").datum(self.stops);
    lastline
      .attr("fill", "none")
      .attr("stroke", "#6fc8e8")
      .attr("stroke-width", 0.3)
      .attr("stroke-dasharray", "5,5")
      .attr("d", self.line);
    self.lastline = lastline;
  }

  drawZoomLine() {
    let zoom = self.option.zoom;

    //d[1] = self.y_reveser(d3.event.y);
    var midline = [[0, 500], [10, 500], [20, 500]];
    var zoomline = [[zoom, 0], [zoom, 1000]];

    self.svg
      .append("path")
      .datum(midline)
      .attr("fill", "none")
      .attr("stroke", "#6fc8e8")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "5, 5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", self.line);

    self.svg
      .append("path")
      .datum(zoomline)
      .attr("fill", "none")
      .attr("stroke", "#e4e4e4")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "5, 5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", self.line);
  }

  draw() {
    if (!self.svg) return;
    self.svg.selectAll("*").remove();
    self.svg.append("g").call(self.xAxis);
    self.svg.append("g").call(self.yAxis);
    self.svg
      .append("path")
      .datum(self.stops)
      .attr("fill", "none")
      .attr("stroke", "#6fc8e8")
      .attr("stroke-width", 3.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", self.lineStep);

    var g = self.svg
      .append("g")
      .attr("stroke", "#91d5ff")
      .attr("stroke-opacity", 0.9)
      .attr("stroke-width", 2)
      .attr("fill", "#ffffff");

    var circle = g.selectAll("circle").data(self.stops);

    circle
      .join("circle")
      .on("click", self.clicked)
      .call(
        d3
          .drag()
          .on("drag", self.drag)
          .on("end", self.end)
      )
      .attr("cx", d => self.x(d[0]))
      .attr("cy", d => self.y(d[1]))
      .attr("r", 6);

    self.svg.exit().remove();
    g.exit().remove();
    circle.exit().remove();
  }

  create(el, stops, option) {
    if (!el) return;
    else this.el = el;
    if (option) this.option = option;
    if (stops) this.stops = stops;

    this.x = d3
      .scaleLinear()
      .domain([0, 20])
      .range([option.margin.left, option.width - option.margin.right]);

    this.y = d3
      .scaleLinear()
      //.domain([d3.min(stops, d => d[1]), d3.max(stops, d => d[1])])
      .domain([option.box.miny, option.box.maxy])
      .nice()
      .range([option.height - option.margin.bottom, option.margin.top]);

    this.y_reveser = d3
      .scaleLinear()
      .domain([option.height - option.margin.bottom, option.margin.top])
      .nice()
      //.range([d3.min(stops, d => d[1]), d3.max(stops, d => d[1])]);
      .range([option.box.miny, option.box.maxy]);

    this.line = d3
      .line()
      .defined(d => !isNaN(d[1]))
      .x(d => this.x(d[0]))
      .y(d => this.y(d[1]));

    this.lineStep = d3
      .line()
      .defined(d => !isNaN(d[1]))
      .x(d => this.x(d[0]))
      .y(d => this.y(d[1]))
      .curve(d3.curveNatural);

    var svg = d3.select(el).select("svg");

    this.svg = svg;

    this.draw();
    this.drawZoomLine();

    //this.touch = "ontouchstart" in window;
    //svg.on(this.touch ? "touchmove" : "mousemove", this.move);
  }

  xAxis(g) {
    g.attr(
      "transform",
      `translate(0,${self.option.height - self.option.margin.bottom})`
    )
      .call(
        d3
          .axisBottom(self.x)
          //.tickPadding([5]).tickSizeInner([5]).tickSizeOuter([-5])
          .ticks(self.option.width / 80)
          .tickSizeOuter(0)
      )
      .call(g =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", -10)
          .attr("y", -10)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(self.option.text.x)
      );
  }

  yAxis(g) {
    g.attr("transform", `translate(${self.option.margin.left},0)`)
      .call(d3.axisLeft(self.y))
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(self.option.text.y)
      );
  }

  update(el, stops, zoom) {
    if (!el || !stops) return;
    self.stops = stops;
    self.option.zoom = zoom;
    self.draw();
    //self.drawDashLine();
    self.drawZoomLine();
  }

  destory() {}
}

export default D3ZoomHue;
