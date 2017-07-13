import activateSidebar from './sidebar.js';
import {scrollPosition} from './scrollygraph.js';
import aceEditor from './ace-editor.js';

import '../sass/107. Make it Universal.scss';

var scrollPositionList = [
  '.paint-editor'
]

// ============== Sidebar ==============
activateSidebar(7);

scrollPosition(scrollPositionList);

// Support
var support =
`define([], function() {
    return {
        snapshot: true,
        exportData: true,
        export: true
    };
});`;

aceEditor('support-editor', 'javascript', support, 'support.js');


// Paint
var paint =
`function($element, layout) {
	// do some things to render on the page
	// don't return anything
}`;

aceEditor('paint-editor', 'javascript', paint, 'paint.js');


// Paint 2
var paint2 =
`function($element, layout) {
	// Create a new promise and return it
	return new Promise(function(resolve, reject) {
		// Do an asynchronous call to some URL for text
		var getText = fetch("my-url");
		getText.then(function(text) {
			// When that async call comes back, render the text response to the element and resolve our promise to signify that we are done with rendering
			$element.html(text);
			resolve();
		});
}`;

aceEditor('paint-editor-2', 'javascript', paint2, 'paint.js');