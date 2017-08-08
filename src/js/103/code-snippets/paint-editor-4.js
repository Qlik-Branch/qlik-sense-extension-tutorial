export default
`var myPaint = function($element, layout) {
	// ...
	var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;

	// Iterate through each row of the qMatrix
	for(var row = 0; row < qMatrix.length; row++) {
		// Get current row data
		var currentRow = qMatrix[row];
		// Create a row
		var tr = document.createElement("tr");
		// Iterate through each column of the row
		for(var col = 0; col < currentRow.length; col++) {
			// Get current cell data
			var currentCell = currentRow[col];
			// Create a cell
			var td = document.createElement("td");
			// Add text value to the cell
			td.innerHTML = currentCell.qText;
			// Append the cell to the row
			tr.appendChild(td);
		}
		// append the row to the table
		table.appendChild(tr);
	}

	// Append the table to the $element
	$element.append(table);

}`