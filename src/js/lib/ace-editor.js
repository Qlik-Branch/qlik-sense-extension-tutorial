import Clipboard from 'clipboard';
import * as d3 from 'd3';
import '../../../node_modules/ace-builds/src-min-noconflict/ace.js';
import '../../../node_modules/ace-builds/src-min-noconflict/mode-json.js';
import '../../../node_modules/ace-builds/src-min-noconflict/mode-javascript.js';
import '../../../node_modules/ace-builds/src-min-noconflict/mode-css.js';
import '../../../node_modules/ace-builds/src-min-noconflict/mode-html.js';
import '../../../node_modules/ace-builds/src-min-noconflict/theme-tomorrow_night.js';

export default function aceEditor(section, language, text, filename){
  // Get count of total previous editors
  const previousEditors = document.querySelectorAll('.' +section +' .editor-container .tab-pane').length;

  // Get .graph div
  const editorGraph = d3.select('.' +section +' .graph');

  // Check if already tabs
  if(previousEditors > 0) addTab();
  else createTab();


  var editor = ace.edit(section +'-embed-' +previousEditors);
  editor.getSession().setMode('ace/mode/' +language);
  editor.$blockScrolling = Infinity;
  editor.session.setUseWorker(false);
  editor.session.setOptions({
    tabSize: 2,
    useSoftTabs: true
  })
  editor.setTheme('ace/theme/tomorrow_night')
  editor.setReadOnly(true);
  editor.setValue(text)
  editor.clearSelection();
  // editor.resize();
  editor.setFadeFoldWidgets(true);

  const lineCount = editor.session.doc.getAllLines().length;

  d3.select('#' +section +'-embed-' +previousEditors)
    .style('height', 16*(lineCount + 3) +'px');

  editorGraph.select('.editor-container .tab-content .ace_editor:last-of-type')
    .append('div')
    .attr('class', 'copy-button')
    .attr('data-clipboard-text', editor.getValue())
    .attr('data-toggle', 'tooltip')
    .attr('title', 'copied')
    .html('Copy');

  $(document).ready(function(){
    $('.copy-button').tooltip({
      trigger: 'click'
    })
  })

  var clipboard = new Clipboard('.copy-button');
  clipboard.on('success', function(){
    setTimeout(function(){
      $('.copy-button').tooltip('hide');
    }, 1000);
  });

  /* Ace Editor will scroll to top of page if you click out of
      the textarea and then back into it. The following maintains
      a record of the current body scroll position and applies it
      to the body everytime an editor comes back into focus */
  var scrollTop;
  // Listen for scroll action
  window.addEventListener('scroll', function(){onscroll()});
  function onscroll(){
    // Reset scrollTop position
    scrollTop = document.querySelector('body').scrollTop;
  }; onscroll();

  // onFocus, set body scrollTop
  editor.onFocus = function(){
    document.querySelector('body').scrollTop = scrollTop;
  }

  return editor;

  // Create Tabs
  function createTab(){
    // HTML string of nav tabs
    const navTabsString =
      `<ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#${section}-embed-${previousEditors}">${filename}</a></li>
      </ul>
      <div class="tab-content"></div>
    `;

    // Create element to contain nav tabs and editor
    const editorContainer = editorGraph
      .append('div')
        .attr('class', 'editor-container')
        .html(navTabsString);

    editorContainer.select('.tab-content')
      .append('div')
      .attr('id', section +'-embed-' +previousEditors)
      .attr('class', 'tab-pane fade in active');
  }


  // Add Tabs
  function addTab(){
    d3.select('.' +section +' .graph .editor-container .nav-tabs')
      .append('li')
      .append('a')
        .attr('data-toggle', 'tab')
        .attr('href', `#${section}-embed-${previousEditors}`)
        .html(filename)

    d3.select('.' +section +' .graph .editor-container .tab-content')
      .append('div')
      .attr('id', section +'-embed-' +previousEditors)
      .attr('class', 'tab-pane fade');

    d3.select('.' +section +` .graph .editor-container .tab-content #${section}-embed-${previousEditors}`)
      .append('div')
      .attr('id', section +'-embed-' +previousEditors)
      .attr('class', 'tab-pane fade');
  }
}

