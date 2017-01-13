title: 前端阅读体验优化-GitBook自动换肤
date: 2017-01-13 10:33:18
layout: post
categories: dev
tags: [js,gitbook,plugin,front-end]
---

新键盘入手，HHKB Professional 2 Type-S

![hhkb](https://cloud.githubusercontent.com/assets/1890238/21916492/0384a92c-d97c-11e6-8a0d-8b4cf6e1b96d.jpg)

通过侦听显示器亮度，或根据当地时间，实现自动换肤换色。
<!-- more -->

## DeviceLightEvent

```js
window.addEventListener('devicelight', function(e) {
  var lux = e.value;

  if(lux < 50) {
    document.body.className = 'dim';
  }
  if(lux >= 50 && lux <= 1000) {
    document.body.className = 'normal';
  }
  if(lux > 1000)  {
    document.body.className = 'bright';
  } 
});
```

### 兼容性

<https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceLightEvent>

桌面：

* Firefox 22.0 (Gecko 22.0) (Mac OS X only)

移动：

* Firefox 15.0 (Gecko 15.0)

## CSS Media-Query

```css
@media (light-level: dim) {
  /* 暗光环境 */
}

@media (light-level: normal) {
  /* 正常光环境 */
}

@media (light-level: washed) {
  /* 明亮环境 */
}
```

### 兼容性

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/light-level>

Working Draft，暂无支持

## 根据时间

示例：

暗光环境： [20,21,22,23,0,1,2,3,4,5]
正常环境： [6,7,8,17,18,19]
明亮环境： [9,10,11,12,13,14,15,16]

一般大概是这样，也可以根据地域和季节进行调整。

时间判断，加入class，GitBook插件源码： <https://github.com/willin/gitbook-plugin-autotheme>

查看演示： <https://leader.js.cool/>


