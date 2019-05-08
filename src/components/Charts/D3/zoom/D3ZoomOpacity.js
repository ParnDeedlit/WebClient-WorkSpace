import * as d3 from "d3";

let self = null;

export class D3ZoomOpacity {
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
  }

  end(d) {
    var circle = d3.select(this).classed("dragging", false);
    d[1] = self.y_reveser(d3.event.y);
    circle
      .raise()
      .attr("cy", d3.event.y)
      .attr("r", 6);
    self.draw();
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

  draw() {
    console.log("draw", self.stops);
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
      .attr("d", self.line);

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

  create(el, stops, options) {
    console.log("d3-create", el, stops);
    if (!el) return;
    else this.el = el;
    if (options) this.options = options;
    if (stops) this.stops = stops;

    this.x = d3
      .scaleLinear()
      .domain([0, 20])
      .range([options.margin.left, options.width - options.margin.right]);

    this.y = d3
      .scaleLinear()
      .domain([d3.min(stops, d => d[1]), d3.max(stops, d => d[1])])
      .nice()
      .range([options.height - options.margin.bottom, options.margin.top]);

    this.y_reveser = d3
      .scaleLinear()
      .domain([options.height - options.margin.bottom, options.margin.top])
      .nice()
      .range([d3.min(stops, d => d[1]), d3.max(stops, d => d[1])]);

    this.line = d3
      .line()
      .defined(d => !isNaN(d[1]))
      .x(d => this.x(d[0]))
      .y(d => this.y(d[1]));

    var svg = d3.select(el).select("svg");

    this.svg = svg;

    this.draw();

    //this.touch = "ontouchstart" in window;
    //svg.on(this.touch ? "touchmove" : "mousemove", this.move);
  }

  xAxis(g) {
    g.attr(
      "transform",
      `translate(0,${self.options.height - self.options.margin.bottom})`
    )
      .call(
        d3
          .axisBottom(self.x)
          //.tickPadding([5]).tickSizeInner([5]).tickSizeOuter([-5])
          .ticks(self.options.width / 80)
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
          .text(self.options.text.x)
      );
  }

  yAxis(g) {
    g.attr("transform", `translate(${self.options.margin.left},0)`)
      .call(d3.axisLeft(self.y))
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(self.options.text.y)
      );
  }

  update(el, data, options) {
    if (!el || !data) return;
  }

  destory() {}
}

export default D3ZoomOpacity;
