#! /usr/bin/env node

var program = require('commander'),
    request = require('request');

function authenticate() {

}

function list() {
  var options = {
    url: 'http://color.adobe.com/api/v2/themes?filter=public&startIndex=0&maxNumber=10&sort=like_count&time=all&metadata=all'
    , headers: {
      'Content-Type': 'application/json'
      , 'Accept': 'application/json, text/javascript, */*; q=0.01'
      , 'x-api-key': '7810788A1CFDC3A717C58F96BC4DD8B4'
    }
  };

  var callback = function(error, response, body){
    console.log(JSON.parse(body))
  };
  request(options, callback);
}

program
  .version('0.0.1')
  .option('-a', '--auth', 'Authenticate user at http://color.adobe.com', authenticate)
  .option('-l, --list', 'List all colours at http://color.adobe.com', list)
  .parse(process.argv);

// if (!program.args.length) program.help();

exports.pallette = function() {
  return 'pallette';
};
