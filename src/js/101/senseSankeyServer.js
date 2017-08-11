import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';
import '../../sass/101/sense-sankey-server.scss';

export default function senseSankeyServer(section){
  /* Add an invisible line width 0 width to use as the scrolling section
      in graph-scroll */
  var scrollLine = document.createElement('div');
  scrollLine.classList.add('scroll-line');
  var scrollLineContent = document.createElement('div');
  scrollLine.appendChild(scrollLineContent);
  document.querySelector(section).appendChild(scrollLine);


  window.addEventListener('load', function(){
    graphScroll()
      .container(d3.select(section))
      .graph(d3.select(section +' .row'))
      .sections(d3.selectAll(section +' .scroll-line'));
  })


  // ============== Scroll ==============
  var img1 = document.querySelector(section + ' .graph > img:first-of-type');
  var img2 = document.querySelector(section + ' .graph > img:nth-of-type(2)');
  
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
    
    if(sectionTop > -1000){
      img1.style.display = 'block';
      img2.style.display = 'none';
    } else if(sectionTop > -2000){
      img1.style.display = 'none';
      img2.style.display = 'block';
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

  // Imgs
  addScrollListener(d3.select(img1), 'style', 'opacity', [-700, -1000], [1, 0]);
  addScrollListener(d3.select(img2), 'style', 'opacity', [-1100, -1400], [0, 1]);

  // Paragraph
  addScrollListener(d3.select(section +' .body-left ol > li:first-of-type'),
    'style', 'color', [-100, -400, -700, -1000], ['#565555', '#ddd']);
  addScrollListener(d3.select(section +' .body-left ol > li:first-of-type p'),
    'style', 'color', [-100, -400, -700, -1000], ['#565555', '#ddd']);

  addScrollListener(d3.select(section +' .body-left ol > li:nth-of-type(2)'),
    'style', 'color', [-1100, -1400], ['#ddd', '#565555']);
  addScrollListener(d3.select(section +' .body-left ol > li:nth-of-type(2) p'),
    'style', 'color', [-1100, -1400], ['#ddd', '#565555']);

  onscroll(scrollFunctionArray);
}