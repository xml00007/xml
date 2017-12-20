#!/usr/bin/env node
const program = require('./lib/commander');
const {execSync, nciConfig, shell, log, excuteRemoteShell} = require('./lib/utils.js');

program.parse(process.argv);
const params = program.args;

const positions = ['~/Library/Application\\ Support/',
    // '~/Library/Application\\ Support/CrashReporter/',
    '~/Library/Caches/',
    '~/Library/Containers/',
    '~/Library/LaunchAgents/',
    '~/Library/Preferences/',
    '~/Library/PreferencePanes/'];
const position2 = [];
// positions.forEach(function (adress) {
//     let aaaa = `cd  ${adress} && ls -al | grep webstorm -i `;
//     aaaa = aaaa.replace(/(\n|\s\s\s*)/g, ' ');
//     let servies = shell(aaaa).trim();
//     if (servies.length > 0) {
//         servies = servies.split('\n');
//     }
//     log('1111111111', servies);
//     if (servies.length > 0) {
//         servies.forEach(function (data) {
//             console.log(2222222, data)
//             // const cmd = `rm -rf ${data}`;
//             // execSync(cmd);
//         })
//     }
//
// });


const cmd1 = ` mdfind -name 'webstorm'`;
let servies = shell(cmd1).trim().split('\n');
let newss = servies.filter(function (url) {
    if (url.includes('Downloads') || url.includes('xml-cmd') || url.includes('WebstormProjects')) {
        return false;
    } else {
        return true;
    }
})
console.log('1111111', newss);
newss.forEach(function (data) {
    // let cmd2 = `rm -rf ${data}`;
    // console.log(cmd2);
    // execSync(cmd2);

})



