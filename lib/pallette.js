#! /usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .option('-l, --list', 'list all colours at http://color.adobe.com')
  .parse(process.argv);

if (!program.args.length) program.help();

exports.pallette = function() {
  return 'pallette';
};
