import '../../../node_modules/ace-builds/src-min-noconflict/ace.js';
var Range = ace.require('ace/range').Range;

import activateSidebar from '../lib/sidebar.js';
import {scrollPosition, scrollOpacity} from '../lib/scrollygraph.js';
import aceEditor from '../lib/ace-editor.js';

import '../../sass/104/104. Make it Selectable.scss';

import paintEditor from './code-snippets/paint-editor.js';
import paintEditor2 from './code-snippets/paint-editor-2.js';
import paintEditor3 from './code-snippets/paint-editor-3.js';
import paintEditor4 from './code-snippets/paint-editor-4.js';


var scrollPositionList = [
	'.field-indices'
]

// ============== Sidebar ==============
activateSidebar(4);

scrollPosition(scrollPositionList);

aceEditor('paint-editor', 'javascript', paintEditor, 'my-table.js');
var editor_paint2 = aceEditor('paint-editor-2', 'javascript', paintEditor2, 'my-table.js');
editor_paint2.session.addMarker(new Range(15, 0, 17, 0), 'my-marker', 'fullLine');
aceEditor('paint-editor-3', 'javascript', paintEditor3, 'my-table.js');
aceEditor('paint-editor-4', 'javascript', paintEditor4, 'my-table.js');