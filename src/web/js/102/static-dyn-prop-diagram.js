import * as d3 from 'd3';
import '../../css/102/static-dyn-prop-diagram.css';

export default function staticDynPropDiagram(){
  // ============== Static Dyn Diagram ==============
  var staticDynSection = document.querySelector('.static-dyn-prop-diagram')
  var staticDynDiagram = staticDynSection.querySelector('.graph');

  var config = {
    margin: {
      left: 20,
      right: 50,
      top: 20,
      bottom: 20
    }
  }

  // SVG
  var svg = d3.select(staticDynDiagram)
    .append('svg')
    .attr('width', '80%');

  // Labels
  var staticPropertyLabel = svg.append('text')
    .text('Static Property')
    .attr('class', 'property-label static-property-label')
    .attr('x', config.margin.left)
    .attr('y', config.margin.top);

  var dynamicPropertyLabel = svg.append('text')
    .text('Dynamic Property')
    .attr('class', 'property-label dynamic-property-label')
    .attr('x', config.margin.left);

  // Static Numbers
  var staticNumbers = ['42', '42'];
  var staticNumberLabel = svg.selectAll('.static-number-label')
    .data(staticNumbers)
    .enter()
    .append('text')
    .text((d) =>{
      return d;
    })
    .attr('class', (d, i) =>{
      return i ? 
        'property-label static-number-label'
        : 'property-label static-number-label number-label-left';
    })

  // Dynamic Numbers 1
  var dynamicNumbers1 = ['Sum(Sales)', '?'];
  var dynamicNumbers1Label = svg.selectAll('.dynamic-number-label-1')
    .data(dynamicNumbers1, (d) =>{return d;})
    .enter()
    .append('text')
    .attr('id', (d, i)=>{return 'dynamic-number-label-' +i})
    .text((d) =>{
      return d;
    })
    .attr('class', (d, i) =>{
      return i ? 
        'property-label dynamic-number-label-1'
        : 'property-label dynamic-number-label-1 number-label-left';
    })

  // Image
  var img = d3.select('.static-dyn-prop-diagram .graph img');

  // Static Line
  var staticLine = svg.append('line')
    .attr('class', 'static-line');

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

  // Dynamic Circle
  var dynamicCircle = svg.append('circle')
    .attr('class', 'dynamic-circle');

  // Dynamic Line 1
  var dynamicLine1 = svg.append('line')
    .attr('class', 'dynamic-line-1');

  // Dynamic Line 2
  var dynamicLine2 = svg.append('line')
    .attr('class', 'dynamic-line-2');

  // Dynamic Line 1 Fill
  var dynamicLine1Fill = svg.append('line')
    .attr('class', 'dynamic-line-1-fill');

  var dynamicLine1Scale = d3.scaleLinear()
    .domain([0, -125])
    .clamp(true);

  // Dynamic Circle Fill
  var arc = d3.arc()
    .startAngle((3/2)*Math.PI)
    .endAngle((3/2)*Math.PI);

  var dynamicCircleStartAngle = d3.scaleLinear()
    .domain([-125, -250])
    .range([(3/2)*Math.PI, (1/2)*Math.PI])
    .clamp(true);

  var dynamicCircleEndAngle = d3.scaleLinear()
    .domain([-125, -250])
    .range([(3/2)*Math.PI, (5/2)*Math.PI])
    .clamp(true);

  var dynamicCircleFill = svg.append('path')
    .attr('class', 'dynamic-circle-fill');

  // Dynamic Line 2 Fill
  var dynamicLine2Fill = svg.append('line')
    .attr('class', 'dynamic-line-2-fill');

  var dynamicLine2Scale = d3.scaleLinear()
    .domain([-250, -375])
    .clamp(true);

  // ============== Resize ==============
  window.addEventListener('resize', resize);
  function resize(){
    var rightBodyWidth = staticDynSection.querySelector('.body-right').offsetWidth;
    var svgWidth = +svg.style('width').split('px')[0];

    svg.attr('height', rightBodyWidth*0.6);

    // Dynamic Property Label
    dynamicPropertyLabel.attr('y', () =>{
      return +svg.attr('height')*3/6;
    })

    // Static Property Numbers
    staticNumberLabel
      .attr('x', (d, i) =>{
        return i ? (svgWidth - config.margin.right) : 125;
      })
      .attr('y', () =>{
        return +svg.attr('height')*3/12;
      })

    // Dynamic Property Number
    dynamicNumbers1Label
      .attr('x', (d, i) =>{
        return i ? (svgWidth - config.margin.right) : 125;
      })
      .attr('y', () =>{
        return +svg.attr('height')*9/12;
      })

    // Image
    var propertyLabelY = +dynamicPropertyLabel.attr('y');
    img
      .style('top', (propertyLabelY*1.25) +'px')
      .style('left', (svgWidth/2)*1.1 +'px');

    // Static Line
    staticLine
      .attr('x1', 130)
      .attr('y1', +svg.attr('height')*3/12 - 5)
      .attr('x2', (svgWidth - config.margin.right) - 10)
      .attr('y2', +svg.attr('height')*3/12 - 5)
      .attr('marker-end', 'url(#triangle)');

    var imgWidth = document.querySelector('.static-dyn-prop-diagram .graph img').offsetWidth;
    var imgHeight = document.querySelector('.static-dyn-prop-diagram .graph img').offsetHeight;
    // Dynamic Circle
    dynamicCircle
      .attr('cx', (svgWidth/2)*1.1 + imgWidth/2)
      .attr('cy', (propertyLabelY*1.25) + imgHeight/2)
      .attr('r', d3.min([imgWidth, imgHeight])*.7);

    var circleLeftEdge = +dynamicCircle.attr('cx') - +dynamicCircle.attr('r');
    // Dynamic Line 1
    dynamicLine1
      .attr('x1', 130)
      .attr('y1', +svg.attr('height')*9/12 - 5)
      .attr('x2', circleLeftEdge)
      .attr('y2', +svg.attr('height')*9/12 - 5);

    // Dynamic Line 2
    var circleRightEdge = +dynamicCircle.attr('cx') + +dynamicCircle.attr('r');
    dynamicLine2
      .attr('x1', circleRightEdge)
      .attr('y1', +svg.attr('height')*9/12 - 5)
      .attr('x2', (svgWidth - config.margin.right) - 10)
      .attr('y2', +svg.attr('height')*9/12 - 5)
      .attr('marker-end', 'url(#triangle)');

    // Dynamic Line 1 Fill
    dynamicLine1Fill
      .attr('x1', 130)
      .attr('y1', +svg.attr('height')*9/12 - 5)
      .attr('x2', 130)
      .attr('y2', +svg.attr('height')*9/12 - 5);

    dynamicLine1Scale
      .range([130, circleLeftEdge]);

    // Dynamic Circle Fill
    arc
      .innerRadius(+dynamicCircle.attr('r') - 0.5)
      .outerRadius(+dynamicCircle.attr('r') + 0.5);

    dynamicCircleFill
      .attr('d', arc)
      .attr('transform', 'translate(' 
        +((svgWidth/2)*1.1 + imgWidth/2) +', '
        +((propertyLabelY*1.25) + imgHeight/2)
      +')');

    // Dynamic Line 2 Fill
    dynamicLine2Fill
      .attr('x1', circleRightEdge)
      .attr('y1', +svg.attr('height')*9/12 - 5)
      .attr('x2', circleRightEdge)
      .attr('y2', +svg.attr('height')*9/12 - 5);

    dynamicLine2Scale
      .range([circleRightEdge, (svgWidth - config.margin.right) - 10]);
  }
  resize();

  // ============== Scroll ==============
  window.addEventListener('scroll', scroll);

  function scroll(){
    // Get section top position
    var sectionTop = document.querySelector('.static-dyn-prop-diagram').getBoundingClientRect().top;

    // Fill first line
    dynamicLine1Fill
      .attr('x2', dynamicLine1Scale(sectionTop));

    // Fill circle
    arc
      .startAngle(dynamicCircleStartAngle(sectionTop))
      .endAngle(dynamicCircleEndAngle(sectionTop));
    dynamicCircleFill.attr('d', arc);

    // Fill second line
    dynamicLine2Fill
      .attr('x2', dynamicLine2Scale(sectionTop));

    if(sectionTop <= -375) svg.select('#dynamic-number-label-1').text('532');
    else svg.select('#dynamic-number-label-1').text('?');
  }
  scroll();
}