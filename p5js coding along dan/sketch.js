var circle;
var path = [];
var k = -2; // TODO: Slider for k
var inc = 0.005; // maybe relate the increment to k and the number of children
var children = 5;

var onlyPath = false;
var onlyPathCheckbox;

var drawVertex = true;
var drawVertexCheckbox;


function setup() {
	createCanvas(600, 600);
	
	onlyPathCheckbox = createCheckbox("Show Circles",true); // Initialize checkboxes
	onlyPathCheckbox.position(width+10, 10);
	onlyPathCheckbox.changed(function() {
		onlyPath = !onlyPath;
	});
	
	drawVertexCheckbox = createCheckbox("Show as Path",true);
	drawVertexCheckbox.position(width+10, 30);
	drawVertexCheckbox.changed(function() {
		drawVertex = !drawVertex;
	});
	
	circle = new Circle(100, createVector(width/2,height/2), inc);
	for (var i = 0; i < children; i++) { // append ____ children to inital Circle
		circle.addChildren();
	}
}

function draw() {	
	background(51);
	circle.rotate(); // updates all circles (mind the recursion in the function)
	circle.show();
	
	if(drawVertex) { // draw path as verticies
		noFill();
		beginShape();
		path.forEach(function(a) {
			stroke(0,255,0);
			vertex(a.x, a.y);
		});
		endShape();
	} else { // draw path as individual points
		path.forEach(function(a) {
			stroke(0,255,0);	
			point(a.x, a.y);
		});
	}
	
	while (path.length > 5000) { // improve perfomance by deleting previous points of path
		path.splice(0,1); // Should maybe check, if it returned to it origin until it starts splicing
	}
}