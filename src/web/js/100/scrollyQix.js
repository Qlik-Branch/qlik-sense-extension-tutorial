import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';
import '../../sass/100/scrolly-qix.scss';

export default function scrollyQix(section){
  /* Add an invisible line width 0 width to use as the scrolling section
      in graph-scroll */
  var scrollLine = document.createElement('div');
  scrollLine.classList.add('scroll-line');
  var scrollLineContent = document.createElement('div');
  scrollLine.appendChild(scrollLineContent);
  document.querySelector(section).appendChild(scrollLine);


  /* Get element */
  var bodyLeft = document.querySelector(section +' .body-left');
  var graph = document.querySelector(section +' .body-right .graph');

  /* Append element for arrows */
  var arrowDiv = document.createElement('div');
  arrowDiv.classList.add('arrow-div');
  graph.insertBefore(arrowDiv, graph.children[1]);


  /* Append div container to hold user images */
  var userDiv = document.createElement('div');
  userDiv.classList.add('user-div');
  for(var i=0; i<2; i++){
    userDiv.appendChild(document.querySelector(section +' .graph img:nth-child(5)'));
  };
  graph.appendChild(userDiv);


  // ============= D3 =============
  // Add svg
  var svg = d3.select(arrowDiv)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%');

  var svgWidth = +svg.style('width').split('px')[0],
      svgHeight = +svg.style('height').split('px')[0];

  // Line Up
  var lineUp = svg.append('line')
    .attr('class', 'line line-up')
      .attr('y2', svgHeight)
      .style('opacity', 1);

  // Line Down
  var lineDown = svg.append('line')
    .attr('class', 'line line-down')
    .attr('y2', 0);

  
  // ============== Resize ==============
  window.addEventListener('resize', function(){resize()});
  function resize(){
    svgWidth = +svg.style('width').split('px')[0];
    svgHeight = +svg.style('height').split('px')[0];
    
    lineUp
      .attr('x1', svgWidth*(11/24))
      .attr('y1', svgHeight)
      .attr('x2', svgWidth*(11/24));

    lineDown
      .attr('x1', svgWidth*(13/24))
      .attr('y1', 0)
      .attr('x2', svgWidth*(13/24));
  };


  // ============== Scroll ==============
  var imgMonitorBefore = document.querySelector(section +' .graph > img:nth-of-type(2)');
  var imgMonitorAfter = document.querySelector(section +' .graph > img:nth-of-type(3)');

  var scrollFunctionArray = [],
      sectionTop;
  /* Add scroll event listener to window and pass it array of scroll functions */
  window.addEventListener('scroll', function(){onscroll(scrollFunctionArray)})
  /* Function to be called everytime there is scroll action. The function is
      passed an array of functions, each of which updates the style or attribute
      using a scale */
  function onscroll(scrollFunctionArray){
    // Get top position of section
    sectionTop = document.querySelector(section).getBoundingClientRect().top;

    // Execute each function in the function array
    scrollFunctionArray.forEach((fx) =>{
      fx();
    });

    if(sectionTop > -2700){
      imgMonitorBefore.style.display = 'block';
      imgMonitorAfter.style.display = 'none';
    } else {
      imgMonitorBefore.style.display = 'none';
      imgMonitorAfter.style.display = 'block';
    }
  }

  /* Function to add a scaling function to function array. This function
      generates a scale and defines how the element property should be
      updated in relation to that scale */
  function addScrollListener(d3Element, type, property, domain, range){
    // Define the scale
    var scale = d3.scaleLinear()
      .domain(domain)
      .range(range)
      .clamp(true);

    // Add the scaling effect to the function array
    scrollFunctionArray.push(function scroll(){
      d3Element[type](property, scale(sectionTop));
    });
  }

  // User Img
  addScrollListener(d3.select(section +' .graph .user-div > img:nth-of-type(2)'),
    'style', 'opacity', [-300, -600], [0, 1]);
  // Chat Img
  addScrollListener(d3.select(section +' .graph .user-div > img:first-of-type'),
    'style', 'opacity', [-600, -900, -1200, -1500], [0, 1, 1, 0]);
  // Line Up y2
  addScrollListener(lineUp, 'attr', 'y2', [-1300, -1900], [svgHeight, 0]);
  // Line Up Opacity
  addScrollListener(lineUp, 'style', 'opacity', [-2000, -2700], [1, 0]);
  // Line Down y2
  addScrollListener(lineDown, 'attr', 'y2', [-2400, -2700], [0, svgHeight]);

  // p1 Opacity
  addScrollListener(d3.select(section +' .body-left > p:first-of-type'),
    'style', 'opacity', [-300, -400], [0, 1]);
  // p1 Color
  addScrollListener(d3.select(section +' .body-left > p:first-of-type'),
    'style', 'color', [-1300, -1400], ['#565555', '#ddd']);

  // p2 Opacity
  addScrollListener(d3.select(section +' .body-left > p:nth-of-type(2)'),
    'style', 'opacity', [-1300, -1400], [0, 1]);
  // p2 Color
  addScrollListener(d3.select(section +' .body-left > p:nth-of-type(2)'),
    'style', 'color', [-2100, -2200], ['#565555', '#ddd']);

  // p3 Opacity
  addScrollListener(d3.select(section +' .body-left > p:nth-of-type(3)'),
    'style', 'opacity', [-2100, -2200], [0, 1]);
  // p3 Color
  addScrollListener(d3.select(section +' .body-left > p:nth-of-type(3)'),
    'style', 'color', [-2700, -2800], ['#565555', '#ddd']);

  // p4 Opacity
  addScrollListener(d3.select(section +' .body-left > p:nth-of-type(4)'),
    'style', 'opacity', [-2700, -2800], [0, 1]);

  onscroll(scrollFunctionArray);
  resize();

  window.onload = function(){
    graphScroll()
      .container(d3.select(section))
      .graph(d3.select(section +' .row'))
      .sections(d3.selectAll(section +' .scroll-line'));
  }

}