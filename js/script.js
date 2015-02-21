var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var tooltip = d3.select('body').append('div')
        .attr("class", "tooltip")
        
        .style('opacity', 0)

var parseDate = d3.time.format("%d-%b-%y").parse;
var formatTime = d3.time.format("%b %d,%Y")

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.rate); });


var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.json("js/d3.json", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.rate = +d.rate;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.rate; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Percentage (%)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

svg.selectAll("dot")									
		.data(data)											
	.enter().append("circle")								
		.attr("r", 3)	
		.attr("cx", function(d) { return x(d.date); })		 
		.attr("cy", function(d) { return y(d.rate); })
        .attr("class","point")

    .on("mouseover", function(d) {
            	d3.select(this).transition()
                    .duration(200)                      
        	       .attr("r",'7px');
            tooltip.transition()
				.duration(500)	
				.style("opacity", 0);
			tooltip.transition()
				.duration(200)	
				.style("opacity", .9);	
			tooltip	.html(
				"<i>Unemployed population:</i>"+"&nbsp;"+"<b>"+d.unemployment+"</b>"+
                      
				"<br/>"  +"<i>Unemployment rate:</i>"+"&nbsp;"+"<b>"+
                      
			 d.rate +"</b>"+ "%"+"<br/>"+"Date:"+"&nbsp;"+"<b>"+formatTime(d.date)+"</b>")	 
				.style("left", (d3.event.pageX) + "px")			 
				.style("top", (d3.event.pageY ) + "px");
			})
    .on("mouseout", function(d) {
    d3.select(this).transition()
                    .duration(200)
        	       .attr("r",'3px');
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

    

    
    
    
    
    
    });

  