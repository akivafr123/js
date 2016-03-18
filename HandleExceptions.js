function primMultiply(num1, num2) {
	function multiplyPrimitives(num1, num2) {
		var result = num1 * num2;
		if (result instanceof Number) return result;
		throw new FunctionError("Invalid argument.")
	}
	try {
		multiplyPrimitives(num1, num2);
	}	catch (e) {
		if (e instanceof FunctionError)
			console.log(e.message);
			multiplyPrimitives(Number(num1), num2);
	}
}