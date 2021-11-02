---
title: CloudFlare配置SSL及性能优化
date: 2016-12-15 09:41:32
layout: post
categories: note
tags: [domain, security, dns, ssl]
toc: true
---

## Crypto

### SSL

![Flexible](https://www.cloudflare.com/a/static/images/ssl/ssl.png)

#### 默认值：Flexible

适用于 Github、Coding.net 等之类的，没有采用 SSL 加密的源站。

#### Full / Full(Strict)

适用于源站也有 SSL 证书，Strict 模式校验证书。

<!-- more -->

### Automatic HTTPS Rewrites

默认关闭，可以打开。

自动将页面中的 HTTP 资源改用 HTTPS 方式请求。

## Firewall

Cloudflare 的验证码是最烦的东西了。

### Security Level

默认： Medium

可以改为 `Essentially Off`，减少验证码弹出。

### Challenge Passage

默认：半小时，可以改为一天。

## Speed

可以将 `javascript`、`css`、`html` 自动压缩全部勾选上。

## Page Rules

免费 3 条，只需要建一条即可将所有 HTTP 请求跳转到 HTTPS 上。

URL 如：

```
http://*.willin.wang/*
```

选择 `Always Use HTTPS` 选项，保存并发布。
