import activateSidebar from '../lib/sidebar.js';
import {scrollPosition} from '../lib/scrollygraph.js';
import aceEditor from '../lib/ace-editor.js';

import '../../sass/108/108. Make it Scalable.scss';

import definition from './code-snippets/definition-editor.js';
import paint from './code-snippets/paint-editor.js';
import paint2 from './code-snippets/paint-editor-2.js';
import paint3 from './code-snippets/paint-editor-3.js';
import paint4 from './code-snippets/paint-editor-4.js';
import paint5 from './code-snippets/paint-editor-5.js';
import style1 from './code-snippets/style-editor.js';
import pageParallel from './code-snippets/page-parallel-editor.js';
import pageSequence from './code-snippets/page-sequence-editor.js';

// ============== Sidebar ==============
activateSidebar(8);

aceEditor('definition-editor', 'javascript', definition, 'page definition');
aceEditor('paint-editor', 'javascript', paint, 'paint.js');
aceEditor('paint-editor-2', 'javascript', paint2, 'paint.js');
aceEditor('paint-editor-3', 'javascript', paint3, 'paint.js');
aceEditor('paint-editor-4', 'javascript', paint4, 'paint.js');
aceEditor('paint-editor-5', 'javascript', paint5, 'paint.js');
aceEditor('style-editor-1', 'css', style1, 'style.css');
aceEditor('page-parallel-editor', 'javascript', pageParallel, 'paint.js');
aceEditor('page-sequence-editor', 'javascript', pageSequence, 'paint.js');