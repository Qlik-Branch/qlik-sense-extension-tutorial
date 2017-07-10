import activateSidebar from './sidebar.js';
import scrollygraph from './scrollygraph.js';

import '../sass/101. What Are Extensions.scss';

var sectionList = [
  '#section-1',
  '#section-2',
  '#section-5',
  '#section-6',
  '#section-7',
  '#section-9',
  '#section-10',
  '#section-11'
];

scrollygraph(sectionList);
// ============== Sidebar ==============
activateSidebar(1);