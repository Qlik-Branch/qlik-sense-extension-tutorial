import '../sass/sidebar-style.scss';
import '../sass/content-style.scss';

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