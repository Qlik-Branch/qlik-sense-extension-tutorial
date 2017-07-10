import activateSidebar from './sidebar.js';
import scrollygraph from './scrollygraph.js';
import aceEditor from './ace-editor.js';

import '../sass/105. Make it Stylish.scss';

var sectionList = [
	'.files-with-stylesheet',
	'.css-editor',
	'.require-js-editor',
	'.require-js-editor-2',
	'.require-js-editor-3',
	'.require-js-editor-4',
	'.aligned-headers',
	'.initial-properties',
	'.initial-properties-editor',
	'.initial-properties-editor-2',
	'.javascript-editor',
	'.javascript-editor-2',
	'.properties-editor',
	'.properties-editor-2',
	'.properties-editor-3',
	'.properties-editor-4'
];

// ============== Sidebar ==============
activateSidebar(5);

document.querySelector('body').onload = function(){
  scrollygraph(sectionList);
}

// CSS Editor
var css = 
`.qv-object-my-table th {
	text-align: left;
}`;

aceEditor('css-editor', 'css', css);

// Require JS Editor
var requireJS =
`define([/* no dependencies */], function() {
	// ...
}`;

aceEditor('require-js-editor', 'javascript', requireJS);

// Require JS Editor 2
var requireJS2 =
`define(["jquery"], function($) {
	// can now use $ variable here for jQuery
}`;

aceEditor('require-js-editor-2', 'javascript', requireJS2);

// Require JS Editor 3
var requireJS3 =
`define(["text!./style.css"], function(cssText) {
	// can now use cssText as variable
}`;

aceEditor('require-js-editor-3', 'javascript', requireJS3);

// Require JS Editor 4
var requireJS4 =
`define(["text!./style.css"], function(cssText) {
	// Create a style element
	var style = document.createElement("style");
	// Set the style element content
	style.innerHTML = cssText;
	// Add the style to the header of the page
	document.querySelector("head").appendChild(style);
}`;

aceEditor('require-js-editor-4', 'javascript', requireJS4);

// Initial Properties Editor
var initialProperties =
`define([], function() {
	
})`

aceEditor('initial-properties-editor', 'javascript', initialProperties);

// Initial Properties Editor 2
var initialProperties2 =
`define([], function() {
	return {
		textColor: "black",
		qHyperCubeDef: {
			qDimensions: [],
			qMeasures: [],
			qInitialDataFetch: [
				{
					qTop: 0,
					qLeft: 0,
					qWidth: 10,
					qHeight: 1000
				}
			]
		}
	};
})`

aceEditor('initial-properties-editor-2', 'javascript', initialProperties2);

// JavaScript Editor
var javascript =
`define( ["./initialProperties", "text!./style.css"], function (myProps, cssText) {`

aceEditor('javascript-editor', 'javascript', javascript);

// JavaScript Editor 2
var javascript2 =
`define( ["./initialProperties", "./definition", "./paint", "./support", "text!./style.css"], function (myProps, myDefinition, myPaint, mySupport, cssText) {
	'use strict';
	
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
		support: mySupport
	};
});`

aceEditor('javascript-editor-2', 'javascript', javascript2);

// Properties Editor
var properties =
`settings: {
	uses: "settings",
	items: {}
}`;

aceEditor('properties-editor', 'javascript', properties);

// Properties Editor 2 
var properties2 =
`settings: {
	uses: "settings",
	items: {
		textColor: {}
	}
}`;

aceEditor('properties-editor-2', 'javascript', properties2);

// Properties Editor 3
var properties3 =
`settings: {
	uses: "settings",
	items: {
		textColor: {
			type: "string",
			ref: "textColor",
			label: "Text Color"
		}
	}
}`;

aceEditor('properties-editor-3', 'javascript', properties3);

// Properties Editor 4
var properties4 =
`s// Color the table
table.style.color = textColor;`;

aceEditor('properties-editor-4', 'javascript', properties4);