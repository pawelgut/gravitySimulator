var GravityObject = function(x, y, mass, radius, color) {
	this.x = x;
	this.y = y;
	this.mass = mass;
	this.radius = radius;
	this.color = color;
};

GravityObject.prototype.draw = function() {
	ctx.fillStyle = p.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fill();
}

var Planet = function(x, y, mass, radius, color) {
	GravityObject.call(this, x, y, mass, radius, color);
};

Planet.prototype = Object.create(GravityObject.prototype);
Planet.prototype.constructor = Planet;
