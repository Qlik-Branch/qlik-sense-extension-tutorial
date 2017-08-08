import * as d3 from 'd3';
import {graphScroll} from 'graph-scroll';

export default function(sectionClass){
  // ========== Left Pane Elements ==========
  const d3LeftPanelElements = d3.selectAll(sectionClass +' .body-left > *')
    .attr('element-group', (d, i) => i);
  const d3Graph = d3.select(sectionClass +' .graph');

  
  // ========== Table ==========
  const tableContainer = d3Graph
    .append('div')
    .attr('class', 'table-container');

  const table = tableContainer.append('table');
  const tableHeader = table.append('thead');
  const tableBody = table.append('tbody');


  // ========== Scroll Graph ==========
  window.addEventListener('load', function(){
    graphScroll()
      .container(d3.select(sectionClass +' .row'))
      .graph(d3.select(sectionClass +' .body-right'))
      .sections(d3.selectAll(sectionClass +' .body-left > *'));
  })

  return {
    table: {
      container: tableContainer,
      header: tableHeader,
      body: tableBody
    }
  }
}