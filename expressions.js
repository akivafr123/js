var rectangle = { upperLeft: { x: 2, y: 2 }, 
				  lowerRight: {x: 4, y: 5 } };
// nested object literals

var square = { "upperLeft": { x: p.x, y: p.y },
			   'lowerRight': { x: p.x + side, y: p.y + side }};
// Property names in object literals may be strings rather than
// identifiers. (userful too specify property names that are 
// reserved words or otherwise not legal identifiers)

var square = function(x) { return x * x; }
// function expression is keyword function followed by parameters
// and the function body

// template strings:
// using concatenation
let currentTemp = 19.5;
const message = "the current temp is " + currentTemp + "\u00b0c";

// using template strings:
let currentTemp = 19.5;
const message2 = "the current temp is ${currentTemp}\u00b0c";

// multiline strings
//for single and double quoted strings can escape newline this way:
const multiline = "line1\
line2"; 	// no newline in string

// with backtick strings
const multiline2 = `line1
line2`;		// results in newline in string

const multiline3 = 'Current temperature:\n' +
`\t${currentTemp}\u00b0C\n` +
"Don't worry...the heat is on!";

// for...in loop loops over all the properties of an object
var player = { name: 'Thomas', rank: 'Midshipman', age: 25 };
for (var prop in player) {
	if (!player.hasOwnProperty(prop)) continue;
	console.log(prop + ': ' + player[prop]);
}

// for... of loop can be used on any object that is iterable, i.e arrays
// the following loops over the contents of an array
var arr = [1, 2, 3];
for (var nu of arr)
	console.log(nu);
