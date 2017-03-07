function Particle(position, velocity, mass) {
	if(position) {
		this.pos = position;
	} else {
		this.pos = createVector(random(width), random(height));
	}
	if(velocity) {
		this.vel = velocity;
	} else {
		this.vel = p5.Vector.random2D(); //createVector(0, 0);
	}
	if(mass) {
		this.mass = mass;
	} else {
		this.mass = random(1,5);
	}
	this.acc = createVector(0, 0);
	this.hu = random(360);
	this.radius = 1;
	this.crash = false;
	
	this.update = function() {
		this.radius = sqrt(this.mass);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.attract = function(other) {
		if (p5.Vector.dist(other.pos, this.pos) <= this.radius + other.radius) {
			var velx = (this.vel.x * this.mass + other.vel.x * other.mass) / (this.mass + other.mass);
			var vely = (this.vel.y * this.mass + other.vel.y * other.mass) / (this.mass + other.mass);
			var velmag = sqrt(pow(velx,2) + pow(vely,2));
			var heading = atan(vely/velx);

			var tmpvel = p5.Vector.fromAngle(heading);
			tmpvel.setMag(velmag);
			if (this.mass <= other.mass) {
				other.vel = tmpvel;
				other.mass += this.mass;
				this.crash = true;
			} else {
				this.vel = tmpvel;
				this.mass += other.mass;
				other.crash = true;
			}
		}
		var force = p5.Vector.sub(other.pos, this.pos);
		var dis = p5.Vector.dist(this.pos, other.pos);
		var strength = grav * other.mass / (dis*dis);
		force.setMag(strength);
		this.applyForce(force);
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.show = function() {
		stroke(this.hu, 255, 255);
		fill(this.hu,255,255);
		ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
	}
}