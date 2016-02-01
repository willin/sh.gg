date: 2012-11-29
layout: post
title: Marathon Tool 汉化版，基于时间的SQL盲注工具
categories: hack
tags: [sql,security]
thread: 178
---

## 介绍

此为Marathon Tool 盲注工具汉化版，源码开源，原作者：Daniel Kachakil 、Chema Alonso、Alejandro Martín。

汉化：Willin Wang，仅供交流。

下载地址：[marathontool.zip](http://willin.org/wp-content/uploads/2012/11/marathontool.zip) (中/英两个版本)

<!-- more -->

![](http://code.msdn.microsoft.com/site/view/file/71397/1/QQ%E6%88%AA%E5%9B%BE20121129173537.png)

调试环境：

Visual Studio 2012， VB.net (4.5推荐)，无需数据库。

目标框架：.net framework 2.0。

源码下载：[http://code.msdn.microsoft.com/Marathon-Tool-c2e0f4a4](http://code.msdn.microsoft.com/Marathon-Tool-c2e0f4a4)

**项目介绍**

Marathon Tool 是一款基于时间的SQL注入工具。支持 Microsoft SQL Server, Microsoft Access, MySQL 或 Oracle Databases.

**支持特性:**

*   数据库摘要获取 SQL Server, Oracle, MySQL
*   数据获取 Microsoft Access 97/2000/2003/2007
*   参数注入 GET /  POST
*   SSL 支持
*   HTTP 代理
*   授权: Anonymous, Basic, Digest and NTLM
*   其他


**参考盲注资料**

*   [http://technet.microsoft.com/en-us/library/cc512676.aspx](http://technet.microsoft.com/en-us/library/cc512676.aspx)