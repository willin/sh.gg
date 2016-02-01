date: 2016-01-29 10:15:02
layout: post
title: Hexo文章阅读时长预计
categories: dev
tags: [node.js,hexo,plugin]
---

这是对[Hexo文章计数插件](http://blog.willin.wang/posts/2015/hexo-wordcount/)的一次更新.

效果可参考本站.

<!-- more -->

[![npm](https://img.shields.io/npm/dm/hexo-wordcount.svg)](https://npmjs.org/package/hexo-wordcount) 

[![npm](https://img.shields.io/npm/dt/hexo-wordcount.svg)](https://npmjs.org/package/hexo-wordcount) 

项目地址： [https://npmjs.org/package/hexo-wordcount](https://npmjs.org/package/hexo-wordcount)


## 安装和使用

### 安装

依然是:

```
npm i --save hexo-wordcount
```

### 升级

```
npm update hexo-wordcount --save
```

### 使用

修改主题模板,

SWIG语法:

```swig
<span class="post-count">{{ min2read(post.content) }}</span>
```

EJS语法:

```ejs
<span class="post-count"><%= min2read(post.content) %></span>
```

JADE语法:

```jade
 span.post-count= min2read(post.content) 
```

