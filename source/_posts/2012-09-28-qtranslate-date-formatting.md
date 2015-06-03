---
date: 2012-09-28
layout: post
title: qTranslate插件日期乱码的解决方案
categories: note
tags: [wordpress,plugin,php]
thread: 15
---

当我在Wordpress 3.4.2版本下安装了qTranslate插件之后，发帖时候的日期格式变成了乱码，没有被解析出来:

	Posted on %e de %B de %Y by Willin

翻看了外国一些论坛找到了一个解决方法:

<!-- more -->

编辑 qtranslate_utils.php, 从第 143 行中找到:

	$date_parameters[] = '#%#'; 	
	$strftime_parameters[] = '%%';

修改成:

	$date_parameters[] = '#%#';
	$strftime_parameters[] = '%';

插件设置里，依然采用第一个，date()模式，不要改成strftime()或其他什么的。

相关资源

* 官方论坛 <http://www.qianqin.de/qtranslate/forum/viewtopic.php?f=3&amp;t=1573&amp;p=5988#p5988> 包括了解决方案。

