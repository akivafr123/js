var scope = "global";
function checkScope3() {
	var scope = "local";
	return scope;		// return the local value, not the global one
}
checkScope3();		// => "local"

scope = "global";		// Declare a global variable, even w/o 'var'
function checkScope2() {
	scope = "local";		// changes the global variable without 'var'
	myScope = "local";		// implicitly declares a new global variable
	return [scope, myScope];
}
checkScope2();	// ["local", "local"]
scope;			// "local" global variable has changed
myScope;		// "local" global namespace polluted



var scope = "global scope";
function checkScope() {
	var scope = "local scope";
	function nested() {
		var scope = "nested scope";
		return scope;
	}
	return nested();
}
checkScope();		// "nested scope"

function test(o) {
	var i = 0;		// i is defined throughout function
	if (typeof o == "object") {
		var j = 0;	// j is defined everywhere, not just block
		for (var k = 0; k < 10; k++) {
			// k is defined everywhere, not just loop
			console.log(k);
		}
		console.log(k);	// k still defined, prints 10
	}
	console.log(j);	// j is defined, but may not be initialized
}

var scope = "global";
function f() {
	console.log(scope);		// Prints "Undefined", not "global"
	var scope = "local";	// variable initialized here but defined everywhere
							// the above declaration is "hoisted"
	console.log(scope);		// Prints "Local"
}

var trueVar = 1;		// Properly declared global variable, nondeletable
fakeVar = 2;			// Creates deletable property of global object
this.fakeVar2 = 3;		// This does the same thing
delete trueVar;			// false: variable not deleted
delete fakeVar;			// true
delete this.fakeVar2;	// true