import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';

import activateSidebar from './sidebar.js';
import {scrollPosition, scrollOpacity} from './scrollygraph.js';

import scrollyQix from './100/scrollyQix.js';
import openEcosystem from './100/openEcosystem.js';
import '../sass/100. Prereq Qliks Open Ecosystem.scss';

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
var wsURL = 'wss://sense-demo.qlik.com/app/372cbc85-f7fb-4db6-a620-9a5367845dce?reloadUri=https%3A%2F%2Fsense-demo.qlik.com%2Fsingle%2F%3Fappid%3D372cbc85-f7fb-4db6-a620-9a5367845dce%26sheet%3DLChBs%26opt%3Dcurrsel';
// console.log(window);
// var websock = WebSocket WebSocket(wsURL);
// websock.addEventListener('message', function(event){
//   console.log(event.data);
// })

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

// function checkIframe(){
//   console.log('check iframe');
//   var iframeDoc = qlikSenseIframe.contentDocument || qlikSenseIframe.contentWindow.document;

//   if(iframeDoc.readyState == 'complete'){
//     qlikSenseIframe.contentWindow.onload = function(){
//       console.log('loaded');
//     };
//     console.log(qlikSenseIframe.contentWindow);
//     console.log('after loaded');
//     return;
//   }

//   window.setTimeout(function(){
//     checkIframe();
//   }, 100);
// }

// document.querySelector('body').onload = checkIframe();


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