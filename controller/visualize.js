var width = 1400,
	height = 750,
	dataSet = {};

var color = d3.scale.category20();

// Gives it the physics of the force directed layout
var force = d3.layout.force()
	.size([width, height]);

// Sets up the SVG that will act as our canvas
var svg = d3.select("#chart").append("svg")
	.attr("width", width)
	.attr("height", height);

// Use the json file for the graph data
d3.json("visualization.json", function(error, json) {
	console.log("e: " + error);
    dataSet = json;
    visualizeIt();
    return 0;
});

/* Performs all the visualization, 
 * adding nodes and links and setting their attributes / styles 
 */
function visualizeIt() {
	force
		.nodes(dataSet.nodes)
		.links(dataSet.links)
		.charge(-500)
		.linkDistance(1)
		.linkStrength(0.1)
		.start();

	var link = svg.selectAll(".link")
		.data(dataSet.links)
	  .enter().append("line")
		.attr("class", "link")
		.style("stroke-width", function(d, i) { return (Math.sqrt(d.size)); })
		.style("stroke", "#999")
		.style("stroke-opacity", .9)
		.attr("marker-end", "url(#end)");


	var node = svg.selectAll(".node")
		.data(dataSet.nodes)
	  .enter().append("circle")
	  	.attr("class", "node")
	  	.attr("r", function(d, i) { return setNodeSize(d); })
	  	.style("fill", function(d) { return color(d.group)})
	  	.style("stroke", "black")
	  	.style("stroke-width", 1.5)
	  	.call(force.drag);

	// Node mouse-over label
	node.append("title")
		.text(function(d) { return d.IP; });

	force.on("tick", function() {
     link.attr("x1", function(d, i) { return d.source.x; })
        .attr("y1", function(d, i) { return d.source.y; })
        .attr("x2", function(d, i) { return d.target.x; })
        .attr("y2", function(d, i) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  	});

}

/* Helper function to set the node size equal to the sum of its edge sizes.
 * Sets min and max for the size, and scales it down using the sqrt. 
 */
function setNodeSize(node) {
	var result = 0;
	var index = node.index;

	for (prop in dataSet.links) {
		// get source link index
		var src = dataSet.links[prop].source.index;
		// get target link index
		var targ = dataSet.links[prop].target.index;
		// Check if source or target index == the node's index. 
		// If so, add the link (packet) size to the result.
		if (src == index || targ == index) { result += dataSet.links[prop].size; }
	} 

	// Use Math.sqrt of result to scale it down.
	// Use 8 as the default min node size.
	if (Math.sqrt(result) < 8) { result = 8; }
	// Use 75 as the default max node size.
	else if (Math.sqrt(result) > 75) { result = 75; }
	// Else just use the default.
	else { result = Math.sqrt(result); }
	return result;
}

