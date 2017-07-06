import * as d3 from 'd3';

export default function activateSidebar(chapter){
  /* Remove active status of previous link and change previous link's glyphicon */
  var activeSidebarItem = document.querySelector('#sidebar .nav-sidebar .active');
  if(activeSidebarItem) activeSidebarItem.classList.remove('active');
  var activeGlyphicon = document.querySelector('.glyphicon');
  activeGlyphicon.classList.remove('glyphicon-menu-down');
  activeGlyphicon.classList.add('glyphicon-menu-right');

  /* Add active status to current link and change current link's glyphicon */
  var sidebarItem = document.querySelector('#sidebar .nav-sidebar .chapter-' +chapter);
  sidebarItem.classList.add('active');
  var sidebarGlyphicon = sidebarItem.querySelector('.glyphicon');
  sidebarGlyphicon.classList.remove('glyphicon-menu-right');
  sidebarGlyphicon.classList.add('glyphicon-menu-down');

  /* Add id to each h2 for anchoring */
  var h2 = d3.selectAll('#body-content h2');
  h2.attr('id', (d, i) =>{
    return 'h2-' +i;
  });
}