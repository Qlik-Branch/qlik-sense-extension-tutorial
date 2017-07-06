import * as d3 from 'd3';
import activateSidebar from './sidebar.js';
import {graphScroll} from 'graph-scroll';
// import RxQ from 'RxQ';

import '../css/101. What Are Extensions.css';

var resizeSections = [
  '#section-1',
  '#section-2',
  '#section-10'
];

// ============== Sidebar ==============
activateSidebar(1);

// applyGraphScroll('#section-1');

// ============== Functions ==============

/* On window resize, update width of right section */
window.addEventListener('resize', resize);
function resize(){
  console.log('resize');
  resizeSections.forEach((section) =>{
    var rowWidth = document.querySelector(section +' .row').offsetWidth;
    var bodyRight = document.querySelector(section +' .body-right');
    bodyRight.style.width = rowWidth/2 +'px';
  })
}
resize();


/* On scroll */
window.addEventListener('scroll', onscroll);
function onscroll(){
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
applyGraphScroll(resizeSections);