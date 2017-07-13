import Clipboard from 'clipboard';
import '../../../node_modules/ace-builds/src-min-noconflict/ace.js';
import '../../../node_modules/ace-builds/src-min-noconflict/mode-json.js';
import '../../../node_modules/ace-builds/src-min-noconflict/mode-javascript.js';
import '../../../node_modules/ace-builds/src-min-noconflict/mode-css.js';
import '../../../node_modules/ace-builds/src-min-noconflict/theme-tomorrow_night.js';

export default function aceEditor(section, language, text, filename){
  // Get count of total previous editors
  var previousEditors = document.querySelectorAll('.' +section +' .editor-container').length;

  // Get .graph div
  var editorGraph = document.querySelector('.' +section +' .graph');

  // HTML string of nav tabs
  var navTabsString = `
    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#${section}">${filename}</li>
    </ul>
    <div class="tab-content"></div>
  `;

  // Create element to contain nav tabs and editor
  var editorContainer = document.createElement('div');
  editorContainer.classList.add('editor-container');
  editorContainer.innerHTML = navTabsString;

  // Create div to contain editor element
  var editorElement = document.createElement('div');
  editorElement.setAttribute('id', section +'-embed-' +previousEditors);

  // Append editor element to container with nav-tabs
  editorContainer.querySelector('.tab-content').appendChild(editorElement);

  // Append container to .graph div
  editorGraph.appendChild(editorContainer);

  var editor = ace.edit(section +'-embed-' +previousEditors);
  editor.getSession().setMode('ace/mode/' +language);
  editor.$blockScrolling = Infinity;
  editor.session.setUseWorker(false);
  editor.session.setOptions({
    tabSize: 2,
    useSoftTabs: true
  })
  editor.setTheme('ace/theme/tomorrow_night');
  editor.setReadOnly(true);
  editor.setValue(text);
  editor.clearSelection();
  editor.resize();
  editor.setFadeFoldWidgets(true);

  /* Add button to editor */
  var buttonDiv = document.createElement('div');

  buttonDiv.classList.add('copy-button');
  buttonDiv.setAttribute('data-clipboard-text', editor.getValue());
  buttonDiv.innerText = 'Copy';

  new Clipboard('.copy-button');
  editorGraph.querySelector('.ace_editor').appendChild(buttonDiv);

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
}