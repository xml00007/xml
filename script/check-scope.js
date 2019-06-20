const fs = require('fs');
const chalk = require('chalk');
const log = console.log;
const packages = 'packages';
const Path = require('path');

function warning(...arg) {
  console.log(chalk.red(...arg));
}

let myModules = fs.readdirSync(packages).filter(name => name !== '.DS_Store');

myModules = myModules.filter(
  item => fs.existsSync(`${packages}/${item}/package.json`));

const packageJsons = myModules.map(
  (item) => {
    const packagePath = `${packages}/${item}/package.json`;
    return require(Path.join(__dirname, '../', packagePath));
  });

let invalidNames = packageJsons.filter(item => {
  return item.name.substr(0, 8) === '@nirvana';
});

// 输出
if (invalidNames.length) {
  warning('检测到不合法的包名称: 正确包名格式为 @nirvana/pacakge-name');
  warning(invalidNames.map(item => item.name).join('\n'));
}

