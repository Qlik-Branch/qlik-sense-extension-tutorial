import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';
import '../../sass/102/testing-our-extension.scss';

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
  });


  // ============== Scroll ==============
  var img1 = document.querySelector(section + ' .graph > img:first-of-type');
  var img2 = document.querySelector(section + ' .graph > img:nth-of-type(2)');
  var img3 = document.querySelector(section + ' .graph > img:nth-of-type(3)');
  var img4 = document.querySelector(section + ' .graph > img:nth-of-type(4)');
  var img5 = document.querySelector(section + ' .graph > img:nth-of-type(5)');
  
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
      img3.style.display = 'none';
      img4.style.display = 'none';
      img5.style.display = 'none';
    } else if(sectionTop > -2000){
      img1.style.display = 'none';
      img2.style.display = 'block';
      img3.style.display = 'none';
      img4.style.display = 'none';
      img5.style.display = 'none';
    } else if(sectionTop > -3000){
      img1.style.display = 'none';
      img2.style.display = 'none';
      img3.style.display = 'block';
      img4.style.display = 'none';
      img5.style.display = 'none';
    } else if(sectionTop > -4000){
      img1.style.display = 'none';
      img2.style.display = 'none';
      img3.style.display = 'none';
      img4.style.display = 'block';
      img5.style.display = 'none';
    } else if(sectionTop > -5000){
      img1.style.display = 'none';
      img2.style.display = 'none';
      img3.style.display = 'none';
      img4.style.display = 'none';
      img5.style.display = 'block';
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
  addScrollListener(d3.select(img1), 'style', 'opacity', [-100, -400, -700, -1000], [0, 1, 1, 0]);
  addScrollListener(d3.select(img2), 'style', 'opacity', [-1100, -1400, -1700, -2000], [0, 1, 1, 0]);
  addScrollListener(d3.select(img3), 'style', 'opacity', [-2100, -2400, -2700, -3000], [0, 1, 1, 0]);
  addScrollListener(d3.select(img4), 'style', 'opacity', [-3100, -3400, -3700, -4000], [0, 1, 1, 0]);
  addScrollListener(d3.select(img5), 'style', 'opacity', [-4100, -4400], [0, 1]);
  
  // Paragraph
  addScrollListener(d3.selectAll(section +' .body-left h5:first-of-type, ' +section +' .body-left p:first-of-type'),
    'style', 'color', [-100, -400, -700, -1000], ['#ddd', '#565555', '#565555', '#ddd']);

  addScrollListener(d3.selectAll(section +' .body-left h5:nth-of-type(2), ' +section +' .body-left p:nth-of-type(2)'),
    'style', 'color', [-1100, -1400, -2000, -2100], ['#ddd', '#565555', '#565555', '#ddd']);

  addScrollListener(d3.selectAll(section +' .body-left h5:nth-of-type(3), ' +section +' .body-left p:nth-of-type(3)'),
    'style', 'color', [-2100, -2400, -3000, -3100], ['#ddd', '#565555', '#565555', '#ddd']);

  addScrollListener(d3.selectAll(section +' .body-left h5:nth-of-type(4), ' +section +' .body-left p:nth-of-type(4)'),
    'style', 'color', [-3100, -3400, -4000, -4100], ['#ddd', '#565555', '#565555', '#ddd']);

  addScrollListener(d3.selectAll(section +' .body-left h5:nth-of-type(5), ' +section +' .body-left p:nth-of-type(5)'),
    'style', 'color', [-4100, -4400], ['#ddd', '#565555']);


  onscroll(scrollFunctionArray);

}