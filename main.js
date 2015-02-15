var c = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");
var generator = new GravityObjectGenerator(0.00005);
var gravityObjects = generator.generate(500);
var lastTime = new Date();
var gravConstant = 0.1;

var calculateForce = function () {
	for (i = 0; i < gravityObjects.length; i++) {
		for (j = 0; j < gravityObjects.length; j++) {
			if (i != j) {
				gravityObjects[j].calculateForce(gravityObjects[i]);
			}
		}
	}
};

var moveObjects = function (timestep) {
	for (i = 0; i < gravityObjects.length; i++) {
		gravityObjects[i].move(timestep);
	}
}

var moveWorld = function (timestep) {
	calculateForce();
	moveObjects(timestep);
}

function NextFrame() {
	ctx.clearRect(0, 0, c.width, c.height);
	timestep = new Date() - lastTime;
	lastTime = new Date();
	moveWorld(timestep);
	window.requestAnimationFrame(NextFrame);
};

NextFrame();
