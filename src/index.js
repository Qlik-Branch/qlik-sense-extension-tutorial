import './css/sidebar-style.css';
import './css/content-style.css';
import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';


var hamburgerButton = document.querySelector('.hamburger-open');
var closeButton = document.querySelector('.sidebar .closebtn');

hamburgerButton.addEventListener('click', () =>{
  document.getElementById('sidebar').classList.add('active');
});

closeButton.addEventListener('click', () =>{
  document.getElementById('sidebar').classList.remove('active');
})
// graphScroll()
//     .graph(d3.select('#ext-sunburst'))
//     .container(d3.select('#section-0'))
//   .sections(d3.selectAll('#body-left'))
  // .on('active', function(d){console.log('section ' +d +' active')})
  // .offset(500);