import selectHtml from './select-html.js';
import selectStageObservable from './select-stage-observable.js';

export default function(sectionClass){
  // ============ HTML ============
  const html = selectHtml(sectionClass);
  const tableHeader = html.table.header;
  const tableBody = html.table.body;


  // ============ Data ============
  const tableData0 = {
    header: ['Department', '', 'YTD Spend $'],
    body: [
      {cells: ['Contractor', '(1)', '329,209,000'], backgroundColor: 'rgba(255, 255, 255, 0.08)'},
      {cells: ['IT', '(3)', '112,371,000'], backgroundColor: 'rgba(255, 255, 255, 0.08)'},
      {cells: ['Infrastructure', '(2)', '112,371,000'], backgroundColor: 'rgba(255, 255, 255, 0.08)'},
      {cells: ['Manufacturing', '(0)', '1,795,000'], backgroundColor: 'rgba(255, 255, 255, 0.08)'}
    ]
  };

  const tableData2 = {
    header: ['Department', '', 'YTD Spend $'],
    body: [
      {cells: ['Contractor', '(1)', '329,209,000'], backgroundColor: 'rgba(54, 183, 207, 0.08)'},
      {cells: ['IT', '(3)', '112,371,000'], backgroundColor: 'rgba(255, 255, 255, 0.08)'},
      {cells: ['Infrastructure', '(2)', '112,371,000'], backgroundColor: 'rgba(255, 255, 255, 0.08)'},
      {cells: ['Manufacturing', '(0)', '1,795,000'], backgroundColor: 'rgba(54, 183, 207, 0.08)'}
    ]
  };

  const tableData3 = {
    header: ['Department', '', 'YTD Spend $'],
    body: [
      {cells: ['Contractor', '(1)', '329,209,000'], backgroundColor: 'rgba(54, 183, 207, 0.08)'},
      {cells: ['Manufacturing', '(0)', '1,795,000'], backgroundColor: 'rgba(54, 183, 207, 0.08)'}
    ]
  };

  const tableData4 = {
    header: ['Department', '', 'YTD Spend $'],
    body: [
      {cells: ['Contractor', '(1)', '329,209,000'], backgroundColor: 'rgba(255, 255, 255, 0.08)'},
      {cells: ['Manufacturing', '(0)', '1,795,000'], backgroundColor: 'rgba(255, 255, 255, 0.08)'}
    ]
  };

  const tableData5 = {
    header: ['Department', '', 'YTD Spend $'],
    body: [
      {cells: ['Contractor', '(1)', '329,209,000'], backgroundColor: 'rgba(255, 255, 255, 0.08)'},
      {cells: ['IT', '(3)', '112,371,000'], backgroundColor: 'rgba(54, 183, 207, 0.08)'},
      {cells: ['Manufacturing', '(0)', '1,795,000'], backgroundColor: 'rgba(255, 255, 255, 0.08)'}
    ]
  };

  const tableData6 = {
    header: ['Department', '', 'YTD Spend $'],
    body: [
      {cells: ['IT', '(3)', '112,371,000'], backgroundColor: 'rgba(54, 183, 207, 0.08)'}
    ]
  };


  // ============ Paint ============
  paintTable(tableData0);
  function paintTable(data){
    // =========== Header ===========
    tableHeader.selectAll('tr')
        .data([data.header])
        .enter()
        .append('tr')
      .selectAll('td')
        .data(d => d)
        .enter()
        .append('th')
        .html(d => d);


    // =========== Body ===========
    // Attach data to table
    const update = tableBody.selectAll('tr')
      .data(data.body, d => d.cells[0] +'|' +d.cells[1]);


    // Enter new data
    const enter = update
        .enter()
        .append('tr');

    enter
      .merge(update)
        .transition()
        .duration(500)
        .style('background-color', d => d.backgroundColor);

    update.exit()
      .transition()
      .duration(500)
      .style('opacity', 0)
      .remove();

    // Add cells
    enter.selectAll('td')
      .data(d => d.cells)
      .enter()
      .append('td')
      .html(d => d)
  };


  // ============ Observables ============
  const paragraph$ = selectStageObservable(sectionClass);
  paragraph$.subscribe(s => console.log(s));

  paragraph$
    .filter(f => f <= 1)
    .subscribe(() => paintTable(tableData0));

  paragraph$
    .filter(f => f === 2)
    .subscribe(() => paintTable(tableData2));

  paragraph$
    .filter(f => f === 3)
    .subscribe(() => paintTable(tableData3));

  paragraph$
    .filter(f => f === 4)
    .subscribe(() => paintTable(tableData4));

  paragraph$
    .filter(f => f === 5)
    .subscribe(() => paintTable(tableData5));

  paragraph$
    .filter(f => f === 6)
    .subscribe(() => paintTable(tableData6));
}