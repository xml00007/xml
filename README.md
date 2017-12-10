<<<<<<< HEAD
# xml
常用命令的命令行工具
=======
# 安装

```bash
cnpm i -g nchannel-cli
```

# 命令行界面

- 显示命令说明信息

```bash
nci -h
```

```
  Envirment:
    nodejs >= 8.4.0    webstorm >= 2017.2
  
  Usage: nci <command>
      
    尖括号(例如 <cmd>) 代表必须输入，方括号 (例如：[env]) 代表可选输入

  Options:
    -V, --version  output the version number
    -h, --help     output usage information

  Commands:
    bootstrap|bs                                   安装依赖并自动链接私有包, -例如：nci bootstrap 或 nci bs
    build [clean|c]                                执行或清理babel编译, -例如：nci build 或 nci build clean
    config|cfg [set|unset] [key-path] [key-value]  JSON风格全局配置 -例如:  "nci cfg set scope @nivana" 配置 scope 为 @nirvana
    clean|c                                        清理项目, -例如：nci clean 或 nci c
    docker|dk <build|run>                          生成并发布docker镜像, 例如：构建镜像 nci dk build，测试镜像 nci dk run
    dev [service-name]                             本地开发命令，-例如：nci dev kaniu
    deploy|dep [service-name]                      部署到测试环境 10.10.232.242
    link                                           重新链接私有包, -例如：nci link
    lint                                           ESLint代码规范检查，-例如：nci lint
    package|pkg <add|rm> [package-name]            添加或删除一个私有包,未指定前辍将默认添加 @nirvana 前辍
    project|pjt <add|upgrade> [project-name]       升级工程，框架发生重大变化时执行
    publish|p [pub|nppub]                          发布到私服，-例如：nci publish pub 或 nppub
    submodule|sm <add|rm> <git-repo-url>           添加或删除子项目，基于 "git submodule" 实现
    test|t                                         运行单元测试，-例如：nci test 或 nci t
    update|up                                      更新并链接所有子项目 -例如：nci update 或 nci up
    checkVersion|check                             检查最新版本并自动升级
    help|h                                         显示帮助

  Example:
  
    升级工程
    nci project upgrade 简写 nci pjt up
    
    添加子项目
    nci submodule|sm add http://gitlab.puhuitech.cn/nirvana-dev/nchannel/nchannel-core.git
    nci submodule|sm add http://gitlab.puhuitech.cn/nirvana-dev/nchannel/nchannel-openapi.git
    
    删除指定名称的子项目
    nci submodule|sm rm dependency/nchannel-core 
    
    删除所有子项目
    nci submodule|sm rm 
```

# 配置

> 配置文件路径为： ~/.ncirc.json

```json
{ 
  "scope": "@nirvana",
  "tpub": "test-env-npm-registry-url",
  "pub": "paas-prod-env-npm-registry-url",
  "nppub": "paas-test-env-npm-registry-url",
  "registryUser": "your-npm-user",
  "registryPass": "your-npm-password",
  "registryEmail": "your-npm-email",
  "dockerHost": "company-private-docker-mirror-host",
  "dockerGroup": "your-docker-group",
  "baseImage": "harbor.finupgroup.com/nchannel/phnode:8",
  "dockerUser": "your-docker-user",
  "dockerPass": "your-docker-password",
  "sshHost": "test-server-host",
  "sshPort": "test-server-port",
  "sshUser": "test-server-ssh-user",
  "sshPass": "test-server-ssh-pass"
 }
 
```

# 用法说明

- 升级开发项目,找回自动提醒功能

> 项目升级，通过 git submodule 子模块方式在当前项目下引入依赖项目 `nchannel-core`, 保存在当前项目根目录下的 `dependency` 目录，
 并自动将 `dependency/packages` 下的所有包 `link` 到 `node_modules`

```bash
# 请在开发项目下执行 如 'nchannel-kaniu', 'nchannel-openapi'

nci project upgrade #  upgrade 可简写为 up
# 或
nci-project upgrade #  upgrade 可简写为 up
```

- 更新依赖项目 `nchannel-core`

> nci update 执行 `git submodule update --remote --init`,  并自动 `link` 到 `node_module`

```bash
nci update # update 命令简写 nci up
# 或
nci-update
```

- 安装项目依赖

> 安装依赖包并自动 `link` 到 `node_module`

```bash
nci bootstrap # bootstrap 可简写为 bs
```
>>>>>>> # 第一次提交
