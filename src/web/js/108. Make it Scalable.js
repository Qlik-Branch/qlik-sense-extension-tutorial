import activateSidebar from './sidebar.js';
import {scrollPosition} from './scrollygraph.js';
import aceEditor from './ace-editor.js';

import '../sass/108. Make it Scalable.scss';

// ============== Sidebar ==============
activateSidebar(8);


// Definition
var definition =
`[
	{
		qTop: 0,
		qLeft: 0,
		qWidth: 5,
		qHeight: 1000
	},
	{
		qTop: 1000,
		qLeft: 0,
		qWidth: 5,
		qHeight: 1000
	},
	{
		qTop: 2000,
		qLeft: 0,
		qWidth: 5,
		qHeight: 500
	}
]`;

aceEditor('definition-editor', 'javascript', definition, 'page definition');


// Paint
var paint =
`// Create a table
var table = document.createElement("table");

// Create a table head and body 
var thead = document.createElement("thead");
var tbody = document.createElement("tbody");
table.appendChild(thead);
table.appendChild(tbody);`;

aceEditor('paint-editor', 'javascript', paint, 'paint.js');


// Paint 2
var paint2 =
`// Add the header row to the table
thead.appendChild(hRow);

...

// append the row to the table body
tbody.appendChild(tr);`;

aceEditor('paint-editor-2', 'javascript', paint2, 'paint.js');


// Paint 3
var paint3 =
`function render(qMatrix) {
    // Clear the tbody
    tbody.innerHTML = "";

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
            
            // Check if dimension, then add metadata
            if(col < dimensionInfo.length) {
                // Add a selectable class
                td.className = "selectable";
                // Add metadata for the selection
                td.setAttribute("dim-col",col);
                td.setAttribute("dim-index", currentCell.qElemNumber);
            }
            
            // Append the cell to the row
            tr.appendChild(td);
        }
        // append the row to the table body
        tbody.appendChild(tr);
    }

    // Add click functions to ".selectable" items
    $element.find(".selectable").on("click", function() {
        // Get the dimension column number
        var dimCol = parseInt(this.getAttribute("dim-col"));
        
        // Get the dimension value index
        var dimInd = parseInt(this.getAttribute("dim-index"));

        // Call selectValues with these values
        backendApi.selectValues(dimCol, [dimInd],true);
    });
}`;

aceEditor('paint-editor-3', 'javascript', paint3, 'paint.js');


// Paint 4
var paint4 =
`...
// Make the element scroll
$element.css("overflow-y","auto");

// Number of pages calculation
var pageSize = 1000;
var totalRows = layout.qHyperCube.qSize.qcy;
var numberOfPages = Math.ceil(totalRows/pageSize);

// Function for creating a page fetcher function based on page number
var fetchPage = function(pageNumber) {
    return function(evt) {
        var page = backendApi.getData([{
            qTop: pageNumber*pageSize,
            qLeft: 0,
            qWidth: 10,
            qHeight: pageSize
        }]);

        page.then(function(data) {
            render(data[0].qMatrix);
        });

        // reset background-color of all buttons
        $element.find("button").css("background-color","");

        // set clicked button background color
        evt.target.style.backgroundColor = "deepskyblue";
    }
}

// Create a page label
var pageSpan = document.createElement("span");
pageSpan.innerHTML = "Page ";
$element.append(pageSpan);

// Create a button for each page
for(var i = 0; i<numberOfPages; i++) {
    var button = document.createElement("button");
    button.innerHTML = (i+1);
    button.addEventListener("click", fetchPage(i));
    // On init, color the first button
    if (i === 0) button.className = "active-pg";
    $element.append(button);
}


// Create a table
var table = document.createElement("table");
...`;

aceEditor('paint-editor-4', 'javascript', paint4, 'paint.js');


// Paint 5
var paint5 =
`...
var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;

// Initial render
render(qMatrix);
...`;

aceEditor('paint-editor-5', 'javascript', paint5, 'paint.js');

// Style 1
var style1 =
`
.qv-object-my-table button {
	border: none;
	margin-left: 7px;
	margin-bottom: 5px;
	background: none;
	color: #999;
	font-style: italic;
	font-size: 14px;
	line-height: 22px;
	cursor: pointer;
}

.qv-object-my-table button.active-pg {
	color: #36B7CF;
	border-bottom: 1px solid #36B7CF;
	font-weight: bold;
	font-style: normal;
}
`;

aceEditor('style-1', 'css', style1, 'style.css');


// Page Parallel
var pageParallel =
`var pagePromises = [
	backendApi.getData({qTop: 0, qLeft: 0, qWidth: 5, qHeight: 1000}),
	backendApi.getData({qTop: 1000, qLeft: 0, qWidth: 5, qHeight: 1000}),
	backendApi.getData({qTop: 2000, qLeft: 0, qWidth: 5, qHeight: 1000})
];

Promise.all(pagePromises).then(function(pages) {
	// do something with the array of pages, like render a chart
});`;

aceEditor('page-parallel-editor', 'javascript', pageParallel, 'paint.js');


// Page Sequence
var pageSequence =
`var pageDefs = [
	{
		qTop: 0,
		qLeft: 0,
		qWidth: 5,
		qHeight: 1000
	},
	{
		qTop: 1000,
		qLeft: 0,
		qWidth: 5,
		qHeight: 1000
	},
	{
		qTop: 2000,
		qLeft: 0,
		qWidth: 5,
		qHeight: 500
	}
];


var pagesPr = pageDefs.reduce(function(prev, curr) {
	// Return a new promise
	return new Promise(function(resolve, reject) {
		// When the previous promise is done
		prev.then(function(accPages) {
			// Get the new page
			backendApi.getData(curr).then(function(newPage) {
				// Add the latest page to the accumulated array of pages and resolve the promise with that accumulated array
				accPages.push(newPage);
				resolve(accPages);
			})
		})
	});
	
}, Promise.resolve([]));

pagesPr.then(function(pages) {
	// do something with the pages
});`;

aceEditor('page-sequence-editor', 'javascript', pageSequence, 'paint.js');