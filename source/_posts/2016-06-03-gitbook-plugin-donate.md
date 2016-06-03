title: Gitbook捐赠打赏插件
date: 2016-06-03 13:53:51
layout: post
categories: dev
tags: [node.js,gitbook,plugin]
---

## Gitbook Donate Plugin

[![npm](https://img.shields.io/npm/v/gitbook-plugin-donate.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-donate) [![npm](https://img.shields.io/npm/dm/gitbook-plugin-donate.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-donate) [![npm](https://img.shields.io/npm/dt/gitbook-plugin-donate.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-donate)

Config:

```json
{
    "plugins": ["donate"],
    "pluginsConfig": {
        "donate": {
          "wechat": "例：/images/qr.png",
          "alipay": "http://blog.willin.wang/static/images/qr.png",
          "title": "默认空",
          "button": "默认值：Donate",
          "alipayText": "默认值：支付宝捐赠",
          "wechatText": "默认值：微信捐赠"
        }
    }
}
```

<!-- more -->

演示： <http://money.js.cool/>

这是一本最近打算写的书，中文名叫《百万富翁之路》。

## LICENSE

MIT

如果喜欢，千万别吝啬打赏~
