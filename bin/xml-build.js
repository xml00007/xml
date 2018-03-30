#!/usr/bin/env node
const program = require('./lib/commander');
const fs = require('fs');
const {title, shell, execSync, mustBeLerna, scriptResolve, projectDir} = require('./lib/utils.js');

program.arguments('[clean]').parse(process.argv);

const clean = () => {
  title('正在清理编译');
  execSync('rm -rf packages/*/lib');
  execSync('rm -rf building');
};

const packageJsonRewrite = () => {
  const jsonPaths = shell(`find building -name package.json -maxdepth 3 -type f`).trim().split('\n').filter(item => {
    let name = require(projectDir(item)).name;
    return name ? name[0] === '@' : false;
  });
  jsonPaths.forEach(jsonPath => {
    console.log(projectDir(jsonPath));
    const jsonContent = require(projectDir(jsonPath));
    jsonContent.main = 'lib/index.js';
    fs.writeFileSync(projectDir(jsonPath), JSON.stringify(jsonContent, null, 2));
  });
};
const build = () => {
  title('正在执行编译');
  execSync(`
    # copy packages
    cp -rf packages building
    # replace gulpfile.js
    cp -rf ${scriptResolve('gulpfile.js')} gulpfile.js 
    # compile
    ./node_modules/.bin/gulp
  `);
};
clean();
build();
// if (program.args.length && (program.args[0] === 'clean' || program.args[0] === 'c')) {
//   clean();
// } else {
//   clean();
//   build();
//   packageJsonRewrite();
// }
