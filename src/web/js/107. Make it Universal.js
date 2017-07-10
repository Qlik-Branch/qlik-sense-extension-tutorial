import activateSidebar from './sidebar.js';
import scrollygraph from './scrollygraph.js';
import aceEditor from './ace-editor.js';

import '../css/107. Make it Universal.css';

var sectionList = [
  '.print-service-editor',
  '.support-editor',
  '.export-pdf',
  '.paint-editor',
  '.paint-editor-2'
];

// ============== Sidebar ==============
activateSidebar(7);

document.querySelector('body').onload = function(){
  scrollygraph(sectionList);
}


// Print Service
var printService =
`var inPrint = this.backendAPI.isSnapshot === true`;

aceEditor('print-service-editor', 'javascript', printService);


// Support
var support =
`define([], function() {
    return {
        snapshot: true,
        exportData: true,
        export: true
    };
});`;

aceEditor('support-editor', 'javascript', support);


// Paint
var paint =
`function($element, layout) {
	// do some things to render on the page
	// don't return anything
}`;

aceEditor('paint-editor', 'javascript', paint);


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

aceEditor('paint-editor-2', 'javascript', paint2);