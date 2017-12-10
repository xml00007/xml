#!/usr/bin/env bash
# 解决方案
# 一条命令从私服删除所有@nirvana下的包
# 查找packages目录下的所有子目录（递归一级）将结果管道传输 给 sed 做字符串替换 组成命令"npm unpublish @nirvana/$dirname --force"
# 最后再利用管道传输给 sh 执行
# sed 命令参考 http://www.cnblogs.com/edwardlost/archive/2010/09/17/1829145.html
# find 命令参考 http://os.51cto.com/art/200908/141119_all.htm

# 方法一 查找包的文件夹名称 + 指定的scope名称 组合包名
# find packages -d 1 -type d | sed "s/packages\(.*\)/\npm unpublish $1\1 --force/" | sh

# 方法二 查找package.json 并取出 包名
find packages -maxdepth 2 -name package.json -exec sed -n '/\"name\"/p' {} \;| sed 's/\"\(.*\)\".*:.*\"\(.*\)\",/npm unpublish \2 --force/' | sh