#!/usr/bin/env bash
# 将packages目录(递归2级子目录)下的pacakge.json 和 当前目录下的 lerna.json 恢复到最近一次提交的状态
git checkout HEAD -f -- $(find packages | grep package\.json) lerna.json
echo "\033[33m revert all package.json and lerna.json successful \033[0m"
