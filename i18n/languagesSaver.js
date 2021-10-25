var fs = require('fs');
var _ = require('lodash');

var en = require('./en.json');
var es = require('./es.json');

const newZh = {};

en.forEach((key, index) => {
  newZh[key] = es[index];
});

fs.writeFile('es 2.json', JSON.stringify(newZh), function (err) {
  if (err) {
    console.log(err);
  }
});
