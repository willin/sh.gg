#!/bin/bash
rm -rf public || exit 0;
node_modules/hexo/bin/hexo generate
( cd public
 git init
 git config user.name "Travis-CI"
 git config user.email "travis@nodemeatspace.com"
 git add .
 git commit -m "Travis-CI Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages 
)
