---
title: 优雅地使用平板进行远程OS X编码开发
date: 2017-05-20 10:33:18
layout: post
categories: dev
tags: [mac,suggestion,tech]
---

> 没有OS X平板(iPad是ios系统)这个问题一直困扰着我.

{% cq %} 
正所谓,工欲善其事必先利其器. 
{% endcq %}

## 准备

- 一台平板(iPad/Surface或者其他)
- 一台苹果(Mac Mini/Macbook Pro或者其他)
- 一台路由器(需支持动态域名解析,如花生壳),后续我会完善动态域名解析功能

<!-- more -->

## 配置电源选项

![power](https://user-images.githubusercontent.com/1890238/27117064-6ca0b32a-509a-11e7-98fb-db4fa50eeb04.png)

根据上图开启 `唤醒`, 关闭 `睡眠`

```bash
sudo pmset -a autopoweroff 0
sudo pmset -a standby 0 
```

## 配置路由器

### IP地址分配

通过mac地址进行绑定,分配固定ip.

一般是在:

> 路由设置 -> 上网设置 -> 静态IP

![ip](https://cloud.githubusercontent.com/assets/1890238/26823551/99485ffa-4ae0-11e7-8212-e22896fd8adf.jpg)

### 端口转发或DMZ

如果路由支持DMZ主机功能,则不需要进行端口转发.直接将本机设置DMZ主机即可.

![port-forward](https://cloud.githubusercontent.com/assets/1890238/26823706/2e63f1bc-4ae1-11e7-896e-df145d8b4400.jpg)

端口转发的话,设置 `1234` 端口(参考下文js代码).

## 配置动态域名解析

### 方法1: 路由器+花生壳

注册花生壳域名

![oray](https://cloud.githubusercontent.com/assets/1890238/26823557/a37f3f5c-4ae0-11e7-8d53-14a591190348.png)

路由器配置花生壳

很简单,填入用户名密码和域名.

注意下面的两个时间我填的都是 10 分钟.

![router-oray](https://cloud.githubusercontent.com/assets/1890238/26823629/de357cc4-4ae0-11e7-9e23-5652f2a6aa48.jpg)

### 方法2: DNS定时轮询

{% cq %} 
本章节待完善
{% endcq %}

参考资料:

- DNSPod: <https://github.com/willin/wqcloud>


## 设置唤醒应用

```js
const http = require('http');
const { execSync } = require('child_process');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'application/json' });
  try {
    execSync('caffeinate -u -t 1');
    res.end('{status:1}');
  }
  catch (e) {
    res.end('{status:0}');
  }
}).listen(1234);
```

假如你的动态解析域名是 `willin.wang`

你只要通过浏览器访问下面的地址即可进行唤醒操作.

```
http://willin.wang:1234/
```

