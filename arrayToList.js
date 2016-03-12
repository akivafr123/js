function arrayToList(array) {
	var list = {};
	var rest = {};
	
	for (var i = array.length - 1; i >= 0; i--) {
		var list;
		var newList = {};
		newList.value = array[i];
		if (i == array.length - 1) {
		newList.rest = null;
		}
		else 
		   newList.rest = list;
		
		list = newList;
	}
	return list;
}

function listToArray(list) {
	var array = [];
	while (list.rest) {

		array.push(list.value);
		if (list.rest != null)
		list = list.rest;
	}
	array.push(list.value);
	return array;
}

function prepend(element, list) {
	var tempArray = listToArray(list);
	tempArray.unshift(element);
	
	console.log(tempArray);
	return arrayToList(tempArray);
}

function nth(number, list) {
	var tempArray = listToArray(list);
	return tempArray[number];
}

function recursiventh(number, list) {
	if (number == 0) return list.value;
	else return recursiventh(number -1, list.rest);
}

function deepEqual(object1, object2) {
	for (var props in object2) {
		if (!(props in object1 )) {
			console.log("Error. " + props + " is not in an object");
			return false;
		}	
	}
	for (var props in object1) {
		if (!(props in object2 )) {
			console.log("Error. " + props + " is not in an object");
			return false;
		}	
	}
	for (var props in object1) {
		
		//console.log("object1" + props + "  object2: " + object2[props]);

		if (typeof object1[props] == 'object' && typeof object2[props] == 'object' &&
			object1[props] != null && object2[props] != null) {
			//console.log("Checking object");
			return deepEqual(object1[props], object2[props]);
		}

		else {
			if (!(object1[props] === object2[props])) {
			//console.log("not equal: " + props);
		
				return false;
			}
		}
		    
		    
	}
	return true;
}
