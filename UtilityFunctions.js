/* Copy the enumerable properties of p to o and return o. If o and
 * p have a property by the same name, o's property is overwritten
 * This function does not handle getters and setters or copy
 * attributes */
 function extend(o, p) {
 	for (prop in p) {
 		o[prop] = p[prop];
 	}
 	return o;
 }

 /*
  * Copy the enumerable properties of p to o and return o. If o and p 
  * have a property by the same name, o's property is left alone.
  * Does not handle g & s or copy attributes
  */
 function merge(o, p) {
  	for (prop in p) {
  		if (o.hasOwnProperty[prop]) continue;
  		o[prop] = p[prop];
  	}
  	return o;
  }

  /*
   * Remove properties from o if there is not a property with the same
   * name in p. Return o.
   */
function restrict(o, p) {
	for (prop in o) {
   		if (!(prop in p)) delete o[prop];
   	}
   	return o;
}

/* For each property of p, delete the property with the same name from o.
 * Return o. */
function subtract(o, p) {
	for (prop in p) {
		delete o[prop];  // (deleting a nonexistant property is harmless)
	}

	return o;
}

/* Return a new object that holds the properties of both o and p.
 * If o and p have properties by the same name, the values from
 * o are used. */
function union(o, p) {
	return extend(extend({}, o), p);
}

/*
 * Return a new object that holds only the properties of o that also
 * appear in p. This is something like the intersection of o and p, but
 * the values of the properties in p are discarded.
 */
 function intersection(o, p) {
    return restrict(extend({}, o), p);
 }

 /*
  * Return an array that holds the names of the enumerable own properties
  * of o.
  */
  function keys(o) {
     if (typeof o != "object") throw TypeError();
     var result = [];
     for (var prop in o) {
        if (o.hasOwnProperty(prop))
          result.push(prop);
     }
     return result;
  }


/* Getters and setters */
var p = {
  x: 1.0,
  y: 1.0,

  // r is a read-write accessor property with getter and setter.
  // Don't forget to put a comma after accessor methods.
  get r() { return Math.sqrt(this.x * this.x + this.y * this.y); },
  set r(newValue) {
    var oldValue = Math.sqrt(this.x * this.x + this.y * this.y);
    var ratio = newValue / oldValue;
    this.x *= ratio;
    this.y *= ratio;
  },
  // theta is a read-only accessor property with getter only
  get theta() { return Math.atan2(this.y, this.x); }
};