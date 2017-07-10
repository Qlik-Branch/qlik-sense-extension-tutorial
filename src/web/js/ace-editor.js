import '../../../node_modules/ace-builds/src-min-noconflict/ace.js';
import '../../../node_modules/ace-builds/src-min-noconflict/mode-json.js';
import '../../../node_modules/ace-builds/src-min-noconflict/mode-javascript.js';
import '../../../node_modules/ace-builds/src-min-noconflict/mode-css.js';
import '../../../node_modules/ace-builds/src-min-noconflict/theme-tomorrow_night.js';

export default function aceEditor(section, language, text){
  var editorGraph = document.querySelector('.' +section +' .graph');
  var editorElement = document.createElement('div');
  editorElement.setAttribute('id', section);

  editorGraph.appendChild(editorElement);

  var editor = ace.edit(section);
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
}