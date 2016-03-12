function female(p) {
	return p.sex == "f";
}

function isMother(person) {
	
	return byName[person.mother] != null;
}

function ageDifference(person) {
	var motherBorn = byName[person.mother].born
	var difference = motherBorn - person.born
	return difference
}

var century = {};


	


	ancestry.forEach(function(person, century) {
		function centuryLived(person) {
		return Math.ceil(person.died / 100)
		}
		function finalAge(person) {
			return person.died - person.born;
		}n
		if (!(centuryLived(person) in century)) {
			century[centuryLived(person)] = [];
			}
			var array = century[centuryLived(person)]
			array.push(finalAge(person));
	})


	