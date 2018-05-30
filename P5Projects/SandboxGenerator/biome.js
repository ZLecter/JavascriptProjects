// Voronoi library:
// https://github.com/Dozed12/p5.voronoi

let noiseScale = 4;
let vPoints = 20
let vPointX;
let vPointY;
let vPointColor;

let bBiome;

function setup() {
	createCanvas(400,400);
	// noLoop();
	frameRate(30);
	// noiseSeed(1);

	// Voronoi setup
	// voronoiRndSites(30, 50);
	bBiome = createButton('Calculate Biomes');
	bBiome.mousePressed(CalcBiomes);

	vPointX = new Array();
	vPointY = new Array();
	vPointColor = new Array();

	for (let i = 0; i < vPoints ; i++) {
		let x = random(width);
		let y = random(height);
		vPointX[i] = x;
		vPointY[i] = y;
		let c = BiomeSelector(random(100), random(100));
		vPointColor[i] = c;
		voronoiSite(x, y, c);
	}
	voronoi(width, height);

}

function draw() {
	background(0);
	// Perlin noise
	// PerlinNoise();

	//Voronoi
	voronoiClearSites();
	for (let i = 0; i < vPoints; i++) {
		let x = vPointX[i];
		let y = vPointY[i];
		let c = vPointColor[i];
		voronoiSite(x, y, c);
	}

	voronoiDraw(0,0);
	
}

function CalcBiomes(){
	for (let i = 0; i < vPoints; i++) {
		let cellID = voronoiGetSite(vPointX[i], vPointY[i]);
		// console.log(vPointColor[i].levels);
		console.log(cellID + "N: " + voronoiNeighbors(cellID));
		console.log(voronoiNeighbors(cellID));
		for (let x = 0; x < voronoiNeighbors(cellID).length; x++){
			let id = voronoiNeighbors(cellID)[x];

			let d = DistColor(vPointColor[i], vPointColor[id]);
			console.log(cellID + " to " + id + ": " + d);
			if(d > 255){
				vPointColor[id] = BiomeSelector(random(100), random(100));
				let d = DistColor(vPointColor[i], vPointColor[id]);
			}
		}
		console.log('');
	}
	redraw();
}

function DistColor(c1, c2) {
	let x1 = c1.levels[0];
	let y1 = c1.levels[1];
	let z1 = c1.levels[2];
	let x2 = c2.levels[0];
	let y2 = c2.levels[1];
	let z2 = c2.levels[2];
	let d = dist(x1,y1,z1,x2,y2,z2);
	return d;
}

function PerlinNoise() {
	loadPixels();
	let xoff = 0;
	for (let i = 0; i < width; i++) {
		let yoff = 0;
		for (let j = 0; j < height; j++) {
			let index = (i + j * width) * 4;
			let c = noise(xoff * noiseScale, yoff * noiseScale) * 255;
			
			let r, g, b;
			for(let x = 0; x < 255; x += 25){
				if(c < x){
					c = abs( 255 - x);
					break;
				}
			}

			pixels[index + 0] = c;
			pixels[index + 1] = c;
			pixels[index + 2] = c;
			pixels[index + 3] = 255;

			yoff += 0.01;
		}
		xoff += 0.01;
	}
	updatePixels();
}


function BiomeSelector(temp, preci) {
	if(preci <= 25){
		if(temp >= 60)
			return color(255, 0, 0); // desert
		else if(temp >=25)
			return color(254, 97, 97); // grass desert
		else
			return color(255, 191, 212); // tundra
	}else if(preci <= 50){
		if(temp >= 75)
			return color(254, 0, 170); //savanna
		else if(temp >= 50)
			return color(254, 64, 191); // woods
		else if(temp >= 25)
			return color(255, 128, 255); // taiga
		else
			return color(255, 191, 212); // tundra
	}else if(preci <= 75){
		if(temp >= 50)
			return color(170, 0, 154); // seasonal forest
		else if(temp >= 50)
			return color(190, 64, 154); // forest
		else if(temp >= 25)
			return color(255, 128, 255); // taiga
		else
			return color(255, 191, 212); // tundra
	}else{
		if(temp >= 75)
			return color(0, 0, 255); // rain forest
		else if(temp >= 50)
			return color(63, 54, 254); // swamp
		else if(temp >= 25)
			return color(255, 128, 255); // taiga
		else
			return color(255, 191, 212); // tundra
	}
}