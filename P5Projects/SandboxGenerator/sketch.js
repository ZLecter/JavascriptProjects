let noiseLOD = 2;
let noiseFalloff = 0.2;

let noiseScale = 0.05;
let nLevel = 5;
let iSeed;
let sLevels;
let bt;

function setup(){
	createCanvas(200,200);
	noLoop();
	// framerate(30);
	createP();
	bt = createButton('Redraw');
	bt.mousePressed(CalcDraw);

	sLevels = new Array(nLevel);

	iSeed = createInput('Seed');
	createP('Noise Scale');
	noiseScale = createSlider(0.01, 0.05, 0.05, 0.01);

	for(let i = 0; i < nLevel; i++){
		createP('Level ' + (nLevel - 1 - i));
		sLevels[i] = createSlider(0, 255, (255/nLevel) * i + 50);
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
					break;
				}
			}

			point(i, j);
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
