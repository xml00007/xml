#!/usr/bin/env node
const program = require('./lib/commander');
const {execSync, nciConfig, shell, log} = require('./lib/utils.js');

program.parse(process.argv);
const params = program.args;
const workDir = nciConfig.readConfig().workDir;
const projectName = params[0];
let cmd = `/usr/local/bin/webstorm `;
if (projectName) {
  let servies = shell(`ls ${workDir} | grep ${projectName}`).trim().split('\n');
  cmd = `/usr/local/bin/webstorm ${workDir + servies[0]}`;
}
log(cmd);
execSync(cmd);



