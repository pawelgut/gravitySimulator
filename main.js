
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var c = document.getElementById("canvas");
var ctx = document.getElementById("canvas").getContext("2d");
var planets = [];
var ship;
var lastDate = new Date();
var timestep;
var finishLineSize = 100;

function generatePlanet() {
  var randPosition = {
    x: Math.floor(Math.random() * (c.width - 100)),
    y: Math.floor(Math.random() * (c.width - 100))
  };
  var planet;
  switch (getRandomInt(1,4)) {
    case 1:
      planet = new Planet(randPosition.x, randPosition.y, 20, 20, "#FFFF00");
      break;
    case 2:
      planet = new Planet(randPosition.x, randPosition.y, 10, 10, "#0000FF");
      break;
    case 3:
      planet = new Planet(randPosition.x, randPosition.y, 5, 5, "#808080");
      break;
    default:
      // do nothing
  }
  return planet;
}

var generatePlanets = function (numberPlanets) {
	for (i = 0; i < numberPlanets; i++) {
    planet = generatePlanet();
		planets.push(planet);
	}
};

c.onmousedown = function(e){
	distanceX = e.clientX - ship.x;
	distanceY = e.clientY - ship.y;
	magnitude = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
	componentX = ship.x + 100 * (distanceX / magnitude);
	componentY = ship.y + 100 * (distanceY / magnitude);
	planets.push(new GravityObject(componentX, componentY, 100, 15, "#000000"));
};

c.onmouseup = function(e){
	planets.pop();
};

var drawFinishLine = function () {
	ctx.fillStyle = "#000000";
	ctx.moveTo(c.width, c.height - finishLineSize);
	ctx.lineTo(c.width - finishLineSize, c.height);
	ctx.stroke();
};


var checkForCollision = function () {
	for (i=0; i < planets.length; i++) {
		p = planets[i];
		if ((p.name != "boost") && isColliding(p)) {
			gameFailed();
		}
	}
};

var isColliding = function (planet) {
	distanceSquared = Math.pow(planet.x - ship.x, 2) + Math.pow(planet.y - ship.y, 2);
	return distanceSquared < Math.pow(ship.radius + planet.radius, 2)
};

var checkIfGameFinished = function () {
	if ((ship.x + ship.y) > (c.width + c.height - finishLineSize)) {
		gameWon();
	}
};

var drawEverything = function () {
	for (i=0; i < planets.length; i++) {
		p = planets[i];
        p.draw();
	}
	ship.draw();
	drawFinishLine();
}

var gameFailed = function () {
	console.log("YOU LOSE");
};

var gameWon = function () {
	console.log("YOU WIN");
};

function Update() {
	timestep = new Date() - lastDate;
	lastDate = new Date();
	ctx.clearRect(0, 0, c.width, c.height);
	ship.move();
	drawEverything();
	checkForCollision();
	checkIfGameFinished();
	window.requestAnimationFrame(Update);
};

function Start() {
	ship = new Ship(10, 10, 0.03, 0.03, 10);
	generatePlanets(15);
	window.requestAnimationFrame(Update);
}

Start();
