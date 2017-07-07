import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';
export default function scrollygraph(sectionList){
  // ============== Resize ==============
  /* Add event listener to window for resize action */
  window.addEventListener('resize', resize);
  function resize(){
    sectionList.forEach((section) =>{ // for each section..
      // Get width of full row
      var rowWidth = document.querySelector(section +' .row').offsetWidth;
      // Set body-right to that width/2
      var bodyRight = document.querySelector(section +' .body-right');
      bodyRight.style.width = rowWidth/2 +'px';
    })
  }
  resize();


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
  }
  onscroll();


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
  /* Call graph-scroll when page loads. Need to wait until after full page is loaded,
      otherwise, graph-scroll function may not get updated attributes when it is first
      applied */
  // window.onload = function(){
    applyGraphScroll(sectionList);
    resize();
  // };
}