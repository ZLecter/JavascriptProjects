let noiseLOD = 2;
let noiseFalloff = 0.2;

let noiseScale = 0.05;
let nLevel = 5;
let iSeed;
let sLevels;
let bt;
let cbFlower;
let sFlower;

let noiseValues;

function setup(){
	createCanvas(200,200);
	noLoop();

	noiseValues = new Array(width*height);

	createP();
	bt = createButton('Redraw');
	bt.mousePressed(CalcDraw);

	sLevels = new Array(nLevel);

	iSeed = createInput('Seed');
	createP('');
	cbFlower = createCheckbox('Flowers?', false);
	sFlower = createSlider(0,nLevel-2, 0, 1);
	createP('Noise Scale');
	noiseScale = createSlider(0.01, 0.05, 0.05, 0.01);

	for(let i = 0; i < nLevel; i++){
		createP('Level ' + i);
		sLevels[i] = createSlider(0, 255, (255/nLevel) * i + 50);
		console.log(i + " " + sLevels[i].value());
	}

}

function draw(){
	background(255,0,0);
	let ns = noiseScale.value();

	let seed = (iSeed.value() == 0)? random(264) : HashCode(iSeed.value());
	noiseSeed(seed);
	console.log(seed);

	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			noiseDetail(noiseLOD, noiseFalloff);
			let n = noise((i * ns) + (noise(i*ns, j*ns)), j * ns);
			n = n * 2 * 255;
			
			for (let k = 0; k < nLevel; k++) {
				if(n < sLevels[k].value()){
					stroke((255/nLevel) * k);
					noiseValues[i + j*width] = (255/nLevel) * k;
					break;
				}
			}

			point(i, j);
		}
	}

	if(!cbFlower.checked()){
		return;
	}

	for (let i = 0; i < (width*height)/3000; i++){
		let flower = (random() < 0.5)? 255: 0;
		let patchPosX = floor(random(width));
		let patchPosY = floor(random(height));

		for (let j = 0; j < 10; j++) {
			let flowerPosX = patchPosX;
			let flowerPosY = patchPosY;

			for (let k = 0; k < 5; k++) {

				flowerPosX = flowerPosX + floor(random(0,6)) - floor(random(0,6));
				flowerPosY = flowerPosY + floor(random(0,6)) - floor(random(0,6));
				if((flowerPosX >= 0 && flowerPosX < width) &&
					(flowerPosY >= 0 && flowerPosY < height)){

					let levelValue = sLevels[sFlower.value()].value();
					if(noiseValues[flowerPosX + flowerPosY*width] == levelValue + 1){
						stroke(255, flower, 0);
						point(flowerPosX, flowerPosY);
					}

				}

			}
		}

	}

}

function CalcDraw(){
	redraw();
}

function HashCode(s){
	let h = 0, l = s.length, i = 0;
	if(l > 0)
		while(i < l)
			h = (h << 5) - h + s.charCodeAt(i++) | 0;
	return h;
}
