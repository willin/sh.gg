date: 2016-01-20 16:55:02
layout: post
title: js版Leetcode Single Number
categories: dev
tags: [algorithm,js]
---

## 问题

原题地址: [https://leetcode.com/problems/single-number/](https://leetcode.com/problems/single-number/)

> Given an array of integers, every element appears twice except for one. Find that single one.
>
>> Note:
>>
>> Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

<!-- more -->

问题描述:

> 给出一个奇数位的数组, 所有元素都出现了两次,除了其中的一个数,找出这个孤立的数.


例子:  `[1,2,3,2,1,4,4]`

输出应该为: `3`

要求：设计的算法是线性的复杂度，并且不要用额外的内存空间。

## 超时答案

### 超时答案一

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    for(var i=0;i<nums.length;i++){
        var result = nums.shift();
        if(nums.indexOf(result)===-1){
            return result;
        }
    }
};
```

### 超时答案二

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    if (nums.length === 1) return nums[0];

    for (var i=0;i<nums.length;i++) {
        if (i === nums.lastIndexOf(nums[i])) {
            return nums[i];
        }
    }
};
```

## 解题思路

异或运算的几个相关公式：

1. a ^ a = 0
2. a ^ b = b ^ a
3. a ^ b ^ c = a ^ (b ^ c) = (a ^ b) ^ c
4. d = a ^ b ^ c 可以推出 a = d ^ b ^ c
5. a ^ b ^ a = b
 
本题可以抽象成：int数组里有x1, x2 … xn（每个出现2次），和y（只出现一次），得出y的值。

由公式2可知，数组里面所有数异或的结果等于 x1^x1^x2^x2^…^xn^xn^y

由公式3可知，上式等于(x1^x1)^(x2^x2)^…^(xn^xn)^y

由公式1可知，上式等于(0)^(0)^…(0)^y = y
 
因此只需要将所有数字异或，就可得到结果。

## 通过答案

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    var result = 0;
    for(var i=0;i<nums.length;i++) {
        result ^= nums[i];
    }
    return result;
};
```

es6:

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = (nums) => nums.reduce((x, y) => x^y);
```

