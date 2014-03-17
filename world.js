d3.json("data/world.topo.json", function(geo) {
  var world = topojson.feature(geo, geo.objects.world);

  var width = 1200,
      height = 800;


  var visited = {
    "Australia": 10,
    "China": 3,
    "Russia": 9
  };

  var projection = d3.geo.mercator()
      .scale((width + 1) / 2 / Math.PI)
      .translate([width / 2, height / 2])
      .precision(0.1);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  var zoom = d3.behavior.zoom()
      .translate([0, 0])
      .scale(1)
      .scaleExtent([1, 8]);

  var features = svg.append("g")
      .call(zoom);

  var color = d3.scale.linear().domain([0, 10]).range(["green", "steelblue"]).interpolate(d3.interpolateLab);

  features.selectAll("path")
      .data(world.features)
    .enter().append("path")
      .attr("class", "state")
      .attr("d", path)
      .on("click", function(d) { console.log(d); this.style.fill = "hsl(" + Math.random() * 360 + ",100%,50%)"; })
      .style("fill", function(d) { if (d.properties.name in visited) return color(visited[d.properties.name]); })
    .append("title")
      .text(function(d) { return d.properties.name; });


  function zoomed() {
    features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    features.selectAll(".state").style("stroke-width", 1.5 / d3.event.scale + "px");
  }
  console.log(geo, world);
});

