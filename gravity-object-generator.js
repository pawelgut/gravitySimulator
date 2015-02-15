function GravityObjectGenerator(maxVelocity) {
	this.maxVelocity = maxVelocity;
};

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
GravityObjectGenerator.prototype.getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};

GravityObjectGenerator.prototype.generateObject = function () {
	rand = {
		x: Math.floor(Math.random() * (c.width - 100)),
		y: Math.floor(Math.random() * (c.height - 100)),
		vX: (2*Math.random() - 1) * this.maxVelocity,
		vY: (2*Math.random() - 1) * this.maxVelocity
	};
	switch (this.getRandomInt(1,4)) {
		case 1:
			object = new GravityObject(rand.x, rand.y, rand.vX, rand.vY, 20, 20, "#FFFF00");
			break;
		case 2:
			object = new GravityObject(rand.x, rand.y, rand.vX, rand.vY, 10, 10, "#0000FF");
			break;
		case 3:
			object = new GravityObject(rand.x, rand.y, rand.vX, rand.vY, 5, 5, "#808080");
			break;
  }
  return object;
};

GravityObjectGenerator.prototype.generate = function (numberObjects) {
	objects = [];
	for (i = 0; i < numberObjects; i++) {
		objects.push(this.generateObject());
	}
	return objects;
};
