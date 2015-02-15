function GravityObject(x, y, vX, vY, mass, radius, color, fixed) {
	this.x = x;
	this.y = y;
	this.vX = vX;
	this.vY = vY;
	this.mass = mass;
	this.radius = radius;
	this.color = color;
	this.fixed = fixed;
	this.forceX = 0;
	this.forceY = 0;
};

GravityObject.prototype.isColliding = function (distanceSquared, obj) {
	return distanceSquared < Math.pow(this.radius + obj.radius, 2);
};

GravityObject.prototype.calculateForce = function(obj) {
	distanceX = obj.x - this.x;
	distanceY = obj.y - this.y;
	distanceSquared = Math.pow(distanceX, 2) + Math.pow(distanceY, 2);
	if (!this.isColliding(distanceSquared, obj)) {
		force = (gravConstant*obj.mass*this.mass)/distanceSquared;
		this.forceX = (distanceX*force)/Math.sqrt(distanceSquared);
		this.forceY = (distanceY*force)/Math.sqrt(distanceSquared);
	}
}

GravityObject.prototype.applyAcceleration = function(timestep) {
	this.vX += (this.forceX/this.mass)*timestep;
	this.vY += (this.forceY/this.mass)*timestep;
}

GravityObject.prototype.applyVelocity = function(timestep) {
	this.x += this.vX*timestep;
	this.y += this.vY*timestep;
}

GravityObject.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fill();
}

GravityObject.prototype.move = function(timestep) {
	this.applyAcceleration(timestep);
	this.applyVelocity(timestep);
	this.draw();
}
