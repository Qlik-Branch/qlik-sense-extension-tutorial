import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';
export default function scrollygraph(sectionList){
  // ============== Scroll ==============
  /* Linear Scale to define opacity of graph while scrolling into view */
  var graphOpacityScale = d3.scaleLinear()
    .domain([200, 0])
    .range([0, 1]);

  /* Add event listener to window for scroll action */
  window.addEventListener('scroll', onscroll);
  function onscroll(){
    sectionList.forEach((section) =>{ // for each section..
      // Get its top position relative to window
      var sectionTop = document.querySelector(section).getBoundingClientRect().top;
      // Set opacity as a function of position
      document.querySelector(section +' .body-right').style.opacity = graphOpacityScale(sectionTop);
    })
  } onscroll();


  // ============== Graph-Scroll ==============
  /* Apply graph-scroll to applicable sections */
  function applyGraphScroll(sections){
    sections.forEach((section) =>{
      graphScroll() 
        .container(d3.select(section))
        .graph(d3.select(section +' .body-right'))
        .sections(d3.selectAll(section +' .body-left > *'));
    })
  } 
  
  window.addEventListener('load', function(){
    applyGraphScroll(sectionList);
  });
}