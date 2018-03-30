#!/usr/bin/env node
const program = require('./lib/commander');
const fs = require('fs');
const {title, shell, execSync, mustBeLerna, scriptResolve, projectDir} = require('./lib/utils.js');

// mustBeLerna();

program.arguments('[clean]').parse(process.argv);
setInterval(function () {
    execSync(`/usr/local/bin/babel-node /Users/jinke/Documents/test2/selenium/mofengwo.js`);
}, 60*1000)

