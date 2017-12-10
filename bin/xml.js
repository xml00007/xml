#!/usr/bin/env node

/**
 * Created by Arthur on 2017-12-10.
 */

const program = require('./lib/commander');
const checkVersion = require('./lib/checkVersion');
const {helpColor} = require('./lib/utils');

program
    .version(require('../package.json').version)
    .usage(`<command>尖括号(例如 <cmd>) 代表必须输入，方括号 (例如：[env]) 代表可选输入`);

program
    .command('bootstrap', '# 安装依赖并自动链接私有包, -例如：nci bootstrap 或 nci bs').alias('bs')
    .command('normalize', '# 统一开发环境, node,lerna,cnpm,n -例如：nci normalize 或 nci normal').alias('normal')
    .command('checkVersion').description('# 检查最新版本并自动升级').alias('check').action(() => checkVersion());

program.on('--help', function() {
  let example = `
  Example:
  
    # 升级工程
    'nci project upgrade' 简写 'nci pjt up'
    
    # 添加子项目
    'nci submodule|sm add http://gitlab.puhuitech.cn/nirvana-dev/nchannel/nchannel-core.git'
    'nci submodule|sm add http://gitlab.puhuitech.cn/nirvana-dev/nchannel/nchannel-openapi.git'
    
    # 删除指定名称的子项目
    'nci submodule|sm rm dependency/nchannel-core' 
    
    # 删除所有子项目
    'nci submodule|sm rm' 
  `;
  console.log(helpColor(example));
});

program.parse(process.argv);
