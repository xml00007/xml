#!/usr/bin/env bash

userhome="~"
prefpath="${userhome}/Library/Preferences"
webstormpath=""
tempname="templates"
tempfile="NirvanaNodeSdk.xml"

# 检测本机是否已安装WebStorm
echo "正在检查本机WebStorm配置, 请稍候..."
for filename in `ls $prefpath`; do
    subpath=$prefpath"/"$filename
    webstorm=`echo $filename | grep "^WebStorm" | wc -l`
	if [ $webstorm -eq 1 ] && [ -d $subpath ]; then
		webstormpath=$subpath; break
	fi
done
if [ -z $webstormpath ]; then
	echo "本机未安装WebStorm"
	exit 0
fi

# 创建模板目录
targetpath=$webstormpath"/"$tempname
if [ ! -d $targetpath ]; then
	mkdir $targetpath
fi

# 拷贝模板文件
echo "正在配置模板文件, 请稍候..."
cp $tempfile $targetpath

# 检查模板文件是否配置成功
targettempfile=$targetpath"/"$tempfile
if [ -f $targettempfile ]; then
	echo "模板文件配置成功, 重启Webstorm后生效"
else
	echo "模板文件配置失败"
fi
