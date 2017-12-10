#!/usr/bin/env bash


checkAndInstall() {
    echo '检查'$1'是否已安装'
    if which $1
        then
            echo $1 '已安装'
         else
            echo '开始安装'$1'...'
            npm install -g $1 --registry=https://registry.npm.taobao.org
    fi
}


# 安装cnpm
    checkAndInstall 'cnpm'

# 安装n
    checkAndInstall 'n'

##检查node版本
    echo '检查node版本'
    nodeversion=$(node -v |tr -cd '[0-9]')
    echo 'node版本:' $nodeversion
    if (( $nodeversion >= 840 ))
        then
            echo '当前版本符合开发需要，无需升级'
        else
            echo '开始升级版本'
            n latest
     fi




