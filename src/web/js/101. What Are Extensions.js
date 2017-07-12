import activateSidebar from './sidebar.js';
import {scrollPosition, scrollOpacity} from './scrollygraph.js';

import senseSankeyDesktop from './101/senseSankeyDesktop.js';
import senseSankeyServer from './101/senseSankeyServer.js';
import '../sass/101. What Are Extensions.scss';

var sectionList = [
  '.ext-resize'
];

// ============== Sidebar ==============
activateSidebar(1);


scrollPosition(sectionList);
senseSankeyDesktop('.sense-sankey-desktop');
senseSankeyServer('.sense-sankey-server');