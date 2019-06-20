#!/usr/bin/env node
const program = require('./lib/commander');
const path = require('path');
const {execSync, nciConfig, shell, log} = require('./lib/utils.js');

program.parse(process.argv);
const params = program.args;
let workDir = nciConfig.readConfig().workDir;

const projectName = params[0];
let cmd = '', dir = '';
let servies = null;
if (projectName) {
    for (dir of workDir) {
        try {
            servies = shell(`ls ${dir} | grep -i ${projectName}`).trim().split('\n');
            break;
        } catch (err) {
        }
    }
    console.log('项目所在目录====>', dir);
    cmd = `open -a webstorm ` + path.join(dir, servies[0]);
    log(cmd);
    execSync(cmd);
}

