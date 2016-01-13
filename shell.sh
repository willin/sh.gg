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
	$(git commit -m 'Post Auto Commit at ${DATE}')
}

build() {
	cd $DIR/../../bbs && NODE_ENV=debug $PM2 start $DIR/../../bbs/app.js -x --name bbs -e $DIR/../logs/bbs-err.log -o $DIR/../logs/bbs-out.log --watch --ignore-watch="test node_modules" --merge-logs
}

# stop app
clean() {
	$PM2 stop bbs
	$PM2 delete bbs
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
