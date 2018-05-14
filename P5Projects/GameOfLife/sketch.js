let gridScale = 10;
let pointsOnGrid;

let xlen;
let ylen;

let btClear;
let btFill;
let btPlay;
let slSpeed;
let play;

function create2DArray (x, y){
	let array = new Array(x);
	for(let i = 0; i < array.length; i++)
		array[i] = new Array(y);
	return array;
}

function clearGrid(){
	for(let i = 0; i < xlen; i++)
		for(let j = 0; j < ylen; j++)
			pointsOnGrid[i][j] = 0;
}

function fillGrid(){
	for(let i = 0; i < xlen; i++)
		for(let j = 0; j < ylen; j++)
			pointsOnGrid[i][j] = floor(random(2));
}

function changePlay(){
	if(play)
		btPlay.html('Play');
	else
		btPlay.html('Stop');

	play = !play;
}

function setup (){
	createCanvas(500,500);
	frameRate(60);
	background(64);

	xlen = width/gridScale;
	ylen = height/gridScale;
	pointsOnGrid = create2DArray(xlen, ylen);

	createP('Click on the grid to populate/unpopulate a cell');
	btClear = createButton('Clear Grid');
	btClear.mousePressed(clearGrid);

	btFill = createButton('Random Grid');
	btFill.mousePressed(fillGrid);

	btPlay = createButton('Play');
	btPlay.mousePressed(changePlay);
	play = false;

	createP('Speed\n');
	slSpeed = createSlider(1, 60, 30, 1);

	fillGrid();

}

function draw(){
	background(64);
	frameRate(slSpeed.value());
	drawGrid();
	
	// Draw populated cells
	for(let i = 0; i < xlen; i++){
		for(let j = 0; j < ylen; j++){
			if(pointsOnGrid[i][j] == 1)
				rect(i*gridScale, j*gridScale, gridScale, gridScale)
		}
	}

	if(play)
		pointsOnGrid = calcNextGrid();
}

function mouseClicked(){
	let xpos = parseInt(mouseX/gridScale);
	let ypos = parseInt(mouseY/gridScale);
	if(pointsOnGrid[xpos][ypos] == 1)
		pointsOnGrid[xpos][ypos] = 0;
	else
		pointsOnGrid[xpos][ypos] = 1;
}

function drawGrid(){
	for(let i = 0; i < width; i += gridScale){
		for(let j = 0; j < height; j += gridScale){
			line(i, 0, i, height);
			line(0, j, width, j);
		}
	}
}

function checkNeighbors(xpos, ypos){
	let n = 0;
	for(let i = -1; i < 2; i++){
		for(let j = -1; j < 2; j++){
			let x = (xpos + i + xlen) % xlen;
			let y = (ypos + j + ylen) % ylen;
			n += pointsOnGrid[x][y];
		}
	}
	n -= pointsOnGrid[xpos][ypos];
	return n;
}

function calcNextGrid(){
	let nextGrid = create2DArray(xlen, ylen);
	for(let i = 0; i < xlen; i++){
		for(let j = 0; j < ylen; j++){
			let state = pointsOnGrid[i][j];
			// 0 = empty 	// 1 = populated
			let neighbors = checkNeighbors(i,j);

			if(state == 0 &&  neighbors == 3)
				nextGrid[i][j] = 1;
			else if(state == 1 && (neighbors <= 1 || neighbors >= 4))
				nextGrid[i][j] = 0;
			else
				nextGrid[i][j] = state;

		}
	}
	return nextGrid;
}