function findDate(string) {
	var dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
	var match = dateTime.exec(string);
	return new Date(Number(match[3]), Number(match[2]) - 1, 
		Number(match[1]));
}

var stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
	amount = Number(amount) - 1;
	if (amount == 1) 	// only 1 left, remove the 's'
		unit = unit.slice(0, unit.length - 1);
	else if (amount == 0)
		amount = "no";
	return amount + " " + unit;
}

stock.replace(/(\d+) (\w+)/g, minusOne);