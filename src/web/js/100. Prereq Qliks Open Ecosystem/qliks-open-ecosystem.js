import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';

import '../../css/100. Prereq Qliks Open Ecosystem/100. Prereq Qliks Open Ecosystem.css';

/* Update Sidebar */
var activeSidebarItem = document.querySelector('#sidebar .nav-sidebar .active');
activeSidebarItem.classList.remove('active');
var activeGlyphicon = document.querySelector('.glyphicon');
activeGlyphicon.classList.remove('glyphicon-menu-down');
activeGlyphicon.classList.add('glyphicon-menu-right');

var sidebarItem = document.querySelector('#sidebar .nav-sidebar li:nth-child(1)');
sidebarItem.classList.add('active');
var sidebarGlyphicon = sidebarItem.querySelector('.glyphicon');
sidebarGlyphicon.classList.remove('glyphicon-menu-right');
sidebarGlyphicon.classList.add('glyphicon-menu-down');

var h2 = d3.selectAll('#body-content h2');
h2.attr('id', (d, i) =>{
  return 'h2-' +i;
});


/* Dashboard Embed */
var section0Graph = document.querySelector('#section-0 .graph');
var iframeContainer = document.createElement('div');
iframeContainer.classList.add('iframe-container');

var qlikSenseIframe = document.createElement('iframe');
qlikSenseIframe.src = 'https://sense-demo.qlik.com/single/?appid=372cbc85-f7fb-4db6-a620-9a5367845dce&sheet=LChBs&opt=currsel&select=clearall';

iframeContainer.appendChild(qlikSenseIframe);
section0Graph.appendChild(iframeContainer);

/* Youtube Embed */
var section1Graph = document.querySelector('#section-1 .graph');
section1Graph.classList.add('embed-responsive', 'embed-responsive-16by9');

var youtubeIframe = document.createElement('iframe');
youtubeIframe.src = 'https://www.youtube.com/embed/85QHuNNeaCg?ecver=1';
youtubeIframe.classList.add('embed-responsive-item');
youtubeIframe.setAttribute('frameborder', 0);
youtubeIframe.setAttribute('allowfullscreen', '');

section1Graph.appendChild(youtubeIframe);


// ============== Section 5 ==============
/* Get elements */
var section5 = document.querySelector('#section-5');
var rightBody5 = document.querySelector('#section-5 .body-right');
var graph5 = rightBody5.querySelector('.graph');
var imgQix = document.querySelector('#section-5 .graph img:nth-child(1)');
var imgArrowUp = document.querySelector('#section-5 .graph img:nth-child(2)');
var imgArrowDown = document.querySelector('#section-5 .graph img:nth-child(3)');
var imgUser = document.querySelector('#section-5 .graph img:nth-child(5)');

/* graph-scroll */
graphScroll()
  .container(d3.select(section5))
  .graph(d3.select(rightBody5))
  .sections(d3.selectAll('#section-5 .body-left > p'));

/* On window resize, update width of right section */
window.addEventListener('resize', resize);
function resize(){
  var rowWidth = document.querySelector('#section-5 .row').offsetWidth;
  var rightBody = document.querySelector('#section-5 .body-right');
  rightBody.style.width = rowWidth/2 +'px';
}
resize();

/* On scroll, update opacity of images */
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