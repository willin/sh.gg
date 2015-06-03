---
date: 2014-07-04
layout: post
title: 卸载Mac默认的Xcode附带的git
categories: note
tags: git mac
thread: 800
---

这里说的优雅的卸载其实不是真正的卸载，而是不用动Xcode附带的git，通过用户~/.bashprofile的文件来优雅的完成。仅仅需要在~/.bashprofile文件后追加如下的导出变量代码即可:

<!-- more -->

`export GIT_HOME=/usr/local/git`

`export PATH=$GIT_HOME/bin:$PATH`

通git官网下载的mac安装包进行安装，git会被安装到

`/usr/local/git`

Xcode附带的git被安装到

`/usr/bin`

不必移动或者删除这里的git版本，仅仅需要更改一下用户下面的~/.bash_profile的文件即可优雅的解决git版本的问题.

如果您非要卸载旧的也可以通过下面的命令来完成

`sudo cd /usr/bin`

`sudo mkdir old-git`

`sudo mv git* old-git`

`ln -s /usr/local/git ./`

请关注。