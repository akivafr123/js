function StretchCell(inner, width, height) {
	this.inner = inner;
	this.width = width;
	this.height = height;
}

StretchCell.prototype.minWidth = function() {
	if (this.width >= this.inner.minWidth())
		return this.width;
	else return this.inner.minWidth();

}

StretchCell.prototype.minHeight = function() {
	if (this.height >= this.inner.minHeight())
		return this.height;
	else return this.inner.minHeight();
}

StretchCell.prototype.draw = function(width, height) {
	var result = [];
	
	for (var i = 0; i < height; i++) {
		var line = this.inner.text[i] || "";
		while (line.length < width) {
			line += " ";
		}
		result.push(line);
	}
	return result;
};

