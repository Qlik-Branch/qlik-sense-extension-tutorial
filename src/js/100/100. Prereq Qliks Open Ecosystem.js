import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';

import activateSidebar from '../lib/sidebar.js';
import {scrollPosition, scrollOpacity} from '../lib/scrollygraph.js';

import scrollyQix from './scrollyQix.js';
import openEcosystem from './openEcosystem.js';
import '../../sass/100/100. Prereq Qliks Open Ecosystem.scss';

var sectionList = [
  '.self-service',
  '.open-ecosystem'
];

// ============== Sidebar ==============
activateSidebar(0);

var selfService = document.querySelector('.self-service');

openEcosystem('.open-ecosystem');
scrollPosition(sectionList);
scrollOpacity(sectionList);
scrollyQix('.qix-interaction');

// ============== Embedded Dashboard ==============
/* Create iframe container */
var graph0 = document.querySelector('#section-0 .graph');
var iframeContainer = document.createElement('div');
iframeContainer.classList.add('iframe-container');


/* Define iframe src url */
var qlikSenseIframe = document.createElement('iframe');
// qlikSenseIframe.src = 'https://sense-demo.qlik.com/single/?appid=372cbc85-f7fb-4db6-a620-9a5367845dce&sheet=LChBs&identity=openecosystem&opt=currsel';
/* Switching to full app integration to include Qlik Sense loading indicators */
qlikSenseIframe.src = 'https://sense-demo.qlik.com/sense/app/372cbc85-f7fb-4db6-a620-9a5367845dce/sheet/LChBs/state/analysis';

/* Append iframe to body */
iframeContainer.appendChild(qlikSenseIframe);
graph0.appendChild(iframeContainer);


// ============== Embed Youtube ==============
/* Add responsive embed class to graph */
var graph1 = document.querySelector('#section-1 .graph');
graph1.classList.add('embed-responsive', 'embed-responsive-16by9');

/* Create iframe */
var youtubeIframe = document.createElement('iframe');
youtubeIframe.src = 'https://www.youtube.com/embed/85QHuNNeaCg?ecver=1';
youtubeIframe.classList.add('embed-responsive-item');
youtubeIframe.setAttribute('frameborder', 0);
youtubeIframe.setAttribute('allowfullscreen', '');

/* Append iframe to graph */
graph1.appendChild(youtubeIframe);