import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';
import '../../sass/103/data-pages.scss';

export default function dataPages(section){
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

  var imgs = d3.selectAll(section +' .graph > img');
  var paragraphs = d3.selectAll(section +' .body-left p');
  var imgData = [], 
      paragraphData = [];

  function setImgData(imgArray){
    imgArray.forEach((img, i) =>{
      if(i === 0){ // if first img..
        // Set display
        if(sectionTop > -1000){
          imgData[i] = 'block';
        } else imgData[i] = 'none';
      } else if((i + 1) === imgArray.length){ // if last img..
        if(sectionTop <= (-1000*(i + 1) + 1000)){
          imgData[i] = 'block';
        } else imgData[i] = 'none';
      } else {
        if(sectionTop > -1000*(i + 1) && sectionTop <= (-1000*(i + 1) + 1000)){
          imgData[i] = 'block';
        } else imgData[i] = 'none';
      }
    })
  };

  function setImgOpacity(imgArray){
    imgArray.forEach((img, i) =>{
      if((i + 1) === imgArray.length){ // if last img..
        // Set opacity
        addScrollListener(d3.select(img), 'style', 'opacity', 
          [(-i*1000 - 100), (-i*1000 - 400)], [0, 1]);
      } else if(i === 0){ // else if first img..
        // Set opacity
        addScrollListener(d3.select(img), 'style', 'opacity', 
          [(-i*1000 - 700), (-i*1000 - 1000)], [1, 0]);
      }
      else {
        // Set opacity
        addScrollListener(d3.select(img), 'style', 'opacity', 
          [(-i*1000 - 100), (-i*1000 - 400), (-i*1000 - 700), (-i*1000 - 1000)], [0, 1, 1, 0]);
      }
    })
  } setImgOpacity(imgs._groups[0]);

  function setParagraphColor(pArray){
    pArray.forEach((p, i) =>{
      if((i + 1) === pArray.length){ // if last p..
        // Set Color
        addScrollListener(d3.select(p), 'style', 'color',
          [(-i*1000 - 100), (-i*1000 - 400)], ['#ddd', '#565555']);
      } else if(i === 0){ // else if first p..
        // Set opacity
        addScrollListener(d3.select(p), 'style', 'color', 
          [(-i*1000 - 700), (-i*1000 - 1000)], ['#565555', '#ddd']);
      }else{
        // Set color
        addScrollListener(d3.select(p), 'style', 'color',
          [(-i*1000 - 100), (-i*1000 - 400), (-i*1000 - 700), (-i*1000 - 1000)], 
          ['#ddd', '#565555', '#565555', '#ddd']);
      }
    })
  } setParagraphColor(paragraphs._groups[0]);

  
  /* Add scroll event listener to window and pass it array of scroll functions */
  window.addEventListener('scroll', function(){onscroll(scrollFunctionArray)})
  /* Function to be called everytime there is scroll action. The function is
      passed an array of functions, each of which updates the style or attribute
      using a scale */
  function onscroll(scrollFunctionArray){
    // Get top position of section
    sectionTop = document.querySelector(section).getBoundingClientRect().top;
    setImgData(imgs._groups[0]);
    imgs.data(imgData);

    // Execute each function in the function array
    scrollFunctionArray.forEach((fx) =>{
      fx();
    });
    
    imgs.style('display', (d, i) =>{
      return d;
    })
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