import activateSidebar from '../lib/sidebar.js';
import {scrollPosition} from '../lib/scrollygraph.js';
import aceEditor from '../lib/ace-editor.js';

import '../../sass/107/107. Make it Universal.scss';

import support from './code-snippets/support-editor.js';
import paint from './code-snippets/paint-editor.js';
import paint2 from './code-snippets/paint-editor-2.js';

// ============== Sidebar ==============
activateSidebar(7);

aceEditor('support-editor', 'javascript', support, 'support.js');
aceEditor('paint-editor', 'javascript', paint, 'paint.js');
aceEditor('paint-editor-2', 'javascript', paint2, 'paint.js');
