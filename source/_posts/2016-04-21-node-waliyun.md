---
title: Node.js阿里云接口(Aliyun API)SDK
layout: post
date: 2016-04-21 00:32:44
categories: dev
tags: [node.js, api, sdk, aliyun]
toc: true
---

# WAliyun

[![npm](https://img.shields.io/npm/v/waliyun.svg?style=plastic)](https://npmjs.org/package/waliyun) [![npm](https://img.shields.io/npm/dm/waliyun.svg?style=plastic)](https://npmjs.org/package/waliyun)

> 比官方 SDK 更好用的阿里云 SDK。

Minimum, Flexible, Scalable.

支持 Lazy Require。

<!-- more -->

## 安装和使用

国际惯例：

```
npm install waliyun --save
```

公共参数：

```js
var options = {
  AccessKeyId: "xxxx-xxxx-xxxx-xxxx",
  AccessKeySecret: "xxxx-xxxx-xxxx-xxxx",
  // 选填，不同接口类型注意版本日期
  Version: "2014-05-26",
  // 选填
  SignatureMethod: "HMAC-SHA1",
  Format: "json",
  SignatureVersion: "1.0",
  // 每次请求都会自动重新生成
  SignatureNonce: Math.random(),
  Timestamp: new Date().toISOString(),
};
```

ES5:

```js
var WALIYUN = require("waliyun");
// 加载全部方法
var ecs = WALIYUN.ECS(options);
// 或加载某些方法
var ecs = WALIYUN.ECS(options, ["DescribeInstances", "DescribeInstanceStatus"]);
// 或加载某个方法
var ecs = WALIYUN.ECS(options, "DescribeInstances");
ecs
  .describeInstances({
    RegionId: "cn-hangzhou",
  })
  .then(function (instances) {
    // xxxx
  });
```

ES6:

```js
import { ECS } from "waliyun";
const ecs = ECS(options);
// Within Async Func
async () => {
  const instances = await ecs.describeInstances({
    RegionId: "cn-hangzhou",
  });
  // xxxx
};
```

## 已支持的接口

Github 主页上检查最新版本: <https://github.com/willin/waliyun>

### CDN

API 文档参考：

<https://help.aliyun.com/document_detail/cdn/api-reference/overview.html>

### 云服务器 ECS

API 文档参考：

<https://help.aliyun.com/document_detail/ecs/open-api/apisummary.html>

### 云监控 Metrics

API 文档参考：

<https://help.aliyun.com/document_detail/cms/API_References/New_Metric_OpenAPI_Reference/API_Guide.html>

### 访问控制 RAM

API 文档参考：

<https://help.aliyun.com/document_detail/ram/ram-api-reference/intro/intro.html>

### 云数据库 RDS

API 文档参考：

<https://help.aliyun.com/document_detail/rds/OpenAPI-manual/RDS-OpenAPI-Invoke/API-catalog.html>

### 访问控制 STS

API 文档参考：

<https://help.aliyun.com/document_detail/ram/sts-api-reference/intro.html>
