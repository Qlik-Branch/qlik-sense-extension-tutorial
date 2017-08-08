import activateSidebar from '../lib/sidebar.js';
import {scrollPosition, scrollOpacity} from '../lib/scrollygraph.js';
import aceEditor from '../lib/ace-editor.js';

import testingOurExtension from './lifecycle-of-extension.js';
import dataPages from './data-pages.js';
import '../../sass/103/103. Make it Data Driven.scss';

import initialProperties from './code-snippets/initial-properties-editor.js';
import definition from './code-snippets/definition-editor.js';
import definition2 from './code-snippets/definition-editor-2.js';
import paint from './code-snippets/paint-editor.js';
import paint2 from './code-snippets/paint-editor-2.js';
import paint3 from './code-snippets/paint-editor-3.js';
import paint4 from './code-snippets/paint-editor-4.js';

var sectionList = [
  '.create-extension',
  '.paint-extension',
  '.resize-extension',
  '.initial-properties-editor',
  '.convert-extension',
  '.definition-editor',
  '.add-dimension',
  '.definition-editor-2',
  '.panel',
  '.q-matrix',
  '.q-matrix-row',
  '.q-matrix-cell',
  '.paint-editor',
  '.paint-editor-2',
  '.paint-editor-3',
  '.headers',
  '.paint-editor-4',
  '.ext-table'
];

var scrollPositionList = [
	'.initial-properties-editor',
	'.definition-editor'
]

// ============== Sidebar ==============
activateSidebar(3);

scrollPosition(scrollPositionList);

testingOurExtension('.lifecycle-of-extension');
dataPages('.data-pages');

aceEditor('initial-properties-editor', 'javascript', initialProperties, 'my-table.js');
aceEditor('definition-editor', 'javascript', definition, 'my-table.js');
aceEditor('definition-editor-2', 'javascript', definition2, 'my-table.js');
aceEditor('paint-editor', 'javascript', paint, 'my-table.js');
aceEditor('paint-editor-2', 'javascript', paint2, 'my-table.js');
aceEditor('paint-editor-3', 'javascript', paint3, 'my-table.js');
aceEditor('paint-editor-4', 'javascript', paint4, 'my-table.js');