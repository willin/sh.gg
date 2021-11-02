---
date: 2013-07-19
layout: post
title: Ubuntu 13.04优化设置
categories: note
tags: [unix, ubuntu]
thread: 333
toc: true
---

快捷命令：

选择窗体强制关闭进程：

> xkill

截图：

> gnome-screenshot -a

<!-- more -->

![2013-07-19](http://w3log.qiniudn.com/wp-content/uploads/2013/07/2013-07-19.png)

查询内存：

> free -m

设置自动清理内存：

> echo 3 &gt; /proc/sys/vm/drop_caches

---

官方说明：

Writing to this will cause the kernel to drop clean caches, dentries and inodes from memory, causing that memory to become free.
To free pagecache:

- echo 1 > /proc/sys/vm/drop_caches
  To free dentries and inodes:
- echo 2 > /proc/sys/vm/drop_caches
  To free pagecache, dentries and inodes:
- echo 3 > /proc/sys/vm/drop_caches
  As this is a non-destructive operation, and dirty objects are notfreeable, the user should run "sync" first in order to make sure allcached objects are freed.

This tunable was added in 2.6.16.
