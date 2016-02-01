date: 2013-07-30
layout: post
title: Mac OS X 配置Ruby On Rails环境
categories: note
tags: [mac,ruby,sql]
thread: 346
---

环境为 OS X 10.8 + RVM Ruby + Mysql 5.5 + MAMP 2.1.4

### Mac OS X 80 端口莫名占用解决:

> sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist
如果哪天你想让它开机启动了,则将unload 改为 load 即可:
> sudo launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist

<!-- more -->

### Gem Sources 更新

> gem sources -r https://rubygems.org/
> 
> gem sources -a http://ruby.taobao.org/

### MAMP MySQL Client库安装

1.  下载MySQL 5.5.29源文件
2.  复制 lib 下文件到 /Applications/MAMP/Library/lib
3.  复制 include 下文件到 /Applications/MAMP/Library/include

安装mysql2

> sudo env ARCHFLAGS="-arch x86_64" gem install mysql2 -- --with-mysql-config=/Applications/MAMP/Library/bin/mysql_config

设置Lib路径

> export DYLD_LIBRARY_PATH="$DYLD_LIBRARY_PATH: /Applications/MAMP/Library/lib/"
&nbsp;

P.S.

MAMP MySQL Socket文件路径：

> /Applications/MAMP/tmp/mysql/mysql.sock

