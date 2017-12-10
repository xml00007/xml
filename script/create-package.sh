#!/usr/bin/env bash

#接收外部传入参数
create_package_name=$1

#校验目录名称是否存在
if [ -z $create_package_name ]; then
	echo "create_package_name IS NOT EXISTS !!!"
	echo "The Commad Like This 'sh script/build-project.sh nirvana-plugin-common-service'"
	exit 0
fi

#检测根目录是否存在
echo "文件检测中"
package_dir="/packages"
package_path=`pwd`${package_dir}

#创建包目录根地址
package_root_path=${package_path}/${create_package_name}

if [ ! -d ${package_dir} ]; then
  mkdir ${package_root_path}
  echo "目录创建成功"
else
  echo ${package_path}"不存在"
fi

#进入创建的工程目录
cd ${package_root_path}

#创建 README.md
touch "README.md"

#快速init npm
npm init -y

#修改 package.json-name
package_prefix="\@nirvana\/"
sed -i '' 's/'${create_package_name}/${package_prefix}${create_package_name}'/g' package.json
sed -i '' 's/  "main": "rong360.js",/  "main": "lib\/rong360.js",/g' package.json
sed -i '' 's/  "description": "",/  "description": '\"${create_package_name}\"',/g' package.json
sed -i '' 's/  "author": "",/  "author": "FelixChen",/g' package.json

#创建 .npmignore
npm_ignore_name=".npmignore"
echo "src\n.npmignore\n__test__\nnode_modules\nyarn.lock\n" > $npm_ignore_name

#创建src目录
mkdir src

#进入src创建controller | routes | service | index.js
cd src
mkdir controller && mkdir routes && mkdir service && touch "index.js"

#最后分别进入文件夹创建index.js
cd controller && touch "index.js" && cd ../
cd routes && touch "index.js" && cd ../
cd service && touch "index.js" && cd ../
