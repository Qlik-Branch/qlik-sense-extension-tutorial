import * as d3 from 'd3';
import '../../css/102/static-dyn-prop-interactive.css';

export default function staticDynPropInteractive(section){
  // Get Graph Container
  var container = document.querySelector(section +' .graph');

  var circleLeftEdge,
      circleRightEdge,
      svgWidth;

  var config = {
    svg: {
      width: '90%'
    },
    margin: {
      left: 10,
      right: 10,
      top: 20
    }
  }

  // SVG
  var svg = d3.select(container)
    .append('svg')
    .attr('width', config.svg.width);


  // Labels
  var labels = ['Properties', 'Static Property:', 'Dynamic Property:', 'Sum', 'Layout'];
  var interactiveLabel = svg.selectAll('.interactive-label')
    .data(labels)
    .enter()
    .append('text')
    .text((d) =>{return d;})
    .attr('class', (d, i) =>{
      if([0, 1, 2, 3].indexOf(i) > -1) return 'interactive-label left-label';
      else return 'interactive-label right-label';
    });


  // Input Box
  var inputBox = d3.select(container)
    .append('input')
    .attr('class', 'input-box')
    .attr('value', '42')
    .on('input', function(){
      interactiveNumber._groups[0][0].textContent = inputBox._groups[0][0].value;
    })


  // Dropdown Box
  var dropdownBox = d3.select(container)
    .append('select')
    .attr('class', 'dropdown-box')
    .on('change', function(){
      interactiveNumber._groups[0][1].textContent = '?';

      var transitionDuration = 400;

      dynamicLine1Fill
        .attr('x2', 125)
        .transition()
        .duration(transitionDuration)
        .attr('x2', circleLeftEdge);

      dynamicCircleFill.datum({startAngle: (3/2)*Math.PI, endAngle: (3/2)*Math.PI});

      dynamicCircleFill
        .attr('d', arc)
        .transition()
        .duration(transitionDuration)
        .delay(transitionDuration)
        .attrTween('d', arcTween((1/2)*Math.PI, (5/2)*Math.PI))

      dynamicLine2Fill
        .attr('x2', circleRightEdge)
        .transition()
        .duration(transitionDuration)
        .delay(2*transitionDuration)
        .attr('x2', svgWidth - 65)

      setTimeout(() =>{
        if(this.value === 'sales') interactiveNumber._groups[0][1].textContent = '232';
        else if(this.value === 'cost') interactiveNumber._groups[0][1].textContent = '200';
      }, 3*transitionDuration)
    })

  dropdownBox.append('option')
    .attr('disable', true)
    .attr('selected', true)
    .attr('value', true)
    .style('display', 'none');
  
  dropdownBox.append('option')
    .attr('value', 'sales')
    .html('(Sales)');

  dropdownBox.append('option')
    .attr('value', 'cost')
    .html('(Cost)');


  // Output Numbers
  var numbers = ['42', '?'];
  var interactiveNumber = svg.selectAll('.interactive-number')
    .data(numbers)
    .enter()
    .append('text')
    .text((d) =>{return d})
    .attr('class', 'interactive-number');


  // Image
  var img = d3.select(section +' .graph img');


  // Arrow Head
  svg.append("svg:defs")
    .append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("orient", "auto")
    .append("path")
    .attr('d', 'M 0 0 12 6 0 12')
    .style('fill', '#36B7CF')

  // Static Line
  var staticLine = svg.append('line').attr('class', 'static-line');


  // Dynamic Line
  var dynamicCircle = svg.append('circle').attr('class', 'dynamic-circle');

  var dynamicLine1 = svg.append('line').attr('class', 'dynamic-line-1');

  var dynamicLine2 = svg.append('line').attr('class', 'dynamic-line-1');

  var dynamicLine1Fill = svg.append('line').attr('class', 'dynamic-line-1-fill');

  var arc = d3.arc()
    .startAngle((d) =>{return d.startAngle})
    .endAngle((d) =>{return d.endAngle});

  function arcTween(newStartAngle, newEndAngle){
    return function(d){
      var interpolateStart = d3.interpolate(d.startAngle, newStartAngle);
      var interpolateEnd = d3.interpolate(d.endAngle, newEndAngle);
      return function(t){
        d.startAngle = interpolateStart(t);
        d.endAngle = interpolateEnd(t);
        return arc(d);
      }
    }
  }

  var dynamicCircleFill = svg
    .append('path')
    .datum({startAngle: (3/2)*Math.PI, endAngle: (3/2)*Math.PI})
    .attr('class', 'dynamic-circle-fill');

  var dynamicLine2Fill = svg.append('line').attr('class', 'dynamic-line-2-fill');
  
  // ============== Resize ==============
  window.addEventListener('resize', resize);
  function resize(){
    // SVG
    var rightBodyWidth = document.querySelector(section +' .body-right').offsetWidth,
        svgHeight = rightBodyWidth*0.6;
    
    svgWidth = +svg.style('width').split('px')[0]

    svg.attr('height', svgHeight);


    // Labels
    interactiveLabel
      .attr('x', (d, i) =>{
        if([0, 1, 2, 3].indexOf(i) > -1) return config.margin.left;
        else return svgWidth - config.margin.right;
      })
      .attr('y', (d, i) =>{
        if([0, 4].indexOf(i) > -1) return config.margin.top;
        else if(i === 1) return (1/3)*svgHeight - 20;
        else if(i === 2) return (2/3)*svgHeight - 20;
        else if(i === 3) return (2/3)*svgHeight;
      });


    // Input Box
    var inputBoxLeft = interactiveLabel._groups[0][1].getComputedTextLength()
          + config.margin.left + 20;
    var inputBoxTop = interactiveLabel._groups[0][1].getBBox().y + 200;
    var inputBoxHeight = interactiveLabel._groups[0][1].getBBox().height;
      
      
    inputBox
      .style('left', inputBoxLeft +'px')
      .style('top', inputBoxTop +'px')
      .style('height', inputBoxHeight +'px');


    // Dropdown Box
    var dropdownBoxLeft = interactiveLabel._groups[0][3].getBBox().width
      +config.margin.left + 20;
    var dropdownBoxTop = interactiveLabel._groups[0][3].getBBox().y + 200;
    var dropdownBoxHeight = interactiveLabel._groups[0][3].getBBox().height;

    dropdownBox
      .style('left', dropdownBoxLeft +'px')
      .style('top', dropdownBoxTop +'px')
      .style('height', dropdownBoxHeight +'px');


    // Output Numbers
    interactiveNumber
      .attr('x', svgWidth - config.margin.right - 45)
      .attr('y', (d, i) =>{
        if(i === 0) return (1/3)*svgHeight - 20;
        else if(i === 1) return (2/3)*svgHeight;
      });


    // Image
    var imgTop = interactiveLabel._groups[0][3].getBBox().y;
    var imgWidth = document.querySelector(section +' .graph img').offsetWidth;
    var imgHeight = document.querySelector(section +' .graph img').offsetHeight;

    img
      .style('top', (200 + imgTop*.87) +'px')
      .style('left', (svgWidth/2)*1.1 +'px');


    // Static Line
    staticLine
      .attr('x1', 175)
      .attr('y1', (1/3)*svgHeight - 25)
      .attr('x2', svgWidth - 65)
      .attr('y2', (1/3)*svgHeight - 25)
      .attr('marker-end', 'url(#triangle)');


    // Dynamic Line
    dynamicCircle
      .attr('cx', (svgWidth/2)*1.1 + imgWidth/2 - 15)
      .attr('cy', (imgTop*.87) + imgHeight/2)
      .attr('r', d3.min([imgWidth, imgHeight])*0.7);

    circleLeftEdge = +dynamicCircle.attr('cx') - +dynamicCircle.attr('r');
    dynamicLine1
      .attr('x1', 125)
      .attr('y1', (2/3)*svgHeight - 5)
      .attr('x2', circleLeftEdge)
      .attr('y2', (2/3)*svgHeight - 5);

    circleRightEdge = +dynamicCircle.attr('cx') + +dynamicCircle.attr('r');
    dynamicLine2
      .attr('x1', circleRightEdge)
      .attr('y1', (2/3)*svgHeight - 5)
      .attr('x2', svgWidth - 65)
      .attr('y2', (2/3)*svgHeight - 5)
      .attr('marker-end', 'url(#triangle)');

    dynamicLine1Fill
      .attr('x1', 125)
      .attr('y1', (2/3)*svgHeight - 5)
      .attr('x2', 125)
      .attr('y2', (2/3)*svgHeight - 5);

    arc
      .innerRadius(+dynamicCircle.attr('r') - 0.5)
      .outerRadius(+dynamicCircle.attr('r') + 0.5);

    dynamicCircleFill
      .attr('d', arc)
      .attr('transform', 'translate('
        +((svgWidth/2)*1.1 + imgWidth/2 - 15) +', '
        +((imgTop*.87) + imgHeight/2)
        +')');

    dynamicLine2Fill
      .attr('x1', circleRightEdge)
      .attr('y1', (2/3)*svgHeight - 5)
      .attr('x2', circleRightEdge)
      .attr('y2', (2/3)*svgHeight - 5);
  };
  resize();
}