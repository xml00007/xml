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
    .command('build', '# 安装依赖并自动链接私有包, -例如：xml build 或 xml b').alias('b')
    .command('logs', '# 分析日志, -例如：xml logs 或 xml l').alias('l')
    .command('time', '# 定时任务, -例如：xml time 或 xml t').alias('t')
    .command('webstorm', '# 打开项目, -例如：xml webstorm 或 xml ws').alias('ws')
    .command('uninstall', '# 删除文件, -例如：xml rm 或 xml rm').alias('rm')
    .command('config [set|unset] [key-path] [key-value]', '# JSON风格全局配置 -例如:  "xml cfg set scope @nivana" 配置 scope 为 @nirvana').alias('cfg')
    .command('normalize', '# 统一开发环境, node,lerna,cnpm,n -例如：xml normalize 或 xml normal').alias('normal')
    .command('checkVersion').description('# 检查最新版本并自动升级').alias('check').action(() => checkVersion());

program.on('--help', function() {
  let example = `
  Example:
  
    # 升级工程
    'xml project upgrade' 简写 'xml pjt up'
    
    # 添加子项目
    'xml submodule|sm add http://gitlab.puhuitech.cn/nirvana-dev/nchannel/nchannel-core.git'
    'xml submodule|sm add http://gitlab.puhuitech.cn/nirvana-dev/nchannel/nchannel-openapi.git'
    
    # 删除指定名称的子项目
    'xml submodule|sm rm dependency/nchannel-core' 
    
    # 删除所有子项目
    'xml submodule|sm rm' 
  `;
  console.log(helpColor(example));
});

program.parse(process.argv);
