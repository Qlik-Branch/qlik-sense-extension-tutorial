import * as d3 from 'd3';
import Rx from 'rxjs';
import {graphScroll} from 'graph-scroll';
import '../../sass/105/keep-it-modular.scss';

export default function keepItModular(section){
  const d3Section = d3.select(section);
  const d3Graph = d3Section.select('.graph');
  const d3Folder = d3Graph.select('img:nth-child(1)');
  const d3Editor = d3Graph.select('.editor-container');
  
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


  // ========= Code Editor =========
  /* Make the code editor tabs not selectable */
  const d3Tabs = d3.selectAll(section +' .body-right .graph .editor-container .nav li');
  d3Tabs.select('a').classed('inactive-link', true);

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
    d3Section.selectAll('.body-left ol li')
      .classed('current', false);
    
    d3Section.select(`.body-left ol li:nth-child(${s})`)
      .classed('current', true);

    d3Folder.classed('hidden', s != 1);
    d3Editor.classed('transparent', s != 2 && s != 3 && s != 4 && s != 5);

    if(s > 1){
      var link = d3.select(d3Tabs._groups[0][s - 2]);
      var a = link.select('a')._groups[0][0];
        a.click();
    }
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