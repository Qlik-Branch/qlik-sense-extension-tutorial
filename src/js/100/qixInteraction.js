import Rx from 'rxjs';

// import * as d3 from 'd3';
import { select, selectAll } from 'd3';
const d3 = {
  select: select,
  selectAll: selectAll
};

// import {graphScroll} from 'graph-scroll';
import '../../sass/100/qix-interaction.scss';

export default function qixInteraction(section){
  const d3Section = d3.select(section);
  const d3Graph = d3Section.select('.graph');
  const d3QixEngine = d3Graph.select('img:nth-child(1)');
  const d3DashBefore = d3Graph.select('img:nth-child(2)');
  const d3DashAfter = d3Graph.select('img:nth-child(3)');
  const d3ChatBubble = d3Graph.select('img:nth-child(4)');
  const d3Users = d3Graph.select('img:nth-child(5)');

  // ========= Column Widths =========
  const leftColSize = 4;
  const rightColSize = 12 - leftColSize;
  d3Section.select('.body-left')
    .classed('col-xs-6 col-sm-6 col-md-6 col-lg-6', false)
    .classed(`col-xs-${leftColSize} col-sm-${leftColSize} col-md-${leftColSize} col-lg-${leftColSize}`, true);
  
  d3Section.select('.body-right')
    .classed('col-xs-6 col-sm-6 col-md-6 col-lg-6', false)
    .classed(`col-xs-${rightColSize} col-sm-${rightColSize} col-md-${rightColSize} col-lg-${rightColSize}`, true);

  
  // ========= Buttons =========
  const d3ButtonContainer = d3Section.select('.body-left')
    .append('div')
    .classed('button-container', true);

  const buttons = [{label: 'Prev', class: 'prev'}, {label: 'Next', class: 'next'}];

  d3ButtonContainer.selectAll('.btn')
    .data(buttons)
    .enter()
    .append('button')
    .attr('type', 'button')
    .attr('class', d => `btn btn-primary ${d.class}`)
    .html(d => d.label);

  const d3PrevButton = d3Section.select('.body-left .prev');
  const d3NextButton = d3Section.select('.body-left .next');
  const d3Buttons = d3Section.selectAll('.body-left .btn');


  // ============= SVG =============
  /* Append element for arrows */
  const graph = document.querySelector(section +' .graph');
  var arrowDiv = document.createElement('div');
  arrowDiv.classList.add('arrow-div');
  graph.insertBefore(arrowDiv, graph.children[1]);

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
  }; resize();


  // ========= Observables =========
  const prevClick$ = Rx.Observable.fromEvent(document.querySelector(section +' .body-left .btn.prev'), 'click')
    .mapTo(-1);
  const nextClick$ = Rx.Observable.fromEvent(document.querySelector(section +' .body-left .btn.next'), 'click')
    .mapTo(1);

  const stage$ = prevClick$.merge(nextClick$)
    .scan((acc, curr) => {
      if((acc + curr) <= 4 && (acc + curr) >= 1) return acc += curr;
      else return acc;
    }, 1)
    .startWith(1);

  stage$.subscribe(s => {
    // Paragraph
    d3Section.selectAll('.body-left p')
      .classed('current', false);
    
    d3Section.select(`.body-left p:nth-child(${s})`)
      .classed('current', true);
  });

  const stage1$ = stage$.filter(f => f === 1);
  const stage2$ = stage$.filter(f => f === 2);
  const stage3$ = stage$.filter(f => f === 3);

  // Stage 1
  stage1$.subscribe(s => {
    d3PrevButton
      .classed('active', false)
      .classed('disabled', true);

    d3DashBefore.classed('hidden', false);
    d3DashAfter.classed('hidden', true);

    d3Graph.select('.line-up')
      .transition()
      .duration(750)
      .attr('y2', svgHeight);
  });

  // Stage 2
  stage2$.subscribe(s => {
    d3Buttons
      .classed('active', true)
      .classed('disabled', false);

    d3Graph.select('.line-up')
      .transition()
      .duration(750)
      .attr('y2', 0);

    d3DashBefore.classed('hidden', false);
    d3DashAfter.classed('hidden', true);

    d3Graph.select('.line-down')
      .transition()
      .duration(750)
      .attr('y2', 0);
  });
  
  // Stage 3
  stage3$.subscribe(s => {
    d3NextButton
      .classed('active', false)
      .classed('disabled', true);

    d3Graph.select('.line-down')
      .transition()
      .duration(750)
      .attr('y2', svgHeight);

    setTimeout(function(){
      d3DashBefore.classed('hidden', true);
      d3DashAfter.classed('hidden', false);
    }, 750);
  });
}