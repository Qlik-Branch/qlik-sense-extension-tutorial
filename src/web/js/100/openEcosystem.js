import * as d3 from 'd3';
import '../../css/100/open-ecosystem.css';

export default function openEcosystem(section){
  var graph = document.querySelector(section +' .body-right .graph');
  var imgEcosystem = document.querySelector('.open-ecosystem .body-right .graph > img:first-child');
  var imgEcosystemExtension = document.querySelector('.open-ecosystem .body-right .graph > img:nth-child(2)');
  var imgEcosystemMashup = document.querySelector('.open-ecosystem .body-right .graph > img:nth-child(3)');
  var imgEcosystemCustom = document.querySelector('.open-ecosystem .body-right .graph > img:nth-child(4)');

  var divContainer = document.createElement('div');
  divContainer.classList.add('div-container');
  graph.appendChild(divContainer);

  // SVG
  var svg = d3.select(divContainer)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%');

  var svgWidth = +svg.style('width').split('px')[0],
      svgHeight = +svg.style('height').split('px')[0];

  var bigLine = svg.append('line')
    .attr('class', 'big-line');

  var smallLineExtension = svg.append('line')
    .attr('class', 'small-line');

  var smallLineMashup = svg.append('line')
    .attr('class', 'small-line');

  var bigCircle = svg.append('circle')
    .attr('class', 'big-circle');

  var bigTextExtensionLabel = ['Qlik Sense', 'Client']
  var bigTextExtension = svg.selectAll('.big-text-extension')
    .data(bigTextExtensionLabel)
    .enter()
    .append('text')
    .text((d) =>{return d})
    .attr('class', 'text big-text-extensions');

  var bigTextMashup = svg.append('text')
    .attr('class', 'text big-text-mashup')
    .text('Mashup');

  var bigTextCustom = svg.append('text')
    .attr('class', 'text big-text-custom')
    .text('Custom');

  var smallCircle = svg.append('circle')
    .attr('class', 'small-circle');

  var smallTextExtension = svg.append('text')
    .text('Extension')
    .attr('class', 'text');

  var smallTextMashupLabel = ['Qlik', 'Sense', 'Client'];
  var smallTextMashup = svg.selectAll('.small-text-mashup')
    .data(smallTextMashupLabel)
    .enter()
    .append('text')
    .text((d) =>{return d})
    .attr('class', 'text small-text-mashup')


  svg.attr('onload', function(){
    resize();
  })


  // ============== Resize ==============
  window.addEventListener('resize', function(){setTimeout(function(){resize()}, 100)});
  function resize(){
    document.querySelector('.open-ecosystem .body-right .graph').style.maxHeight = window.innerHeight +'px';
    imgEcosystem.style.maxHeight = (window.innerHeight - 15) +'px';

    var graphRect = graph.getBoundingClientRect();
    var ecosystemRect = imgEcosystem.getBoundingClientRect();
    imgEcosystemExtension.style.left = ecosystemRect.width*0.024 +'px';
    imgEcosystemExtension.style.width = ecosystemRect.width*0.95 +'px';
    imgEcosystemExtension.style.top = (15 + ecosystemRect.height*0.345) +'px';

    imgEcosystemMashup.style.left = ecosystemRect.width*0.024 +'px';
    imgEcosystemMashup.style.width = ecosystemRect.width*0.95 +'px';
    imgEcosystemMashup.style.top = (15 + ecosystemRect.height*0.34) +'px';

    imgEcosystemCustom.style.left = ecosystemRect.width*0.024 +'px';
    imgEcosystemCustom.style.width = ecosystemRect.width*0.95 +'px';
    imgEcosystemCustom.style.top = (15 + ecosystemRect.height*0.343) +'px';

    divContainer.style.top = (15 + ecosystemRect.height*0.34) +'px';
    divContainer.style.height = ecosystemRect.height*0.253 +'px';

    svgWidth = +svg.style('width').split('px')[0];
    svgHeight = +svg.style('height').split('px')[0];
    

    bigCircle
      .attr('cx', svgWidth*0.85)
      .attr('cy', svgHeight*0.5)
      .attr('r', 44);

    bigTextExtension
      .attr('x', (d, i) =>{
        return i ? svgWidth*0.825 : svgWidth*0.85;
      })
      .attr('y', (d, i) =>{
        return i ? (svgHeight*0.45 + 15) : svgHeight*0.45
      });
    
    bigTextMashup
      .attr('x', svgWidth*0.85)
      .attr('y', svgHeight*0.5);

    bigTextCustom
      .attr('x', svgWidth*0.85)
      .attr('y', svgHeight*0.5);

    smallCircle
      .attr('cx', svgWidth*0.9)
      .attr('cy', svgHeight*0.7)
      .attr('r', 27);

    smallTextExtension
      .attr('x', svgWidth*0.9)
      .attr('y', svgHeight*0.725);

    smallTextMashup
      .attr('x', svgWidth*0.9)
      .attr('y', (d, i) =>{
        if(i===0) return svgHeight*0.625;
        else if(i===1) return svgHeight*0.625 + 15;
        else return svgHeight*0.625 + 30;
      })

    var imgExtensionRight = ecosystemRect.width - ecosystemRect.width*0.024;

    bigLine
      .attr('x1', imgExtensionRight)
      .attr('y1', svgHeight*0.5)
      .attr('x2', svgWidth*0.85)
      .attr('y2', svgHeight*0.5);

    smallLineExtension
      .attr('x1', imgExtensionRight*0.98)
      .attr('y1', svgHeight*0.7)
      .attr('x2', svgWidth*0.9)
      .attr('y2', svgHeight*0.7);

    smallLineMashup
      .attr('x1', imgExtensionRight*0.755)
      .attr('y1', svgHeight*0.7)
      .attr('x2', svgWidth*0.9)
      .attr('y2', svgHeight*0.7);

  } resize();


  // ============== Scroll ==============
  var imgExtensionScale = d3.scaleLinear()
    .domain([-700, -1000])
    .range([1, 0])
    .clamp(true);

  var imgMashupScale = d3.scaleLinear()
    .domain([-700, -1000, -1600, -1900])
    .range([0, 1, 1, 0])
    .clamp(true);

  var imgCustomScale = d3.scaleLinear()
    .domain([-1600, -1900])
    .range([0, 1])
    .clamp(true);

  var smallCircleScale = d3.scaleLinear()
    .domain([-1600, -1900])
    .range([1, 0])
    .clamp(true);

  window.addEventListener('scroll', function(){onscroll()});
  function onscroll(){
    var sectionTop = document.querySelector(section).getBoundingClientRect().top;

    imgEcosystemExtension.style.opacity = imgExtensionScale(sectionTop);
    imgEcosystemMashup.style.opacity = imgMashupScale(sectionTop);
    imgEcosystemCustom.style.opacity = imgCustomScale(sectionTop);

    bigTextExtension.style('opacity', imgExtensionScale(sectionTop));
    bigTextMashup.style('opacity', imgMashupScale(sectionTop));
    bigTextCustom.style('opacity', imgCustomScale(sectionTop));

    smallTextExtension.style('opacity', imgExtensionScale(sectionTop));
    smallTextMashup.style('opacity', imgMashupScale(sectionTop));

    smallLineExtension.style('opacity', imgExtensionScale(sectionTop));
    smallLineMashup.style('opacity', imgMashupScale(sectionTop));

    smallCircle.style('opacity', smallCircleScale(sectionTop)); 
  } onscroll();
}