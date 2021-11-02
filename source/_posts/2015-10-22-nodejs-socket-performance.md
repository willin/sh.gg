---
title: Node.js跨应用TCP Socket连接通讯优化
layout: post
date: 2015-10-22 14:14:30
categories: design
tags: [logic, node.js, performance]
toc: true
---

## 应用场景描述

1. 有一个 Socket 应用,会有连接接入进来
2. 另外有一个测试工具应用,会向某一连接下发消息

## 原始方案一

![原始方案1](http://w3log.qiniudn.com/nodejs/1.jpg)

<!-- more -->

将测试工具的下行消息暂存到 Redis 缓存中.

每个接入的 Socket 分配一个 Timer 轮询,从缓存中读取消息下发.

### 问题

Socket 关闭后 Timer 的清除,有的可以有的不可以(原因不详),就导致了内存泄露,程序崩溃.

## 原始方案二

![原始方案2](http://w3log.qiniudn.com/nodejs/2.jpg)

依然用 Redis 缓存下行消息.

一个全局的 Timer 轮询,每个 Socket 连接放入堆栈,关闭就 pop 出去.

### 问题

具体问题描述不详,PM2 和 Alinode 监控内存和 CPU 占用都很低.

但就是在一段时间后,Socket 应用不再工作.

## 新方案

![新方案](http://w3log.qiniudn.com/nodejs/3.jpg)

不用 Redis 进行消息缓存,把测试工具也当成一个 Socket 连接.

当有下行消息,测试工具立即将消息发给 Socket 应用.

### 优点

1. 新方案中不再有轮询,消息实时性高
2. 不再有消息队列,节省服务器资源
