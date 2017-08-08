import activateSidebar from '../lib/sidebar.js';
import {scrollPosition, scrollOpacity} from '../lib/scrollygraph.js';
import aceEditor from '../lib/ace-editor.js';

import '../../sass/102/102. Hello World.scss';
import staticDynPropDiagram from './static-dyn-prop-diagram.js';
import staticDynPropInteractive from './static-dyn-prop-interactive.js';
import testingOurExtension from './testing-our-extension.js';

var scrollList = [
  '.container-and-properties',
  '.generic-object-properties'
];

var opacityList = [
]

// ============== Sidebar ==============
activateSidebar(2);

scrollPosition(scrollList);
scrollOpacity(opacityList)
staticDynPropDiagram('.static-dyn-prop-diagram');
staticDynPropInteractive('.static-dyn-prop-interactive');
testingOurExtension('.testing-our-extension');


// ============== Resource List ==============
var resourceListContainer = document.querySelector('.resource-list-design .graph');
var resourceList = 
`<h3>Resources</h3>
<ul class="nav nav-pills">
  <li class="active"><a data-toggle="pill" href="#beginner">Beginner</a></li>
  <li><a data-toggle="pill" href="#intermediate">Intermediate</a></li>
  <li><a data-toggle="pill" href="#expert">Expert</a></li>
</ul>
<div class="tab-content">
  <div id="beginner" class="tab-pane fade in active">
    <h4>HTML5 & CSS</h4>
    <a href="https://www.codecademy.com/learn/learn-html-css">Learn HTML & CSS: Part I | Codecademy</a>
    <hr>
    <h4>JavaScript</h4>
    <a href="https://www.codecademy.com/learn/javascript">JavaScript | Codecademy</a>
    <hr>
    <h4>JSON</h4>
    <a href="https://www.codecademy.com/courses/javascript-beginner-en-xTAfX/0/1">Meet JSON | Codecademy</a>
    </br>
    </br>
    <a href="https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript">How To Work with JSON in JavaScript | DigitalOcean</a>
    <hr>
  </div>
  <div id="intermediate" class="tab-pane fade in">
    <h4>HTML5 & CSS</h4>
    <a href="http://learn.shayhowe.com/html-css/">Learn to Code HTML & CSS</a>
    <hr>
    <h4>JavaScript</h4>
    <a href="https://javascript.info/">The Modern JavaScript Tutorial</a>
    </br>
    </br>
    <a href="http://eloquentjavascript.net/">Eloquent JavaScript</a>
    <hr>
    <h4>JSON</h4>
    <a href="https://www.copterlabs.com/json-what-it-is-how-it-works-how-to-use-it/">JSON: What It Is, How It Works, & How to Use It | Copter Labs</a>
    <hr>
  </div>
  <div id="expert" class="tab-pane fade in">
    <h4>HTML5</h4>
    <a href="http://learn.shayhowe.com/advanced-html-css/">Learn to Code Advanced HTML & CSS</a>
    <hr>
    <h4>JavaScript</h4>
    <a href="https://developers.google.com/web/fundamentals/getting-started/primers/promises">JavaScript Promises: an Introduction | Web | Google Developers]</a>
    <hr>
  </div>
</div>`
resourceListContainer.innerHTML = resourceList;


// QEXT 
var qextJson = 
`{
  "name": "My Table",
  "description": "My first extension",
  "type": "visualization",
  "version": "0.0.1",
  "author": "YOUR NAME GOES HERE"
}`

aceEditor('qext-editor', 'json', qextJson, 'my-table.qext');


// Javascript
var js = 
`define([], function() {
	return {};
});`

aceEditor('js-editor', 'javascript', js, 'my-table.js');


// Initial Properties
var initialProperties =
`define([], function() {
	var myProps = {
		textColor: "black"
	};

	return {
		initialProperties: myProps
	};
});`

aceEditor('initial-properties-editor', 'javascript', initialProperties, 'my-table.js');


// Definition
var definition =
`var myDefinition = {
	type: "items",
		component: "accordions",
		items: {
			settings: {
				uses: "settings"
			}
		}
	}
};`

aceEditor('definition-editor', 'javascript', definition, 'my-table');


// Initial Props Definition
var defInitProps =
`define([], function() {
	var myProps = {
		textColor: "black"
	};

	var myDefinition = {
		type: "items",
		component: "accordion",
		items: {
			settings: {
				uses: "settings"
			}
		}
	};

	return {
		initialProperties: myProps,
		definition: myDefinition
	};
});`

aceEditor('def-initprops-editor', 'javascript', defInitProps, 'my-table.js');


// Paint
var paint =
`var myPaint = function($element, layout) {
  // Get the text color value
  var textColor = layout.textColor;

  // Clear the previous contents of the container so we start from scratch each time
  $element.html("");

  // Create a span
  var span = document.createElement("span");

  // Set text color
  span.style.color = textColor;
  
  // Add message
  span.innerHTML = "hello, world";
  
  // Append span to the container
  $element.append(span);
};`;

aceEditor('paint-editor', 'javascript', paint, 'my-table.js');


// JS 2
var js2 = 
`define([], function() {
	// ...
	return {
		initialProperties: myProps,
		definition: myDefinition,
		paint: myPaint
	};
}`;

aceEditor('js-editor-2', 'javascript', js2, 'my-table.js');


// Support
var support = 
`var mySupport = {
	snapshot: true,
	exportData: true 
};`;

aceEditor('support-editor', 'javascript', support, 'my-table.js');


// JS 3
var js3 = 
`define([], function() {
	// ...
	return {
		initialProperties: myProps,
		definition: myDefinition,
		paint: myPaint,
		support: mySupport
	};
}`;

aceEditor('js-editor-3', 'javascript', js3, 'my-table.js');
