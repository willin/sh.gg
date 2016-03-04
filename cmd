#!/bin/bash
pushd $(dirname "${0}") > /dev/null
DIR=$(pwd -L)
popd > /dev/null
DATE=$(date +"%Y-%m-%d %H:%M")

PM2=`which pm2`
# get action
ACTION=$1

# help
usage() {
  echo "Usage: ./shell {commit|build|clean}"
  exit 1;
}

# start app
commit() {
	git add .
	git commit -m 'Post Auto Commit'
	git push
}

build() {
	hexo d -g
}

# stop app
clean() {
	rm -rf .deploy_git
	rm -rf public
}

case "$ACTION" in
  commit)
    commit
  ;;
  build)
    build
  ;;
  clean)
    clean
  ;;
  *)
    usage
  ;;
esac
