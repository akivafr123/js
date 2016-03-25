function f(x, y, z) {
	// First, verify that the right number of arguments was passed
	if (arguments.length != 3)
		throw new Error("function f called with " + arguments.length + 

			"arguments, but it expects 3 arguments.");
	return x + y + z;
}

function max(/* ... */) {
	var max = Number.NEGATIVE_INFINITY;
	// Loop through the arguments, looking for, and remembering,
	// the biggest
	for (var i = 0; i < arguments.length; i++)
		if (arguments[i] > max) max = arguments[i];
	// return the biggest
	return max;
}

// define a function to expect a single object and then have 
// users pass an object that defines the required name/value pairs
// This style of function invocation allows the function to specify
// defaults for any arguments that are omitted
function easyCopy(args) {
	arraycopy(args.from,
			  args.from_start || 0, 	// note default value provided
			  args.to,
			  args.to_start || 0,
			  args.length);
}

// Here is how you might invoke easycopy()
var a = [1,2,3,4], b = [];
easycopy({from: a, to: b, length: 4});

// type checking for functions that require i.e. array
function sum(a) {
	if (isArrayLike(a)) {
		var total = 0;
		for (var i = 0; i < a.length; i++) {
			var element = a[i];
			if (element == null) continue;
			if (isFinite(element)) total += element;
			else throw new Error("sum(): elements must be finite numbers");
		}
		return total;		
	}
	else throw new Error("sum(): argument must be array-like");
}

function flexisum(a) {
	var total = 0;
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i], n;
		if (element == null) continue;	// ignore null and undefined
		if (isArray(element))
			n = flexisum.apply(this, element);
			// compute its sum recursively
		else if (typeof element === "function")
			n = Number(element());	// invoke the function and convert
		else n = Number(element);	// else try to convert it

		if (isNaN(n))	// if we couldn't convert it to a number
			throw Error("flexisum(): can't convert " + element + 
				" to number");
		total += n;

	}
	return total;
	
}

/* Using functions as data */

// Define some simple functions here
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) { return x / y; }

// Here's a function that takes one of the above functions
// as an argument and invokes it on two operands
function operate(operator, operand1, operand2) {
    return operator(operand1, operand2);
}

// We could invoke like this to compute (2+3) + (4 * 5)
var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));

// implement functions as function literals within an object
// literal
var operators = {
	add: function(x, y) { return x + y; },
	subtract: function(x, y) { return x - y; },
	multiply: function(x, y) { return x * y; },
	divide: function(x, y) { return x / y; },
	pow: Math.pow	// works for predefined functions too
};

function operate2(operation, operand1, operand2) {
	if (typeof operators[operation] === "function")
		return operators[operation](operand1, operand2);
	else throw "unknown operator";
}

// Compute the value ("hello" + " " + "world") like this
var j = operate2("add", "hello", operate2("add", " ", "world"));
// Using the predefined Math.pow() function
var k = operate2("pow", 10, 2);

// to keep "static" variables that persist across invokations
// example: a function that must never return the same value
// twice. Store information in a property of the function object

// Inititalize the counter property of the function object.
// Function declarations are hoisted so we really can do this
// assignment before the function declaration
uniqueInteger.counter = 0;

// This function returns a different integer each time it is called.
// It uses a property of itself to remember the next value to be
// returned
function uniqueInteger() {
	return uniqueInteger.counter++;		// increment and return 
										// counter property

}

// Compute factorials and cache results as properties of the function
// itself
function factorial(n) {
	if (isFinite(n) && n > 0 && n == Math.round(n)) {
		// Finite, positive ints only
		if (!(n in factorial))	// if no cached result
			factorial[n] = n * factorial(n - 1);
		return factorial[n];
	}
	else return NaN;
}
factorial[1] = 1;	// Initialize the cache to hold this base case

/* Private property accessor methods using closures */

// This function adds property accessor methods for a property
// with the specified name to the object o. The methods are named
// get<name> and set<name>. If a predicate function is supplied,
// the setter method uses it to test its argument for validity
// before storing it. If the predicate returns false, the setter 
// method throws an exception.

// Unusual thing about this function is that the oroperty value
// that is manipulated by the getter and setter methods is not 
// stored in the object o. Instead, the value is stored only in a 
// local variable in this function. The getter and setter methods 
// are also defined locally to this function and therefore have 
// access to this local variable. This means that the value is 
// private to the two accessor methods, and it cannot be set 
// or modified except through the setter method.
function addPrivateProperty(o, name, predicate) {
    var value;  // This is the property value
   
    // The getter method simply returns the value 
    o["get" + name] = function() { return value; };
    
    // The setter method stores the value or throws an 
    // exception if the predicate rejects the value.
    o["set" + name] = function(v) {
        if (predicate && !predicate(v))
            throw Error("set" + name + ": invalid value " + v);
        else
            value = v;
    };
}

// The following code demonstrates the addPrivateProperty method
var o = {};

// Add property accessor methods getName and setName
// Ensure that only string values are allowed
addPrivateProperty(o, "Name", function(x) {
    return typeof x == "string";
});

o.setName("Frank");
console.log(o.getName());



    
