import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';
import '../../sass/103/lifecycle-of-extension.scss';

export default function testingOurExtension(section){
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
  var img3 = document.querySelector(section + ' .graph > img:nth-of-type(3)');

  var text1 = d3.selectAll(section +' .body-left p:first-of-type, ' +section +' .body-left p:nth-of-type(2)');
  var text2 = d3.selectAll(section +' .body-left p:nth-of-type(3), ' +section +' .body-left p:nth-of-type(4)');
  var text3 = d3.selectAll(section +' .body-left p:nth-of-type(5), ' +section +' .body-left p:nth-of-type(6)');
  
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
    
    if(sectionTop > -500){
      img1.style.display = 'block';
      img2.style.display = 'none';
      img3.style.display = 'none';

      text1.style('display', 'block');
      text2.style('display', 'none');
      text3.style('display', 'none');
    } else if(sectionTop > -1000){
      img1.style.display = 'none';
      img2.style.display = 'block';
      img3.style.display = 'none';

      text1.style('display', 'none');
      text2.style('display', 'block');
      text3.style('display', 'none');
    } else if(sectionTop > -1500){
      img1.style.display = 'none';
      img2.style.display = 'none';
      img3.style.display = 'block';

      text1.style('display', 'none');
      text2.style('display', 'none');
      text3.style('display', 'block');
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
  addScrollListener(d3.select(img1), 'style', 'opacity', [-450, -500], [1, 0]);
  addScrollListener(d3.select(img2), 'style', 'opacity', [-650, -700, -950, -1000], [0, 1, 1, 0]);
  addScrollListener(d3.select(img3), 'style', 'opacity', [-1050, -1100], [0, 1]);

  // Paragraph
  addScrollListener(d3.selectAll(section +' .body-left p:first-of-type, ' +section +' .body-left p:nth-of-type(2)'),
    'style', 'opacity', [-300, -500], [1, 0]);
  addScrollListener(d3.selectAll(section +' .body-left p:nth-of-type(3), ' +section +' .body-left p:nth-of-type(4)'),
    'style', 'opacity', [-650, -700, -950, -1000], [0, 1, 1, 0]);
  addScrollListener(d3.selectAll(section +' .body-left p:nth-of-type(5), ' +section +' .body-left p:nth-of-type(6)'),
    'style', 'opacity', [-1050, -1100], [0, 1]);
}