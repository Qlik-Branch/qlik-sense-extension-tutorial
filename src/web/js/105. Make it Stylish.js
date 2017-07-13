import '../../../node_modules/ace-builds/src-min-noconflict/ace.js';
var Range = ace.require('ace/range').Range;

import activateSidebar from './sidebar.js';
import {scrollPosition, scrollOpacity} from './scrollygraph.js';
import aceEditor from './ace-editor.js';
import keepItModular from './105/keep-it-modular.js';

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

// document.querySelector('body').onload = function(){
//   scrollygraph(sectionList);
// }

// CSS Editor
var css = 
`.qv-object-my-table th {
	text-align: left;
}`;

aceEditor('css-editor', 'css', css, 'style.css');

// Require JS Editor
var requireJS =
`define([/* no dependencies */], function() {
	// ...
}`;

aceEditor('require-js-editor', 'javascript', requireJS, 'my-table.js');

// Require JS Editor 2
var requireJS2 =
`define(["jquery"], function($) {
	// can now use $ variable here for jQuery
}`;

aceEditor('require-js-editor-2', 'javascript', requireJS2, 'my-table.js');

// Require JS Editor 3
var requireJS3 =
`define(["text!./style.css"], function(cssText) {
	// can now use cssText as variable
}`;

aceEditor('require-js-editor-3', 'javascript', requireJS3, 'my-table.js');

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

aceEditor('require-js-editor-4', 'javascript', requireJS4, 'my-table.js');

// Initial Properties Editor
var initialProperties =
`define([], function() {
	
})`

aceEditor('keep-it-modular', 'javascript', initialProperties, 'initialProperties.js');

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

aceEditor('keep-it-modular', 'javascript', initialProperties2, 'initialProperties.js');

// JavaScript Editor
var javascript =
`define( ["./initialProperties", "text!./style.css"], function (myProps, cssText) {
	// ...
})`

var editor_javascript = aceEditor('keep-it-modular', 'javascript', javascript, 'my-table.js');
editor_javascript.session.addMarker(new Range(0, 9, 0, 30), 'my-marker')
editor_javascript.session.addMarker(new Range(0, 63, 0, 70), 'my-marker')

// Initial Properties Strikethrough
var strikethrough =
`define( ["./initialProperties", "text!./style.css"], function (myProps, cssText) {
	// ...
	var myProps = {
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
	// ...
})`

aceEditor('keep-it-modular', 'javascript', strikethrough, 'my-table.js');


keepItModular('.keep-it-modular');


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

aceEditor('javascript-editor-2', 'javascript', javascript2, 'my-table.js');

// Properties Editor
var properties =
`settings: {
	uses: "settings",
	items: {}
}`;

aceEditor('properties-editor', 'javascript', properties, 'definition.js');

// Properties Editor 2 
var properties2 =
`settings: {
	uses: "settings",
	items: {
		textColor: {}
	}
}`;

aceEditor('properties-editor-2', 'javascript', properties2, 'definition.js');

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

aceEditor('properties-editor-3', 'javascript', properties3, 'definition.js');

// Properties Editor 4
var properties4 =
`// Color the table
var textColor = layout.textColor;
table.style.color = textColor;`;

aceEditor('properties-editor-4', 'javascript', properties4, 'paint-js');