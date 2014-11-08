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

function list() {
  var options = {
    url: 'http://color.adobe.com/api/v2/themes?filter=public&startIndex=0&maxNumber=5&sort=like_count&time=all&metadata=all'
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
  .option('-l, --list', 'List all colours at http://color.adobe.com', list)
  .parse(process.argv);

// if (!program.args.length) program.help();

exports.pallette = function() {
  return 'pallette';
};
