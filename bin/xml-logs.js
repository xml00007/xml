#!/usr/bin/env node
const program = require('./lib/commander');
const fs = require('fs');
const _ = require('lodash');
const chalk = require('chalk');
const {log, projectDir, execSync} = require('./lib/utils.js');

program.parse(process.argv);
const params = program.args;
if (params.length < 2) {
  log('请输入合适的参数');
}
let path = params[params.length - 1];
const realPath = projectDir(path);
let querys = params.slice(0, params.length - 1).join('.*');
const cmd = `grep ${querys} ${realPath} --color`;
execSync(cmd);

