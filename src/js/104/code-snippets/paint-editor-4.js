export default
`// Add click functions to ".selectable" items
$element.find(".selectable").on("click", function() {
	// Get the dimension column number
	var dimCol = parseInt(this.getAttribute("dim-col"));
	
	// Get the dimension value index
	var dimInd = parseInt(this.getAttribute("dim-index"));

	// Call selectValues with these values
	backendApi.selectValues(dimCol, [dimInd],true);
})`