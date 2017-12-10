/**
 * Created by Arthur on 2017-12-10.
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = console.log;
const _ = require('lodash');
const SSH = require('simple-ssh');
let SCP = require('scp2');
const existsSync = fs.existsSync;

// cli路径
const cliPathResolve = (filename) => path.join(__dirname, '../../', filename);
// 脚本路径
const scriptResolve = (filename) => path.join(__dirname, '../../script', filename);
// 模板路径
const templateResolve = (filename) => path.join(__dirname, '../../template', filename);
// 当前路径
const projectDir = (filename) => filename ? process.cwd() + '/' + filename : process.cwd();
// packages路径
const packageDir = (packageName) => path.join(process.cwd(), 'packages', packageName);
// 分割线
const hr = () => log(chalk.gray('--------------------------------------------------------'));
// 成功日志
const success = (msg) => log(chalk.green(msg));
// 格式化json
const beautyJson = (json) => JSON.stringify(json, null, 2);

/**
 * 执行shell 不返回结果
 * @param cmd
 * @return {*}
 */
const execOption = {encoding: 'utf-8', stdio: ['inherit', 'inherit', 'inherit']};
const execSync = (cmd) => require('child_process').execSync(cmd, execOption);

/**
 * 执行shell 并返回结果
 * @param cmd
 */
const shell = (cmd) => require('child_process').execSync(cmd, {encoding: 'utf-8'});

/**
 * 执行shell脚本
 * @param {string} shellName - shell 脚本名称
 * @param {Array} args - 参数数组类型
 */
const sh = (shellName, args = []) => execSync(`sh ${scriptResolve(shellName)} ${args.join(' ')}`);

/**
 * 带分割线的标题
 * @param text
 */
const title = (text) => {
  hr();
  log(chalk.red(text));
  hr();
};

/**
 * 帮助信息着色
 * @param template
 * @return {string|XML}
 */
const helpColor = (template) => {
  return chalk.cyanBright(
      template
          .replace(/\n\n/g, '\n')
          .replace(/(\||\<|\>|\[|\]|=)/g, chalk.white('$1'))
          .replace(/('.*?')/g, chalk.cyanBright('$1'))
          .replace(/(# .*)/g, chalk.white('$1'))
          .replace(/('|# )/g, '')
          .replace(/(Example:|Commands:|Options:|Usage:|Envirment:)/g, chalk.greenBright('$1')));
};

/**
 * @type {{path: *, readConfig: (function()), setConfig: (function()), ls: (function()), set: (function(*=, *=)), unset: (function())}}
 */
const nciConfig = {
  path: {
    projectPath: projectDir('.xmlrc.json'),
    globalPath: path.join(process.env.HOME, '.xmlrc.json'),
  },
  readConfig() {
    const {projectPath, globalPath} = this.path;
    const globalConfig = existsSync(globalPath) ? require(globalPath) : {};
    const projectConfig = existsSync(projectPath) ? require(projectPath) : {};
    return Object.assign({}, globalConfig, projectConfig);
  },
  /**
   * 设置属性
   * @param keyPath
   * @param val
   */
  set(keyPath, val) {
    let config = this.readConfig();
    _.set(config, keyPath, val);
    fs.writeFileSync(this.path.globalPath, beautyJson(config));
    log(this.readConfig());
  },
  /**
   * 获取属性
   * @param keyPath
   * @return {*}
   */
  get(keyPath) {
    let config = this.readConfig();
    return _.get(config, keyPath, null);
  },
  /**
   * 删除属性
   * @param keyPath
   */
  unset(keyPath) {
    let config = this.readConfig();
    _.unset(config, keyPath);
    fs.writeFileSync(this.path, beautyJson(config));
    log(this.readConfig());
  },
};

/**
 * 是否开发项目
 * @return {bool}
 */
const isLernaDir = () => existsSync(projectDir('lerna.json'));

/**
 * 是否部署项目
 * @return {bool}
 */
const isDockerDir = () => existsSync(projectDir('.dockerignore')) || existsSync(projectDir('.Dockerfile'));

/**
 * 目录检测 是否包含lerna相关文件
 */
const mustBeLerna = () => {
  if (!isLernaDir()) {
    title('请在开发项目下执行');
    process.exit(1);
  }
};

/**
 * 目录检测 是否包含docker相关文件
 */
const mustBeDocker = () => {
  if (!isDockerDir()) {
    title('请在部署项目下执行');
    process.exit(1);
  }
};

/**
 * 远程执行命令
 * @param cmd
 * @param config
 */
function excuteRemoteShell(cmd, config) {
  return new Promise((resolve, reject) => {
    const {sshHost, sshPort, sshUser, sshPass} = nciConfig.readConfig();
    const sshConfig = config || {
      host: sshHost,
      port: sshPort,
      user: sshUser,
      pass: sshPass,
    };

    const ssh = new SSH(sshConfig);
    ssh
        .exec(cmd, {out: console.log.bind(console)})
        .on('close', () => resolve('ok'))
        .start()
    ;
  });
}

/**
 *
 * @param srcDir
 * @param remoteDir
 * @return {Promise}
 */
function scp(srcDir, remoteDir) {
  return new Promise((resolve) => {
    const {sshHost, sshPort, sshUser, sshPass} = nciConfig.readConfig();

    // 远程目录
    const scpStr = sshUser + ':' + sshPass + '@' + sshHost + ':' + sshPort;

    // 开始上传
    SCP.scp(srcDir, `${scpStr}:${remoteDir}`, function(err) {
      if (err) {
        log('上传package失败');
        process.exit(1);
      }
      resolve('ok');
    });
  });
}

/**
 * 检测包是否存在
 * @param packageName
 * @return {bool}
 */
function packageExist(packageName) {
  return existsSync(packageDir(packageName));
}

/**
 * 全局安装lerna
 */
function installLernaGlobal() {
  title('全局安装 lerna');
  execSync(`cnpm i -g ${cliPathResolve('lerna-2.2.0.tgz')}`);
}

module.exports = {
  cliPathResolve,
  scriptResolve,
  projectDir,
  beautyJson,
  execSync,
  shell,
  title,
  success,
  helpColor,
  sh,
  nciConfig,
  log,
  isLernaDir,
  isDockerDir,
  mustBeDocker,
  mustBeLerna,
  scp,
  excuteRemoteShell,
  packageExist,
  packageDir,
  templateResolve,
  installLernaGlobal,
};
