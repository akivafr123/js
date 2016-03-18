// This object generates strictly increasing serial numbers
var serialnum = {
	// This data property holds the next serial number.
	// The $ in the property name hints that it is a private property..
	$n : 0,

	// Return the current value and increment it
	get next() {
		return this.$n++;
	},

	// Set a new value of n, but only if it is larger than current
	set next(n) {
		if (n >= this.$n) this.$n = n;
		else throw "serial number can only be set to a larger value";
	}
};

// This object has accessor properties that return random numbers. 
// The expression "random.octet" for example yields a random number
// between 0 and 255 each time it is evaluated
var random = {
	get octet() {
		return Math.floor(Math.random() * 256);
	},
	get uint16() {
		return Math.floor(Math.random() * 65536);
	},
	get int16() {
		return Math.floor(Math.random() * 65536) - 32768;
	}
};

function classof(o) {
	if (o === null) return "Null";
	if (o === undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8, -1);
}

// create a sealed object with a frozen prototype and a nonenumerable property
var o = Object.seal(Object.create(Object.freeze({x: 1}),
	{y: { value: 2, writable: true}}))