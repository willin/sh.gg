---
date: 2012-12-11
layout: post
title: AJAX U Need 2 Know (AJAX常见误区整理)
categories: note
tags: [asp.net,jquery,ajax]
thread: 152
---

### CORRECT your BAD habits on AJAX development

为了更好的用户体验和系统性能。本项目所有AJAX示例代码基于jQuery 1.8.3。

<!-- more -->

#### 示例一：基于表单

不要直接使用button按钮的onclick点击事件。(那浏览器禁用JavaScript了的话怎么办呢？)

#### 示例二：含广告页面

当页面中含有Adsense等js广告的时候,最好的方法是用符合W3C规范的object容器包裹.

#### 示例三：PJAN

PJAN= HTML5 PushState + AJAX + JSON.

##### 系统截图

![](http://code.msdn.microsoft.com/site/view/file/71200/1/QQ%E6%88%AA%E5%9B%BE20121126141052.png)

![](http://code.msdn.microsoft.com/site/view/file/71201/1/QQ%E6%88%AA%E5%9B%BE20121126141108.png)

[![ajax-u-need2know-ads](http://w3log.qiniudn.com/wp-content/uploads/2012/11/ajax-u-need2know-ads-300x192.png "ajax-u-need2know-ads")](http://willin.org/wp-content/uploads/2012/11/ajax-u-need2know-ads.png)

演示项目环境：Visual Studio 2012  / .NET Framework 4.5 / MVC 4

纠正你的AJAX开发习惯。欢迎交流。

MSDN：[http://code.msdn.microsoft.com/AJAX-U-Need-2-KnowAJAX-ef2df43f](http://code.msdn.microsoft.com/AJAX-U-Need-2-KnowAJAX-ef2df43f)

Last Updated: 2012-12-11