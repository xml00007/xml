/**
 * Created by 高乐天 on 17/5/19.
 */

const fs = require('fs');
const path = require('path');
const rootPath = process.cwd();
const log = console.log;

const packages = [
  'packages',
  'dependency',
  'submodule',
];
const scope = 'node_modules/@nirvana';

// 返回相对路径
const relativePath = (dir) => {
  const from = path.normalize(rootPath + '/' + scope);
  const to = dir;
  return path.relative(from, to);
};

function shell(cmd) {
  return require('child_process').execSync(cmd, {encoding: 'utf-8'});
}

function linkSync(packages) {
  // delete @nirvana
  shell(`rm -rf ${scope}`);
  // recreate @nirvana dir
  shell(`mkdir -p ${scope}`);

  packages = packages
      .map(item => path.normalize(rootPath + '/' + item))
      .filter(item => fs.existsSync(item));

  const jsonPaths = shell(`find ${packages.join(' ')} -name package.json -type f`)
      .trim().split('\n')
      .filter(item => {
        let name = require(item).name;
        return name[0] === '@';
      });

  jsonPaths.forEach(jsonPath => {
    const dirPath = path.dirname(jsonPath);
    const srcPath = `${dirPath}/src`;
    const dirName = path.basename(dirPath);

    const linkPath = path.normalize(`${scope}/${dirName}`);
    const target = fs.existsSync(srcPath) ? `${relativePath(srcPath)}` : `${relativePath(dirPath)}`;

    fs.symlinkSync(target, linkPath, 'dir');

    log(`${linkPath} --> ${target}`);
  });
}

linkSync(packages);
