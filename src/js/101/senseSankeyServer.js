import * as d3 from 'd3';
import Rx from 'rxjs';
import {graphScroll} from 'graph-scroll';
import '../../sass/101/sense-sankey-server.scss';

export default function senseSankeyServer(section){
  const d3Section = d3.select(section);
  const d3Graph = d3Section.select('.graph');
  const d3QMC = d3Graph.select('img:nth-child(1)');
  const d3Panel = d3Graph.select('img:nth-child(2)');

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


  // ========= Observables =========
  const prevClick$ = Rx.Observable.fromEvent(document.querySelector(section +' .body-left .btn.prev'), 'click')
    .mapTo(-1);
  const nextClick$ = Rx.Observable.fromEvent(document.querySelector(section +' .body-left .btn.next'), 'click')
    .mapTo(1);
    
  const stage$ = prevClick$.merge(nextClick$)
    .scan((acc, curr) => {
      if((acc + curr) <= 2 && (acc + curr) >= 1) return acc += curr;
      else return acc;
    }, 1)
    .startWith(1);
    
  stage$.subscribe(s => {
    d3Section.selectAll('.body-left ol li')
      .classed('current', false);
    
    d3Section.select(`.body-left ol li:nth-child(${s})`)
      .classed('current', true);

    d3QMC.classed('hidden', s != 1);
    d3Panel.classed('hidden', s != 2);
  });

  const stage1$ = stage$.filter(f => f === 1);
  const stage2$ = stage$.filter(f => f === 2);

  // Stage 1
  stage1$.subscribe(s => {
    d3NextButton
      .classed('active', true)
      .classed('disabled', false);
      
    d3PrevButton
      .classed('active', false)
      .classed('disabled', true);
  });

  // Stage 3
  stage2$.subscribe(s => {
    d3PrevButton
      .classed('active', true)
      .classed('disabled', false);

    d3NextButton
      .classed('active', false)
      .classed('disabled', true);
  });
}