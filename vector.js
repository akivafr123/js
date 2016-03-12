function Vector(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.plus = function(vector) {
	var addX = this.x + vector.x;
	var addY = this.y + vector.y;
	var newVec = new Vector(addX, addY);
	return newVec;
}

Vector.prototype.minus = function(vector) {
	var minX = this.x - vector.x;
	var minY = this.y - vector.y;
	var newVec = new Vector(minX, minY);
	
	return newVec;
}

Object.defineProperty(Vector.prototype, "length", {
	get: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
});