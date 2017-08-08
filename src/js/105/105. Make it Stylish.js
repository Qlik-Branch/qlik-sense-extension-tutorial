import '../../../node_modules/ace-builds/src-min-noconflict/ace.js';
var Range = ace.require('ace/range').Range;

import activateSidebar from '../lib/sidebar.js';
import {scrollPosition, scrollOpacity} from '../lib/scrollygraph.js';
import aceEditor from '../lib/ace-editor.js';
import keepItModular from './keep-it-modular.js';

import '../../sass/105/105. Make it Stylish.scss';

import css from './code-snippets/css-editor.js';
import requireJS from './code-snippets/require-js-editor.js';
import requireJS2 from './code-snippets/require-js-editor-2.js';
import requireJS3 from './code-snippets/require-js-editor-3.js';
import requireJS4 from './code-snippets/require-js-editor-4.js';
import paintMeasureCell from './code-snippets/paint-measure-cell-editor.js';
import initialProperties from './code-snippets/initial-properties-editor.js';
import initialProperties2 from './code-snippets/initial-properties-editor-2.js';
import javascript from './code-snippets/javascript-editor.js';
import strikethrough from './code-snippets/strikethrough-editor.js';
import javascript2 from './code-snippets/javascript-editor-2.js';
import properties from './code-snippets/properties-editor.js';
import properties2 from './code-snippets/properties-editor-2.js';
import properties3 from './code-snippets/properties-editor-3.js';
import properties4 from './code-snippets/properties-editor-4.js';


// ============== Sidebar ==============
activateSidebar(5);

aceEditor('css-editor', 'css', css, 'style.css');
aceEditor('require-js-editor', 'javascript', requireJS, 'my-table.js');
aceEditor('require-js-editor-2', 'javascript', requireJS2, 'my-table.js');
aceEditor('require-js-editor-3', 'javascript', requireJS3, 'my-table.js');
aceEditor('require-js-editor-4', 'javascript', requireJS4, 'my-table.js');
aceEditor('paint-measure-cell-editor', 'javascript', paintMeasureCell, 'paint.js');
aceEditor('keep-it-modular', 'javascript', initialProperties, 'initialProperties.js');
aceEditor('keep-it-modular', 'javascript', initialProperties2, 'initialProperties.js');
var editor_javascript = aceEditor('keep-it-modular', 'javascript', javascript, 'my-table.js');
editor_javascript.session.addMarker(new Range(0, 9, 0, 30), 'my-marker')
editor_javascript.session.addMarker(new Range(0, 63, 0, 70), 'my-marker')
aceEditor('keep-it-modular', 'javascript', strikethrough, 'my-table.js');

keepItModular('.keep-it-modular');

aceEditor('javascript-editor-2', 'javascript', javascript2, 'my-table.js');
aceEditor('properties-editor', 'javascript', properties, 'definition.js');
aceEditor('properties-editor-2', 'javascript', properties2, 'definition.js');
aceEditor('properties-editor-3', 'javascript', properties3, 'definition.js');
aceEditor('properties-editor-4', 'javascript', properties4, 'paint.js');