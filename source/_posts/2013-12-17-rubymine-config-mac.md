date: 2013-12-17
layout: post
title: RubyMine for Mac最佳内存设置
categories: note
tags: [mac,ruby,ide]
thread: 669
---

![rubymine6](http://w3log.qiniudn.com/wp-content/uploads/2013/12/rubymine.png)

对于RubyMine 6.0 往后的版本，设置文件在：

> /Applications/RubyMine/bin/idea.vmoptions

<!-- more -->

如果没有的话，可以手动新建一个。

我的电脑配置是： MacBook Pro Retina 2.6 GHz Intel Core i7 + 16 GB 内存 + 1TB SSD，所以我将设置文件改为：

> -Xms128m
> 
> -Xmx2048m
> 
> -XX:MaxPermSize=500m
> 
> -XX:ReservedCodeCacheSize=128m
> 
> -XX:+UseCodeCacheFlushing
> 
> -XX:+UseCompressedOops

对于 RubyMine 5.4 和之前的版本配置文件名为： rubymine.vmoptions.

## P.S. 其他情况下会出现：

![rubymin-config](http://w3log.qiniudn.com/wp-content/uploads/2013/12/rubymin-config.png)

来源参考国外博客:  [http://coderberry.me/blog/2013/02/20/rubymine-memory-config-vmoptions/](http://coderberry.me/blog/2013/02/20/rubymine-memory-config-vmoptions/)