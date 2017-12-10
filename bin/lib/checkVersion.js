const chalk = require('chalk');
const semver = require('semver');
const {title, success, execSync, shell} = require('./utils');
const green = chalk.greenBright;

exports = module.exports = function checkVersion() {
  // const cmd = 'npm show nchannel-cli version --registry=https://registry.npmjs.org';
  // const pkJson = require('../../package.json');
  // const latestVersion = shell(cmd);
  // const localVersion = pkJson.version;

  // if (semver.lt(localVersion, latestVersion)) {
  //   console.log(chalk.yellow('  A newer version of nchannel-cli is available. please upgrade now'));
  //   console.log();
  //   console.log('  latest:    ' + chalk.green(latestVersion));
  //   console.log('  installed: ' + chalk.red(localVersion));
  //   console.log();
  //   title('正在升级 nchannel-cli');
  //   execSync('cnpm i -g nchannel-cli');
  // } else {
  //   title(green('已经是最新版本无需升级'));
  // }
  title('正在升级 nchannel-cli');
  execSync('npm i -g nchannel-cli@latest --registry=https://registry.npm.taobao.org')
};
