---
date: 2012-12-27
layout: post
title: 保护你的WordPress，隐藏真实评论Meta信息
categories: hack
tags: [wordpress, php, security]
thread: 210
toc: true
---

### 隐藏 Wordpress 评论的真实 ip 和 user agent 信息

![hide-info-wordpress-comment](http://w3log.qiniudn.com/wp-content/uploads/2012/12/hide-info-wordpress-comment.png)

<!-- more -->

#### 代码位置:

wp_includes/comment.php

#### 所属方法:

wp_new_comment

#### 行号:

1390-1391

#### 源代码

```php
	$commentdata['comment_author_IP'] = preg_replace( '/[^0-9a-fA-F:., ]/', '',$_SERVER['REMOTE_ADDR'] );
	$commentdata['comment_agent'] = substr($_SERVER['HTTP_USER_AGENT'], 0, 254);
```

#### 之后添加

```php
if($commentdata['user_id']==1){  //一般情况admin的id是1，情侣博客加个或等于2即可
 	$commentdata['comment_author_IP'] = '1.1.1.1'; //我会告诉你我填的什么吗
	$commentdata['comment_agent'] = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1';//我会告诉你我填的什么吗
}
```
