#!/usr/bin

test -z `which docker` && echo "docker不存在，请先安装 docker" 1>&2 && exit 1

registry=$2
group=$3
baseImage=$4
npm_registry=$5
scope=$6
optionTag=$7
tag=`date +%Y-%m-%d-%H-%M-%S`
name=$(basename `pwd`)

imageLatestTag=$registry/$group/$name:latest
imageTimeTag=$registry/$group/$name:$tag
imageOptionTag=$registry/$group/$name:$optionTag

# 重写Dockerfile
echoDockerfile() {
 echo "FROM $baseImage" > Dockerfile
 echo "COPY . /data/$name/" >> Dockerfile
 echo "WORKDIR /data/$name/" >> Dockerfile
 echo "CMD [\"sh\", \"run.sh\"]" >> Dockerfile
}

# 下载依赖包
installPackage() {
  echo "$scope:registry=$npm_registry" > .npmrc
  echo "registry=https://registry.npm.taobao.org/"  >> .npmrc
  yarn --no-lockfile
}

# 上传镜像
uploadImage() {
  if [ -z $optionTag ]; then
    docker push $imageTimeTag
    docker push $imageLatestTag
  else
    docker push $imageOptionTag
  fi
}

# 清理项目
clean() {
  rm -rf *.tar.gz packageFinished .npmrc yarn-* node_modules yarn.lock
}
# 创建镜像
buildImage() {
  # 清理工程
  clean &&
  # 拉取最新代码
  git pull
  # 下载依赖包
  installPackage
  # 重写Dockerfile
  echoDockerfile
  # 构建镜像
  if [ -z "$optionTag" ] ; then
    echo $imageTimeTag
    docker build -t $imageTimeTag -t $imageLatestTag . &&
    echo $imageTimeTag > .dockrc &&
    # 上传镜像
    uploadImage
  else
    echo $imageOptionTag
    docker build -t $imageOptionTag . &&
    # 输出镜像地址
    echo $imageOptionTag > .dockrc &&
    # 上传镜像
    uploadImage
  fi
}
# 运行镜像
run() {
  imageName=`cat ./.dockrc`
  docker run -it --rm  -e env=test -e PORT0=9000 -p 9000:9000  $imageName
}

if [ $1 ] && [ $1 == "run" ]; then
   run
fi

if [ $1 ] && [ $1 == "build" ]; then
   buildImage
fi