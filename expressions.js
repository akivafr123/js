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