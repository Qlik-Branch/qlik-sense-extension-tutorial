import Rx from 'rxjs';
import * as d3 from 'd3';

export default function(sectionClass){
  // Create Scroll Observable
  const scroll$ = Rx.Observable.fromEvent(window, 'scroll')
    .map(() => document.querySelector(sectionClsas).getBoundingClientRect().top);

  
  /* Observable to emit the current paragraph section we scroll to. Only emits
      when a new paragraph is reached (paragraph != prevParagraph) */
  const paragraph$ = Rx.Observable.fromEvent(window, 'load')
    .switchMap(() =>{
      return Rx.Observable.fromEvent(window, 'scroll')
        .map(() =>{
          const elemGroup = d3.select(sectionClass +' .graph-scroll-active');

          if(elemGroup._groups[0][0]) return +elemGroup.attr('element-group');
          else return 0;
        })
        .distinctUntilChanged();
    });

  return paragraph$;
}