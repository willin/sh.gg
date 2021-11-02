---
date: 2016-01-13 17:05:23
layout: post
title: Node.js版Hello Dolly
categories: dev
tags: [node.js, plugin]
toc: true
---

![version](https://badge.fury.io/js/hello-dolly.svg)
![downloads](https://img.shields.io/npm/dm/hello-dolly.svg)
![downloads](https://img.shields.io/npm/dt/hello-dolly.svg)

This is not just a plugin, it symbolizes the hope and enthusiasm of an entire generation summed up in two words sung most famously by Louis Armstrong.

<!-- more -->

## 如何使用

```
  npm install --save hello-dolly
```

示例:

```js
var hello_dolly = require("hello-dolly");

console.log(hello_dolly()); //English

console.log(hello_dolly("en")); //English

console.log(hello_dolly("zh-CN")); //Simplified-Chinese

console.log(hello_dolly("test")); //Others Default Language English
```

惟一参数 `语言`.

## 如何贡献

多语言支持需要. 请随意 `Fork`.

项目地址: [https://github.com/willin/node-hello-dolly](https://github.com/willin/node-hello-dolly)

![with-love](http://forthebadge.com/images/badges/built-with-love.svg)
