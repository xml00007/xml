#!/usr/bin/env bash

# 变量定义
package_name="__package__"
PROJECT="nirvana-channel-$1"

# 更新依赖包
#yarn --no-lockfile

# 目录清理
rm -rf $package_name
# 编译
./node_modules/.bin/babel deploys/develop-testing-$1 --out-dir $package_name

cp deploys/develop-testing-$1/package.json  $package_name/

# 打包tar 用于docker部署
#cp -R $package_name $project_name
#tar czf $project_name.tar.gz $project_name/*
#rm -R $project_name
#echo "打包完成"
