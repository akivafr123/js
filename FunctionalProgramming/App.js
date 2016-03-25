/* in non-functional style */
var data = [1, 1, 3, 5, 5];

var total = 0;
for (var i = 0; i < data.length; i++)
    total += data[i];
var mean = total / data.length; // mean of our data is 3

// To compute standard deviation, we first sum the squares
// of the deviation of each element from the mean 
total = 0;
for (var i = 0; i < data.length; i++) {
    var deviation = data[i] - mean;
    total += deviation * deviation;
}
var stddev = Math.sqrt(total / (data.length - 1));
console.log("Non-functional standard deviation is " + stddev);


/* In functional style */

// First, define two simple functions
var sum = function(x, y) {
    return x + y;
};

var square = function(x) {
    return x * x;
};

// Then use those functions with Array methods to compute mean 
// and stddev 
var functionalMean = data.reduce(sum)/data.length;
var functionalDeviations = data.map(function(x) {
    return x - mean;
});
var functionalStddev = 
    Math.sqrt(functionalDeviations.map(square).reduce(sum) / 
    (data.length - 1));
    
// Call the function f for each element of array a and
// return an array of the results. Same as 
// Array.prototype.map
var mapTo = function(a, f) {
    var results = [];
    for (var i = 0, len = a.length; i < len; i++) {
        if (i in a) results[i] = f.call(null, a[i], i, a);
    }
    return results;
};

// Reduce the array a to a single value using the function 
// f and optional initial value. Same as Array.prototype.reduce
var reduceTo = function(a, f, initial) {
    var i = 0, len = a.length, accumulator;
    
    // Start with the specified initial value, or use the 
    // first value in a 
    if (arguments.length > 2) accumulator = initial;
    else {
        // Find the first defined index in the array 
        if (len == 0) throw TypeError();
        while (i < len) {
            if (i in a) {
                accumulator = a[i++];
                break;
            }
            else i++;
        }
        if (i == len) throw TypeError();
    }
    
    // Now call f for each remaining element in the array 
    while (i < len) {
        if (i in a)
            accumulator = f.call(undefined, accumulator, a[i],
                i, a);
        i++;
    }
    
    return accumulator;
};
data = [1, 1, 3, 5, 5];
var altMean = reduceTo(data, sum) / data.length;
var altDev = mapTo(data, function(x) {
    return x - mean;
});
var altStdDev = Math.sqrt(reduceTo(mapTo(altDev, square), sum) / 
        (data.length - 1));
console.log("Mean: " + altMean);
console.log("Deviation: " + altDev);
console.log("Standard Deviation: "+ altStdDev);