// import Clipboard from 'clipboard';
// import '../../../node_modules/ace-builds/src-min-noconflict/ace.js';
// import '../../../node_modules/ace-builds/src-min-noconflict/mode-json.js';
// import '../../../node_modules/ace-builds/src-min-noconflict/mode-javascript.js';
// import '../../../node_modules/ace-builds/src-min-noconflict/mode-css.js';
// import '../../../node_modules/ace-builds/src-min-noconflict/theme-tomorrow_night.js';

// export default function aceEditor(section, language, text, filename, options){
//   // Get count of total previous editors
//   var previousEditors = document.querySelectorAll('.' +section +' .editor-container').length;

//   // Get .graph div
//   var editorGraph = document.querySelector('.' +section +' .graph');

//   if(options){
//     if(options.addTab){
//       console.log(document.querySelector('.' +section +' .graph .editor-container'));

//       var listItem = document.createElement('li');
//       var anchor = document.createElement('a');
//       anchor.setAttribute('data-toggle', 'tab');
//       anchor.setAttribute('href', `#${section}-embed-${previousEditors}`);
//       anchor.innerText = filename;

//       listItem.appendChild(anchor);
//       document.querySelector('.' +section +' .graph .editor-container .nav-tabs').appendChild(listItem);

//       var editorElement = document.createElement('div');
//       editorElement.setAttribute('id', section +'-embed-' +previousEditors);
//       editorElement.classList.add('tab-pane', 'fade');

//       document.querySelector('.' +section +' .graph .editor-container .tab-content').appendChild(editorElement);

//       // createTab();

//     } else createTab();
//   } else createTab();

//   function createTab(){
//     // HTML string of nav tabs
//     var navTabsString =
//       `<ul class="nav nav-tabs">
//         <li class="active"><a data-toggle="tab" href="#${section}-embed-${previousEditors}">${filename}</a></li>
//       </ul>
//       <div class="tab-content"></div>
//     `;


//     // Create element to contain nav tabs and editor
//     var editorContainer = document.createElement('div');
//     editorContainer.classList.add('editor-container');
//     editorContainer.innerHTML = navTabsString;

//     // Create div to contain editor element
//     var editorElement = document.createElement('div');
//     editorElement.setAttribute('id', section +'-embed-' +previousEditors);
//     editorElement.classList.add('tab-pane', 'fade', 'in', 'active')

//     // Append editor element to container with nav-tabs
//     editorContainer.querySelector('.tab-content').appendChild(editorElement);

//     // Append container to .graph div
//     editorGraph.appendChild(editorContainer);
//   }

//   var editor = ace.edit(section +'-embed-' +previousEditors);
//   editor.getSession().setMode('ace/mode/' +language);
//   editor.$blockScrolling = Infinity;
//   editor.session.setUseWorker(false);
//   editor.session.setOptions({
//     tabSize: 2,
//     useSoftTabs: true
//   })
//   editor.setTheme('ace/theme/tomorrow_night');
//   editor.setReadOnly(true);
//   editor.setValue(text);
//   editor.clearSelection();
//   editor.resize();
//   editor.setFadeFoldWidgets(true);

//   /* Add button to editor */
//   var buttonDiv = document.createElement('div');

//   buttonDiv.classList.add('copy-button');
//   buttonDiv.setAttribute('data-clipboard-text', editor.getValue());
//   buttonDiv.setAttribute('data-toggle', 'tooltip');
//   buttonDiv.setAttribute('title', 'copied');
//   $(document).ready(function(){
//     // $('[data-toggle="tooltip"]').tooltip();
//     $('.copy-button').tooltip({
//       trigger: 'click'
//     })
//   })
//   buttonDiv.innerText = 'Copy';

//   var clipboard = new Clipboard('.copy-button');
//   editorGraph.querySelector('.editor-container .tab-content .ace_editor:last-of-type').appendChild(buttonDiv);

//   clipboard.on('success', function(){
//     setTimeout(function(){
//       $('.copy-button').tooltip('hide');
//     }, 1000)
//   })

//   /* Ace Editor will scroll to top of page if you click out of
//       the textarea and then back into it. The following maintains
//       a record of the current body scroll position and applies it
//       to the body everytime an editor comes back into focus */
//   var scrollTop;
//   // Listen for scroll action
//   window.addEventListener('scroll', function(){onscroll()});
//   function onscroll(){
//     // Reset scrollTop position
//     scrollTop = document.querySelector('body').scrollTop;
//   }; onscroll();

//   // onFocus, set body scrollTop
//   editor.onFocus = function(){
//     document.querySelector('body').scrollTop = scrollTop;
//   }

//   return editor;
// }