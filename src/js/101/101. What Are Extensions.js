import activateSidebar from '../lib/sidebar.js';
import {scrollPosition, scrollOpacity} from '../lib/scrollygraph.js';

import senseSankeyDesktop from './senseSankeyDesktop.js';
import senseSankeyServer from './senseSankeyServer.js';
import '../../sass/101/101. What Are Extensions.scss';


// ============== Sidebar ==============
activateSidebar(1);


senseSankeyDesktop('.sense-sankey-desktop');
senseSankeyServer('.sense-sankey-server');