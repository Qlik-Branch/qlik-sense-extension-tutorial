import * as d3 from 'd3';
import activateSidebar from './sidebar.js';
import {graphScroll} from 'graph-scroll';
// import RxQ from 'RxQ';

import '../css/100. Prereq Qliks Open Ecosystem.css';

var resizeSections = [
  '#section-1',
  '#section-2',
  '#section-3'
];

// ============== Sidebar ==============
activateSidebar(0);

// applyGraphScroll('#section-1');

// ============== Functions ==============

/* On window resize, update width of right section */
window.addEventListener('resize', resize);
function resize(){
  resizeSections.forEach((section) =>{
    var rowWidth = document.querySelector(section +' .row').offsetWidth;
    var bodyRight = document.querySelector(section +' .body-right');
    bodyRight.style.width = rowWidth/2 +'px';
  })
}
resize();


/* On scroll */
/* On scroll, update opacity of images */
var section5 = document.querySelector('#section-3');
var rightBody5 = document.querySelector('#section-3 .body-right');
var graph5 = rightBody5.querySelector('.graph');
var imgQix = document.querySelector('#section-3 .graph img:nth-child(1)');
var imgArrowUp = document.querySelector('#section-3 .graph img:nth-child(2)');
var imgArrowDown = document.querySelector('#section-3 .graph img:nth-child(3)');
var imgMonitor = document.querySelector('#section-3 .graph img:nth-child(4)');
var imgUser = document.querySelector('#section-3 .graph img:nth-child(5)');
window.addEventListener('scroll', onscroll);
function onscroll(){
  var section5Top = section5.getBoundingClientRect().top;
  var userScale = d3.scaleLinear()
    .domain([-300, -600])
    .range([0, 1]);

  var arrowUpScale = d3.scaleLinear()
    .domain([-900, -1200, -1500, -1550])
    .range([0, 1, 1, 0]);

  var imgQixScale = d3.scaleLinear()
    .domain([-1200, -1500])
    .range([0, 1]);

  var arrowDownScale = d3.scaleLinear()
    .domain([-2000, -2300])
    .range([0, 1]);

  imgUser.style.opacity = userScale(section5Top);
  imgArrowUp.style.opacity = arrowUpScale(section5Top);
  imgQix.style.opacity = imgQixScale(section5Top);
  imgArrowDown.style.opacity = arrowDownScale(section5Top);
}
onscroll();


/* Apply graph-scroll */
function applyGraphScroll(sections){
  sections.forEach((section) =>{
    graphScroll()
    .container(d3.select(section))
    .graph(d3.select(section +' .body-right'))
    .sections(d3.selectAll(section +' .body-left > *'));
  })
}

window.onload = function(){applyGraphScroll(resizeSections)};


// ============== Section 0 ==============
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


// ============== Section 1 ==============
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