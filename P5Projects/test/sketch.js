let bt;
let bgColor;
let colorActive = false;

let gridSize = 50;
let dancingPointsWidth = 200;
let dancingPointsHeight = 200;

let v = 0;

function ChangeColor(){
	colorActive = !this.checked();
}

function setup(){
	createCanvas(500, 500);
	createP('WEA');
	frameRate(60);
	bt = createCheckbox('Color?',true);
	bt.changed(ChangeColor);

	bgColor = color(255, 0);
}

function draw(){
	translate(width/2, height/2);
	background(bgColor);
	
	// Grid
	strokeWeight(1);
	for(let i = 0; i < width/2 ; i += gridSize){
		for(let j = 0; j < height/2 ; j += gridSize){
			line(i, height/2, i, -height/2);
			line(-i, height/2, -i, -height/2);
			line(width/2, j, -width/2, j);
			line(width/2, -j, -width/2, -j);
		}
	}

	// Dancing Points
	push();
	translate(0, 0);
	strokeWeight(10);
	let preCalc0X = cos(v / sin(v));
	let preCalc0Y = sin(v / cos(v));
	let preCalc1X = cos(v / -sin(-v));
	let preCalc1Y = sin(v / -cos(-v));
	let cr = map(preCalc0X, -1, 1, 0, 255);
	let cg = map(preCalc0Y, -1, 1, 0, 255);
	let cb = map(preCalc1X * preCalc1Y, -1, 1, 0, 255);
	// right side
	stroke(cr, cg, cb,255);
	if(colorActive){
		stroke(map(cr+cg+cb, 0, 255*3, 0, 255));
	}
	point(dancingPointsWidth * preCalc0X, dancingPointsHeight * preCalc0Y);
	point(dancingPointsWidth * preCalc1X, dancingPointsHeight * preCalc1Y);
	// left side
	point(dancingPointsWidth * -preCalc0X, dancingPointsHeight * -preCalc0Y);
	point(dancingPointsWidth * -preCalc1X, dancingPointsHeight * -preCalc1Y);
	pop();

	v+= 0.005;
	// v = sin(frameCount * 0.001) - cos(frameCount * 0.001);
}
