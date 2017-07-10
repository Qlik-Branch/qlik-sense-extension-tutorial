import activateSidebar from './sidebar.js';
import scrollygraph from './scrollygraph.js';
import aceEditor from './ace-editor.js';

import '../sass/104. Make it Selectable.scss';

var sectionList = [
	'.field-indices',
	'.hypercube-table-annotated',
	'.select-values-editor',
	'.pre-selection',
	'.post-selection',
	'.select-values-editor-2',
	'.select-values-editor-3',
	'.paint-editor',
	'.paint-editor-2',
	'.paint-editor-3',
	'.paint-editor-4',
	'.extension-selection'
];

// ============== Sidebar ==============
activateSidebar(4);

document.querySelector('body').onload = function(){
  scrollygraph(sectionList);
}


// Select Values
var selectValues =
`selectValues(0, [1,3],false)`;

aceEditor('select-values-editor', 'javascript', selectValues);

// // Select Values 2
// var selectValues2 =
// `selectValues(0,[4],true)`;

// aceEditor('select-values-editor-2', 'javascript', selectValues2);

// Paint Editor
var paintEditor =
`var myPaint = function($element, layout) {
	var backendApi = this.backendApi;
	// ...
};`

aceEditor('paint-editor', 'javascript', paintEditor);

// Paint Editor 2
var paintEditor2 =
`// Iterate through each row of the qMatrix
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
		
		// Check if dimension, then add metadata
		if(col < dimensionInfo.length) {
		}
		
		// Append the cell to the row
		tr.appendChild(td);
	}
	// append the row to the table
	table.appendChild(tr);
}`

aceEditor('paint-editor-2', 'javascript', paintEditor2);

// Paint Editor 3
var paintEditor3 =
`// Check if dimension, then add metadata
if(col < dimensionInfo.length) {
	// Add a selectable class
	td.className = "selectable";
	// Add metadata for the selection
	td.setAttribute("dim-col",col);
	td.setAttribute("dim-index", currentCell.qElemNumber);
}`

aceEditor('paint-editor-3', 'javascript', paintEditor3);

// Paint Editor 4
var paintEditor4 =
`// Add click functions to ".selectable" items
$element.find(".selectable").on("click", function() {
	// Get the dimension column number
	var dimCol = parseInt(this.getAttribute("dim-col"));
	
	// Get the dimension value index
	var dimInd = parseInt(this.getAttribute("dim-index"));

	// Call selectValues with these values
	backendApi.selectValues(dimCol, [dimInd],true);
});`

aceEditor('paint-editor-4', 'javascript', paintEditor4);