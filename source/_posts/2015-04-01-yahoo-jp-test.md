---
date: 2015-04-01
layout: post
title: 日本雅虎程序员跳槽程序测试问题
categories: dev
tags: [js,node.js, algorithm]
thread: 803
---


一救援机器人有三种跳跃模式，可分别跳跃1m，2m，3m的距离，请用程序实现该机器人行进n米路程时可用的跳跃方式。

程序语言不限，当距离n值足够大时，程序执行时间尽量小。

例：当距离为4米时，输出结果有7种：

	1m,1m,1m,1m
	1m,1m,2m
	1m,2m,1m
	1m,3m
	2m,1m,1m
	2m,2m
	3m,1m

<!-- more -->

### 递归

首先想到的,但性能不是很理想,想先算个1000m试试,结果程序直接崩掉了. 不得已换成了35m:

```js
var calc = function (dist) {
	'use strict';
	switch (dist) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 4;
		default:
			return (calc(dist - 1) + calc(dist - 2) + calc(dist - 3));
	}
	return 0;
};

var start = new Date().getTime() / 1000;
var result = calc(35);
var end = new Date().getTime() / 1000;
console.log(35, result, (end - start).toFixed(3) + 's');
//35 1132436852 '3.525s'
```

### 循环

直接采用递归的话会有很多重复的计算,比如在distance=7的时候，会有1+1+1+steps(4)，1+2+steps(4)，3+steps(4)，所以step(4)会被重复计算多次.

然后是优化,明显快了很多,1000m都是在1ms内完成.

```js
var calc2 = function (dist) {
	'use strict';
	let steps = [0, 1, 2, 4];
	for (let i = 4; i <= dist; i++) {
		steps[i] = steps[i - 1] + steps[i - 2] + steps[i - 3];
	}
	return steps[dist];
};

var start = new Date().getTime() / 1000;
var result = calc2(1000);
var end = new Date().getTime() / 1000;
console.log(1000, result, (end - start).toFixed(3) + 's');
//1000 2.7588428077664853e+264 '0.001s'
```

