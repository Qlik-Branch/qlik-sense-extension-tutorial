import { select } from 'd3';

var d3 = {
  select: select
}

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

scrollPosition(sectionList);
// scrollOpacity(sectionList);
openEcosystem('.open-ecosystem');
scrollyQix('.qix-interaction');

// ============== Embedded Dashboard ==============
var newWidth = 10;
var offset = (12 - newWidth)/2
d3.select('.embedded-dashboard .body-left')
  .classed('col-xs-6 col-sm-6 col-md-6 col-lg-6', false)
  .classed(`col-xs-${newWidth} col-xs-offset-${offset} 
            col-sm-${newWidth} col-sm-offset-${offset} 
            col-md-${newWidth} col-md-offset-${offset} 
            col-lg-${newWidth} col-lg-offset-${offset} `, true);

d3.select('.embedded-dashboard .body-right')
  .classed('col-xs-6 col-sm-6 col-md-6 col-lg-6', false)
  .classed(`col-xs-12 col-sm-12 col-md-12 col-lg-12`, true);

/* Create iframe container */
const d3IframeContainer = d3.select('.embedded-dashboard .graph')
  .append('div')
  .classed('iframe-container', true);


/* Define iframe src url */
const iframeSrc = 'https://sense-demo.qlik.com/sense/app/372cbc85-f7fb-4db6-a620-9a5367845dce/sheet/LChBs/state/analysis';
d3IframeContainer.append('iframe')
  .attr('src', iframeSrc)
var qlikSenseIframe = document.createElement('iframe');
// qlikSenseIframe.src = 'https://sense-demo.qlik.com/single/?appid=372cbc85-f7fb-4db6-a620-9a5367845dce&sheet=LChBs&identity=openecosystem&opt=currsel';


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