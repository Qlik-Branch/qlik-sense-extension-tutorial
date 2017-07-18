import activateSidebar from './sidebar.js';
import {scrollPosition} from './scrollygraph.js';
import aceEditor from './ace-editor.js';

import '../sass/106. Make it Responsive.scss';


var scrollPositionList = [
	'.css-editor'
]

// ============== Sidebar ==============
activateSidebar(6);

scrollPosition(scrollPositionList);

// CSS
var css = 
`@media (max-width: 480px) {
	.qv-object-my-table td {
		font-size: 20px;
	}

	.qv-object-my-table th {
		font-size: 20px;
	}

	.qv-object-my-table td:nth-child(n+3) {
		display: none;
	}

	.qv-object-my-table th:nth-child(n+3) {
		display: none;
	}
}`;

// Resize
var resize =
`define([], function() {
    return function($element, layout) {};
});`;

// My Table
var myTable =
`define(["./initialProperties", "./definition", "./paint", "./support", "./resize", "text!./style.css"], function(myProps, myDefinition, myPaint, mySupport, myResize, cssText) {
    // Create a style element
	var style = document.createElement("style");
	// Set the style element content
	style.innerHTML = cssText;
	// Add the style to the header of the page
	document.querySelector("head").appendChild(style);

	return {
		initialProperties: myProps,
		definition: myDefinition,
        paint: myPaint,
        support: mySupport,
        resize: myResize
	};
});`;

// Resize 2
var resize2 =
`define([], function($element, layout) {
	// Get your existing table
	var table = $element[0].querySelector("table");
	// Create a random color
	table.style.color = "#" + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
}`;

aceEditor('css-editor', 'css', css, 'style.css');
aceEditor('resize-editor', 'javascript', resize, 'resize.js');

aceEditor('resize-editor', 'javascript', myTable, 'my-table.js', {addTab: true});
aceEditor('resize-editor-2', 'javascript', resize2, 'resize.js');