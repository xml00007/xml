#!/usr/bin/env node
const program = require('./lib/commander');
const fs = require('fs');
const _ = require('lodash');
const chalk = require('chalk');
const {nciConfig, log} = require('./lib/utils.js');

program
    .arguments('[cmd] [key] [value]')
    .parse(process.argv);

switch (program.args[0]) {
  case 'set':
    nciConfig.set(program.args[1], program.args[2]);
    break;
  case 'unset':
    nciConfig.unset(program.args[1]);
    break;
  case 'get':
    log(`
    ${chalk.greenBright(nciConfig.get(program.args[1]))}
    `);
    break;
  default:
    log(nciConfig.path);
    toTable();
}

function toTable() {
  const Table = require('cli-table');
  const table = new Table();
  const config = nciConfig.readConfig();
  let res = [];
  Object.keys(config).forEach(key => {
    const item = {};
    item[key] = config[key];
    table.push(item);
  });
  log(table.toString());
}
