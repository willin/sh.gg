---
date: 2015-05-15
layout: post
title: js版Leetcode第一难题wildcard-matching
categories: dev
tags: [js, algorithm]
thread: 807
toc: true
---

## 问题

原题地址： [https://leetcode.com/problems/wildcard-matching/](https://leetcode.com/problems/wildcard-matching/)

Implement wildcard pattern matching with support for '?' and '\*'.

'?' Matches any single character.

'\*' Matches any sequence of characters (including the empty sequence).

The matching should cover the entire input string (not partial).

The function prototype should be:

bool isMatch(const char \*s, const char \*p)

<!-- more -->

### Some examples:

> isMatch("aa","a") → false
>
> isMatch("aa","aa") → true
>
> isMatch("aaa","aa") → false
>
> isMatch("aa", "\*") → true
>
> isMatch("aa", "a\*") → true
>
> isMatch("ab", "?\*") → true
>
> isMatch("aab", "c*a*b") → false

## Timeout 版 结果

```js
//Timeout Version:
var isMatch = function (s, p) {
  p = p.replace(/\?/g, ".").replace(/\*+/g, ".*");
  var reg = new RegExp("^" + p + "$");
  return reg.test(s);
};
```

正则表达式的效率还是很低的.

## JS 版 通过结果

```js
/**
 * @param {string} str
 * @param {string} pattern
 * @return {boolean}
 */
var isMatch = function (str, pattern) {
  var s = 0,
    p = 0,
    match = 0,
    index = -1;
  while (s < str.length) {
    if (
      p < pattern.length &&
      (pattern.charAt(p) == "?" || str.charAt(s) === pattern.charAt(p))
    ) {
      s++;
      p++;
    } else if (p < pattern.length && pattern.charAt(p) === "*") {
      index = p;
      match = s;
      p++;
    } else if (index != -1) {
      p = index + 1;
      match++;
      s = match;
    } else {
      return false;
    }
  }
  while (p < pattern.length && pattern.charAt(p) === "*") {
    p++;
  }
  return p === pattern.length;
};
```
