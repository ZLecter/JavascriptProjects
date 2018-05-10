let b;
let bgColor;
let radius = 80;

function setup(){
	createCanvas(500, 500);
	createP('WEA');
	b = createSlider(50, 340, radius);

	bgColor = color('#41BD80FF');
}

function draw(){
	background(bgColor);
	radius = b.value();

	if (mouseIsPressed)
		fill(255, 0, 204);
	else
		fill(128);

	ellipse(mouseX,mouseY, radius, radius);
}
