import * as d3 from 'd3';
import activateSidebar from './sidebar.js';
import {graphScroll} from 'graph-scroll';
import scrollygraph from './scrollygraph.js';

import scrollyQix from './100/scrollyQix.js';
import openEcosystem from './100/openEcosystem.js';
import '../sass/100. Prereq Qliks Open Ecosystem.scss';

var sectionList = [
  // '.youtube-video',
  '.self-service',
  // '.qix-interaction',
  // '.open-ecosystem'
];

// ============== Sidebar ==============
activateSidebar(0);

// document.querySelector('body').onload = function(){
  scrollygraph(sectionList);

  scrollyQix('.qix-interaction');
  // openEcosystem('.open-ecosystem');
// }

// ============== Embedded Dashboard ==============
/* Create iframe container */
var graph0 = document.querySelector('#section-0 .graph');
var iframeContainer = document.createElement('div');
iframeContainer.classList.add('iframe-container');

/* Define iframe src url */
var qlikSenseIframe = document.createElement('iframe');
qlikSenseIframe.src = 'https://sense-demo.qlik.com/single/?appid=372cbc85-f7fb-4db6-a620-9a5367845dce&sheet=LChBs&opt=currsel';

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


