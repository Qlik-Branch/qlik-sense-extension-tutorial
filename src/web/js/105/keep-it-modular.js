import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';
import '../../sass/105/keep-it-modular.scss';

export default function keepItModular(section){
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
  var scrollFunctionArray = [],
      sectionTop = document.querySelector(section).getBoundingClientRect().top;

  var imgs = d3.selectAll(section +' .graph > img, ' +section +' .graph > .editor-container');
  var lis = d3.selectAll(section +' .body-left li');
  // var paragraphs = d3.selectAll(section +' .')
  console.log(lis);

  // Img Opacity
  function setImgOpacity(imgArray){
    imgArray.forEach((img, i) =>{
      if((i + 1) === imgArray.length){ // if last img..
        // Set opacity
        addScrollListener(d3.select(img), 'style', 'opacity', 
          [(-i*1000 - 100), (-i*1000 - 400)], [0, 1]);
      } else {
        // Set opacity
        addScrollListener(d3.select(img), 'style', 'opacity', 
          [(-i*1000 - 100), (-i*1000 - 400), (-i*1000 - 700), (-i*1000 - 1000)], [0, 1, 1, 0]);
      }
    })
  } setImgOpacity(imgs._groups[0]);

  // li color
  function setLIColor(liArray){
    liArray.forEach((li, i) =>{
      if((i + 1) === liArray.length){ // if last p..
        // Set Color
        addScrollListener(d3.select(li), 'style', 'color',
          [(-i*1000 - 100), (-i*1000 - 400)], ['#ddd', '#565555']);
        addScrollListener(d3.select(li).select('p'), 'style', 'color',
          [(-i*1000 - 100), (-i*1000 - 400)], ['#ddd', '#565555']);
      } else{
        // Set color
        addScrollListener(d3.select(li), 'style', 'color',
          [(-i*1000 - 100), (-i*1000 - 400), (-i*1000 - 700), (-i*1000 - 1000)], 
          ['#ddd', '#565555', '#565555', '#ddd']);
        addScrollListener(d3.select(li).select('p'), 'style', 'color',
          [(-i*1000 - 100), (-i*1000 - 400), (-i*1000 - 700), (-i*1000 - 1000)], 
          ['#ddd', '#565555', '#565555', '#ddd']);
      }
    })
  } setLIColor(lis._groups[0]);

  
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
  } onscroll(scrollFunctionArray);


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
}