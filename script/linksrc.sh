#!/usr/bin/env bash

cd packages/nirvana-sdk

# -d 表示删除

if [ $1 ] && [ $1 == '-d' ]; then
  echo "\033[31m删除符号链接"
  find . -maxdepth 1 -type l -exec rm -v {} \;
  echo "\033[0m"
else
  echo "\033[33m建立符号链接"
  find . -maxdepth 1 -type l -exec rm {} \;
  # 查找 src 目录下的所有目录，查找深度为 1 ， 通过正则表达式过滤后的结果在当前目录下建立符号链接
  find src -maxdepth 1 -type d -regex 'src/[com|ker|lib|pro|uti].*' -exec ln -nsv {} . \;
  echo "\033[0m"
fi
