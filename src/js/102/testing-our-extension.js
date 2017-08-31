import * as d3 from 'd3';
import Rx from 'rxjs';
import {graphScroll} from 'graph-scroll';
import '../../sass/102/testing-our-extension.scss';

export default function testingOurExtension(section){
  const d3Section = d3.select(section);
  const d3Graph = d3Section.select('.graph');
  const d3Desktop = d3Graph.select('img:nth-child(1)');
  const d3Chrome = d3Graph.select('img:nth-child(2)');
  const d3DevTools = d3Graph.select('img:nth-child(3)');
  const d3Cache = d3Graph.select('img:nth-child(4)');
  const d3Play = d3Graph.select('img:nth-child(5)');
  
  // ========= Column Widths =========
  const leftColSize = 6;
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
      if((acc + curr) <= 5 && (acc + curr) >= 1) return acc += curr;
      else return acc;
    }, 1)
    .startWith(1);
    
  stage$.subscribe(s => {
    d3Section.selectAll('.body-left h5')
      .classed('current', false);
    d3Section.selectAll('.body-left p')
      .classed('current', false);
    
    d3Section.select(`.body-left h5:nth-of-type(${s})`)
      .classed('current', true);
    d3Section.select(`.body-left p:nth-of-type(${s})`)
      .classed('current', true);


    d3Desktop.classed('hidden', s != 1);
    d3Chrome.classed('hidden', s != 2);
    d3DevTools.classed('hidden', s != 3);
    d3Cache.classed('hidden', s != 4);
    d3Play.classed('hidden', s != 5);
  });

  const stage1$ = stage$.filter(f => f === 1);
  const stage2$ = stage$.filter(f => f === 2);
  const stage3$ = stage$.filter(f => f === 3);
  const stage4$ = stage$.filter(f => f === 4);
  const stage5$ = stage$.filter(f => f === 5);

  // Stage 1
  stage1$.subscribe(s => {
    d3PrevButton
      .classed('active', false)
      .classed('disabled', true);
  });

  stage2$
    .merge(stage3$)
    .merge(stage4$)
    .subscribe(s => {
      d3Buttons
        .classed('active', true)
        .classed('disabled', false);
    });

  // Stage 5
  stage5$.subscribe(s => {
    d3NextButton
      .classed('active', false)
      .classed('disabled', true);
  });
}