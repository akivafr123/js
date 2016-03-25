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