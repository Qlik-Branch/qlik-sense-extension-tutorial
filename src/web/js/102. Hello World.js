import activateSidebar from './sidebar.js';
import scrollygraph from './scrollygraph.js';
import * as d3 from 'd3';
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/solarized_light';

import staticDynPropDiagram from './102/static-dyn-prop-diagram.js';

import '../css/102. Hello World.css';

var sectionList = [
  '.resource-list-design',
  '.my-table-folder',
  '.container-and-properties',
  '.generic-object-properties',
  '.static-dyn-prop-diagram',
  '.static-dyn-prop-interactive'
];

scrollygraph(sectionList);
// ============== Sidebar ==============
activateSidebar(2);

staticDynPropDiagram();

var qextEditorGraph = document.querySelector('.qext-editor .graph');
var qextEditorElement = document.createElement('div');
qextEditorElement.setAttribute('id', 'qext-editor');
// qextEditorElement.innerText =`
//   {
//     "name": "My Table",
//     "description": "My first extension",
//     "type": "visualization",
//     "version": "0.0.1",
//     "author": "YOUR NAME GOES HERE"
//   }`;

qextEditorGraph.appendChild(qextEditorElement);

// var qextEditorAce = ace.edit('qext-editor');
// qextEditorAce.getSession().setMode('ace/mode/javascript');
// qextEditorAce.setTheme('ace/theme/solarized_light');
// qextEditorAce.setValue([
//   '{',
//   ' "name": "My Table",',
//   ' "description": "My first extension",',
//   ' "type": "visualization",',
//   ' "version": "0.0.1",',
//   ' "author": "YOUR NAME GOES HERE"',
//   '}'
// ]).join('\n');
// var ace = require('brace');
// require('brace/mode/json');
// require('brace/theme/solarized_light');

var editor = ace.edit('qext-editor');
editor.getSession().setMode('ace/mode/javascript');
editor.setTheme('ace/theme/solarized_light');
editor.setValue([
    '{'
  , ' "language": "JSON",'
  , ' "foo": "bar",'
  , ' "trailing": "comma",'
  , '}'
  ].join('\n')
);
editor.clearSelection();
// qextEditorAce.setTheme('ace/theme/monokai');
// qextEditorAce.getSession().setMode('ace/mode/javascript');