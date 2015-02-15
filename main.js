var c = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");
var generator = new GravityObjectGenerator(0.05);
var gravityObjects = generator.generate(20);
var lastTime = new Date();
var gravConstant = 0.1;
var timestep;

var moveWorld = function () {
	for (i = 0; i < gravityObjects.length; i++) {
		obj = gravityObjects[i];
		for (j = 0; j < gravityObjects.length; j++) {
			if (i != j) {
				gravityObjects[j].calculateForce(obj);
			}
		}
		obj.move(timestep);
	}
}

function NextFrame() {
	ctx.clearRect(0, 0, c.width, c.height);
	timestep = new Date() - lastTime;
	lastTime = new Date();
	moveWorld();
	window.requestAnimationFrame(NextFrame);
}

NextFrame();
