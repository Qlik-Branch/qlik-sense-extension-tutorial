export default
`// Check if dimension, then add metadata
if(col < dimensionInfo.length) {
	// Add a selectable class
	td.className = "selectable";
	// Add metadata for the selection
	td.setAttribute("dim-col",col);
	td.setAttribute("dim-index", currentCell.qElemNumber);
}`