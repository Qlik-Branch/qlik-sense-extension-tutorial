export default
`var myPaint = function($element, layout) {
// Clear the previous contents of the container so we start from scratch each time
	$element.html("");

	// Create a table
	var table = document.createElement("table");
	
	// Create a header row
	var hRow = document.createElement("tr");

	// Add dimension labels
	var dimensionInfo = layout.qHyperCube.qDimensionInfo;
	for(var i = 0; i < dimensionInfo.length; i++) {
		// Create a header cell
		var hCell = document.createElement("th");
		// Set the cell contents to the dimension label
		hCell.innerHTML = dimensionInfo[i].qFallbackTitle;
		// Add the cell to the header row
		hRow.appendChild(hCell);
	}

	// Add measure labels
	var measureInfo = layout.qHyperCube.qMeasureInfo;
	for(var i = 0; i < measureInfo.length; i++) {
		// Create a header cell
		var hCell = document.createElement("th");
		// Set the cell contents to the measure label
		hCell.innerHTML = measureInfo[i].qFallbackTitle;
		// Add the cell to the header row
		hRow.appendChild(hCell);
	}

	// Add the header row to the table
	table.appendChild(hRow);

	// Append the table to the $element
	$element.append(table);
}`