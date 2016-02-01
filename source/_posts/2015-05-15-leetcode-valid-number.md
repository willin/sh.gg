date: 2015-05-15
layout: post
title: js版Leetcode接受率最低题valid-number
categories: dev
tags: [js, algorithm]
thread: 806
---

## 问题

原题地址： [https://leetcode.com/problems/valid-number/](https://leetcode.com/problems/valid-number/)

Validate if a given string is numeric.

### Some examples:

> "0" => true
> 
> " 0.1 " => true
> 
> "abc" => false
> 
> "1 a" => false
> 
> "2e10" => true
> 
> Note: It is intended for the problem statement to be ambiguous. You should gather all requirements up front before implementing one.

<!-- more -->

## JS一句话版 通过结果

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
	return /^\s*[+-]?(\.[0-9]+|[0-9]+(\.[0-9]*)?)(e[+-]?[0-9]+)?\s*$/.test(s);
};
```
