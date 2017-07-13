var fs = require('fs-extra');
var path = require('path');

var folderSource = path.join(__dirname, '../dist'),
    folderDest = '/Users/johnbellizzi/Dropbox/Small Victories/party hat pants';

fs.emptyDir(folderDest, (err) =>{
  if(err) return console.log(err);

  fs.copy(folderSource, folderDest, function(err){
    if(err) throw err;
  })
})