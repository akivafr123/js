function every(array, predicate) {
	for (var i = 0; i < array.length; i++) 
		if (predicate(i) === false) return false;
	
	return true;
}

function some(array, predicate) {
	for (var i = 0; i < array.length; i++) {
		if (predicate(array[i]) === true) return true;
	}
	return false;
}
