title: Hexo文章计数插件WordCount
date: 2015-06-17 17:53:51
categories: dev
tags: [node.js,hexo,plugin]
---

灵感来自[简书](http://www.jianshu.com/users/6c72e78080ff)。

字数统计的结果跟简书有差异，主要是由于本插件只统计了中文字数和英文单词数，所以结果会比简书统计的字数略少一些。

特别适合文字爱好者，比如我。

<!-- more -->

[![npm](https://img.shields.io/npm/dm/hexo-wordcount.svg?style=plastic)](https://npmjs.org/package/hexo-wordcount) 

项目地址： [https://npmjs.org/package/hexo-wordcount](https://npmjs.org/package/hexo-wordcount)

## 安装和使用

### 安装

```
npm i --save hexo-wordcount
```

### 使用

修改`Themes`模板文件，在`Post`文章模板区域加入：

```
  <span class="post-count">{{ wordcount(post.content) }}</span>
```

即可统计单篇文章的字数。

```
	<span class="post-count">{{ totalcount(site) }}</span>
```

上面这句是统计总字数的，可以放到`Footer`或其他位置里。

---

A Word Count plugin for Hexo.

## Installation and Usage

### Install

```
npm install hexo-wordcount --save
```

### Post Count:

```
   <span class="post-count">{{ wordcount(post.content) }}</span>
```

### Total Count:


```
   <span class="post-count">{{ totalcount(site) }}</span>
```

## LICENSE

MIT