import activateSidebar from './sidebar.js';
import {scrollPosition, scrollOpacity} from './scrollygraph.js';
import aceEditor from './ace-editor.js';

import testingOurExtension from './103/lifecycle-of-extension.js';
import '../sass/103. Make it Data Driven.scss';

var sectionList = [
  '.create-extension',
  '.paint-extension',
  '.resize-extension',
  '.initial-properties-editor',
  '.convert-extension',
  '.definition-editor',
  '.add-dimension',
  '.definition-editor-2',
  '.panel',
  '.q-matrix',
  '.q-matrix-row',
  '.q-matrix-cell',
  '.paint-editor',
  '.paint-editor-2',
  '.paint-editor-3',
  '.headers',
  '.paint-editor-4',
  '.ext-table'
];

// ============== Sidebar ==============
activateSidebar(3);

testingOurExtension('.lifecycle-of-extension');


// document.querySelector('body').onload = function(){
  // scrollygraph(sectionList);
// }


// // Initial Properties
// var initialProperties = 
// `var myProps = {
// 	textColor: "black",
// 	qHyperCubeDef: {
// 		qDimensions: [],
// 		qMeasures: [],
// 		qInitialDataFetch: [
// 			{
// 				qTop: 0,
// 				qLeft: 0,
// 				qWidth: 10,
// 				qHeight: 1000
// 			}
// 		]
// 	}
// };`

// aceEditor('initial-properties-editor', 'javascript', initialProperties);

// // Definition
// var definition =
// `var myDefinition = {
//     type: "items",
//     component: "accordion",
//     items: {
//         dimensions: {
//             uses: "dimensions",
//             min: 1,
//             max: 5
//         },
//         settings: {
//             uses: "settings"
//         }
//     }
// };`

// aceEditor('definition-editor', 'javascript', definition);

// // Definition 2
// var definition2 =
// `var myDefinition = {
//     type: "items",
//     component: "accordion",
//     items: {
//         dimensions: {
//             uses: "dimensions",
//             min: 1,
//             max: 5
//         },
//         measures: {
//             uses: "measures",
//             min: 0,
//             max: 5
//         },
//         sorting : {
//             uses: "sorting"
//         },
//         settings: {
//             uses: "settings"
//         }
//     }
// };`

// aceEditor('definition-editor-2', 'javascript', definition2);

// // Paint
// var paint =
// `var myPaint = function($element, layout) {
	
// // Clear the previous contents of the container so we start from scratch each time
// 	$element.html("");
// }`

// aceEditor('paint-editor', 'javascript', paint);

// // Paint 2
// var paint2 =
// `var myPaint = function($element, layout) {
	
// // Clear the previous contents of the container so we start from scratch each time
// 	$element.html("");

// 	// Create a table
// 	var table = document.createElement("table");
	
// 	// Create a header row
// 	var hRow = document.createElement("tr");
// }`

// aceEditor('paint-editor-2', 'javascript', paint2);

// // Paint 3
// var paint3 =
// `var myPaint = function($element, layout) {
// // Clear the previous contents of the container so we start from scratch each time
// 	$element.html("");

// 	// Create a table
// 	var table = document.createElement("table");
	
// 	// Create a header row
// 	var hRow = document.createElement("tr");

// 	// Add dimension labels
// 	var dimensionInfo = layout.qHyperCube.qDimensionInfo;
// 	for(var i = 0; i < dimensionInfo.length; i++) {
// 		// Create a header cell
// 		var hCell = document.createElement("th");
// 		// Set the cell contents to the dimension label
// 		hCell.innerHTML = dimensionInfo[i].qFallbackTitle;
// 		// Add the cell to the header row
// 		hRow.appendChild(hCell);
// 	}

// 	// Add measure labels
// 	var measureInfo = layout.qHyperCube.qMeasureInfo;
// 	for(var i = 0; i < measureInfo.length; i++) {
// 		// Create a header cell
// 		var hCell = document.createElement("th");
// 		// Set the cell contents to the measure label
// 		hCell.innerHTML = measureInfo[i].qFallbackTitle;
// 		// Add the cell to the header row
// 		hRow.appendChild(hCell);
// 	}

// 	// Add the header row to the table
// 	table.appendChild(hRow);

// 	// Append the table to the $element
// 	$element.append(table);
// }`

// aceEditor('paint-editor-3', 'javascript', paint3);

// // Paint 4
// var paint4 =
// `var myPaint = function($element, layout) {
// 	// ...
// 	var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;

// 	// Iterate through each row of the qMatrix
// 	for(var row = 0; row < qMatrix.length; row++) {
// 		// Get current row data
// 		var currentRow = qMatrix[row];
// 		// Create a row
// 		var tr = document.createElement("tr");
// 		// Iterate through each column of the row
// 		for(var col = 0; col < currentRow.length; col++) {
// 			// Get current cell data
// 			var currentCell = currentRow[col];
// 			// Create a cell
// 			var td = document.createElement("td");
// 			// Add text value to the cell
// 			td.innerHTML = currentCell.qText;
// 			// Append the cell to the row
// 			tr.appendChild(td);
// 		}
// 		// append the row to the table
// 		table.appendChild(tr);
// 	}

// 	// Append the table to the $element
// 	$element.appendChild(table);

// }`;

// aceEditor('paint-editor-4', 'javascript', paint4);