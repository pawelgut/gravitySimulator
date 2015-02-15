var Ship = function(x, y, vX, vY, radius) {
  this.x = x;
  this.y = y;
  this.vX = vX;
  this.vY = vY;
  this.radius = radius;
};

Ship.prototype.draw = function() {
	ctx.fillStyle = "#FF0000";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fill();
};

Ship.prototype.move = function() {
	for (i=0; i < planets.length; i++) {
		p = planets[i];
		magnitude = Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2));
		componentX = (p.x - this.x) / magnitude;
		componentY = (p.y - this.y) / magnitude;
  		absForce = p.mass/Math.pow(magnitude, 2);
		changeX = componentX * absForce;
		changeY = componentY * absForce;
    	if (!isColliding(p)) {
			this.vX += changeX;
			this.vY += changeY;
		}
	}
	this.x += this.vX*timestep;
	this.y += this.vY*timestep;
 };
