import activateSidebar from '../lib/sidebar.js';
import {scrollPosition} from '../lib/scrollygraph.js';
import aceEditor from '../lib/ace-editor.js';

import '../../sass/106/106. Make it Responsive.scss';

import css from './code-snippets/css-editor.js';
import resize from './code-snippets/resize-editor.js';
import myTable from './code-snippets/my-table-editor.js';

var scrollPositionList = [
	'.css-editor'
]

// ============== Sidebar ==============
activateSidebar(6);

scrollPosition(scrollPositionList);

aceEditor('css-editor', 'css', css, 'style.css');
aceEditor('resize-editor', 'javascript', resize, 'resize.js');
aceEditor('resize-editor', 'javascript', myTable, 'my-table.js', {addTab: true});