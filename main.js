const FRAME_HEIGHT = 600;
const FRAME_WIDTH = 600;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// Build frame of barchart
const FRAME2 = d3.select("#barchart")
                  .append("svg")
                    .attr("width", FRAME_WIDTH)
                    .attr("height", 700)
                    .attr("class", "frame");

// create x and y scale for the bar graph
let xScale = d3.scaleBand().range([0, VIS_WIDTH]).padding(0.4);
let yScale = d3.scaleLinear().range([VIS_HEIGHT, 0]);

// initialize initial part of the axis
let g = FRAME2.append("g")
              .attr("transform", "translate("+100+","+100+")");

// load data into csv file
d3.csv("data/data.csv").then((data) => {

    xScale.domain(data.map(function(d){return d.category;}));
    yScale.domain([0, d3.max(data, function(d){return d.amount;})]);

    g.append("g")
        .attr('transform', 'translate(0,'+VIS_HEIGHT+ ')')
        .call(d3.axisBottom(xScale));

    g.append('g')
        .call(d3.axisLeft(yScale)
        .ticks(10));

    g.selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d){ return xScale(d.category);})
        .attr("y", function (d){ return yScale(d.amount);})
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){ return VIS_HEIGHT - yScale(d.amount);});
