import * as d3 from 'd3';
import '../../css/100/scrolly-qix.css';

export default function scrollyQix(section){
  /* Size Animation container */
  var scrollyBodyRight = document.querySelector(section +' .body-right');
  var scrollyQixContainer = document.querySelector(section +' .body-right .graph');


  /* Append new div element */
  var arrowDiv = document.createElement('div');
  arrowDiv.classList.add('arrow-div');
  scrollyQixContainer.insertBefore(arrowDiv, scrollyQixContainer.children[1]);

  /* Append user div container */
  var userDiv = document.createElement('div');
  userDiv.classList.add('user-div');
  for(var i=0; i<2; i++){
    userDiv.appendChild(document.querySelector(section +' .graph img:nth-child(5)'));
  };

  scrollyQixContainer.appendChild(userDiv);


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

  svg.attr('onload', function(){
    resize();
  });
  
  // ============== Resize ==============
  window.addEventListener('resize', function(){resize()});
  function resize(){
    svgWidth = +svg.style('width').split('px')[0];
    svgHeight = +svg.style('height').split('px')[0];
        
    scrollyBodyRight.style.height = window.innerHeight +'px';
    
    lineUp
      .attr('x1', svgWidth*(11/24))
      .attr('y1', svgHeight)
      .attr('x2', svgWidth*(11/24));

    lineDown
      .attr('x1', svgWidth*(13/24))
      .attr('y1', 0)
      .attr('x2', svgWidth*(13/24));
  };
  resize();


  // ============== Scroll ==============
  var imgUser = document.querySelector(section +' .graph .user-div > img:nth-child(2)');
  var imgChat = document.querySelector(section +' .graph .user-div > img:nth-child(1)');
  var imgMonitorBefore = document.querySelector(section +' .graph > img:nth-child(3)');
  var imgMonitorAfter = document.querySelector(section +' .graph > img:nth-child(4)');

  var imgUserScale = d3.scaleLinear()
    .domain([-300, -600])
    .range([0, 1])
    .clamp(true);
  var imgChatScale = d3.scaleLinear()
    .domain([-600, -900, -1200, -1500])
    .range([0, 1, 1, 0])
    .clamp(true);

  var lineUpY2Scale = d3.scaleLinear()
    .domain([-1300, -1900])
    .range([svgHeight, 0])
    .clamp(true);
  var lineUpOpacityScale = d3.scaleLinear()
    .domain([-2000, -2300])
    .range([1, 0])
    .clamp(true);

  var lineDownY2Scale = d3.scaleLinear()
    .domain([-2400, -2700])
    .range([0, svgHeight])
    .clamp(true);
  
  window.addEventListener('scroll', function(){onscroll()});
  function onscroll(){
    var sectionTop = document.querySelector(section).getBoundingClientRect().top;

    imgUser.style.opacity = imgUserScale(sectionTop);
    imgChat.style.opacity = imgChatScale(sectionTop);

    lineUp.attr('y2', lineUpY2Scale(sectionTop));
    lineUp.style('opacity', lineUpOpacityScale(sectionTop));

    lineDown.attr('y2', lineDownY2Scale(sectionTop));

    if(sectionTop > -2700){
      imgMonitorBefore.style.display = 'block';
      imgMonitorAfter.style.display = 'none';
    } else {
      imgMonitorBefore.style.display = 'none';
      imgMonitorAfter.style.display = 'block';
    }
  }
  onscroll();
}