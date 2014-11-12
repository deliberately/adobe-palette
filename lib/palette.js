#! /usr/bin/env node

var program = require('commander'),
    request = require('request'),
    ansi = require('ansi'),
    cursor = ansi(process.stdout);

function printTheme(theme) {

  theme.swatches.forEach(function(swatch){
    cursor.bg.hex("#" + swatch.hex).write("  ").reset().write(" ");
  })
  cursor.bold().underline().write(theme.name).reset().write(" by: ").write(theme.author).write(" ").reset();


  cursor.write("\n\n");

}

String.prototype.format = function(placeholders) {
    var s = this;
    for(var propertyName in placeholders) {
        var re = new RegExp('{' + propertyName + '}', 'gm');
        s = s.replace(re, placeholders[propertyName]);
    }
    return s;
};

var variables = {
  startIndex: 0,
  endIndex: 100,
  maxNumber: function() {
    return this.endIndex - this.startIndex;
  }
}

function from(startIndex){
  variables.startIndex = startIndex
}

function to(endIndex){
  variables.endIndex = endIndex
}

function list() {

  var url = 'http://color.adobe.com/api/v2/themes?filter=public&startIndex={startIndex}&maxNumber={maxNumber}&sort=like_count&time=all&metadata=all'
              .format({startIndex: variables.startIndex || 0, maxNumber: variables.maxNumber()});
  var options = {
    url: url
    , headers: {
      'Content-Type': 'application/json'
      , 'Accept': 'application/json, text/javascript, */*; q=0.01'
      , 'x-api-key': '7810788A1CFDC3A717C58F96BC4DD8B4'
    }
  };

  var callback = function(error, response, body){
    var themes = JSON.parse(body).themes.map(function(theme){
      return {
        author: theme.author.name,
        href: theme.href,
        name: theme.name,
        swatches: theme.swatches
      }
    });
    themes.forEach(printTheme);
  };
  request(options, callback);
}

program
  .version('0.0.1')
  .option('-l, --list ', 'List all colours at http://color.adobe.com', list)
  .option('-f, --from [start]', 'Start index', from)
  .option('-t --to [to]', 'Number of results', to)
  .option('-h --help', 'Show this help message', function(){ program.help(); })
  .parse(process.argv);

if (process.argv.length <= 2) {
  program.help();
}

exports.pallette = function() {
  return 'pallette';
};
