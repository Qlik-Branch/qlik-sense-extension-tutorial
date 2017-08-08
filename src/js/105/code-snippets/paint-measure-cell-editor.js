export default
`// ...
		// Add measure labels
        var measureInfo = layout.qHyperCube.qMeasureInfo;
        for(var i = 0; i < measureInfo.length; i++) {
            // Create a header cell
            var hCell = document.createElement("th");
            // Set the cell contents to the measure label
            hCell.innerHTML = measureInfo[i].qFallbackTitle;
            // Set the class as a measure cell
            hCell.className = "measureCell";
            // Add the cell to the header row
            hRow.appendChild(hCell);
		}
// ...
				// Check if dimension, then add metadata
				if(col < dimensionInfo.length) {
                    // Add a selectable class
					td.className = "selectable";
					// Add metadata for the selection
					td.setAttribute("dim-col",col);
					td.setAttribute("dim-index", currentCell.qElemNumber);
				}
                // If a measure cell, set the style
                else {
                    td.className = "measureCell";
				}
// ...`