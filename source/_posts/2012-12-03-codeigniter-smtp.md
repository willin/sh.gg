---
date: 2012-12-03
layout: post
title: CodeIgniter邮件SMTP发送响应超时配置解决方案
categories: note
tags: [php,codeigniter]
thread: 184
---

### 问题

本地环境配置QQ企业邮箱的SMTP后，发送邮件的时候总是一直在等待等待，没有响应。用php函数发送的时候则是瞬间完成。在网上找了一下，发现了有类似的问题，提示为：

**Fatal error: Maximum execution time of 60 seconds exceeded in xxx **

<!-- more -->

即执行超时。是由换行符导致的错误。

### 解决方法

	$config['newline'] = "\r\n";
	$config['crlf'] = "\r\n"; 

将配置文件中加入以上两个配置属性。


英文论坛原文：[http://ellislab.com/forums/viewthread/88690/](http://ellislab.com/forums/viewthread/88690/)

> I concur with Soar. I was having that Max execution time probleme when trying to send email through SMTP using a Windows 2008 server with MailEnable. I then change my parameters and used my FC6 Unix server with Exam as the MTA and it worked right away.
> 
> EDIT: I added these 2 lines:

	$config['newline']="\r\n";
	$config['crlf']="\r\n"; 
 
> and it started working right away with my Windows server.