---
title: 愉快地使用 ElementoryOS 5 玩耍
category: note
date:  2018-09-24 11:58:30 +8
tags: [unix]
toc: true
---



## 双系统的安装

首先，由于 Windows 10 安装分区的时候，占用了3个主分区（MBR、Recovery和系统），所以不能使用 Legacy + MBR 的方式进行引导，因为 MBR 只能有 4 个主分区。



那么，就需要将磁盘改为 GPT。然后通过 UEFI 进行引导。但试了很多种方法，无法做出 UEFI 引导的 Windows 10 安装U盘（因为有一个 4.1GB的 install.wim 文件，无法使用 FAT32 格式，而我测试用的 DELL 台式机不支持 NTFS 格式的 UEFI引导），所以制作一个 “微PE" 的 U盘进行安装。

<!-- more -->

注意： 市面上的这种 PE 工具，内置了 N 多垃圾软件，安装完系统后自动安装。



BIOS 设置：



- 关闭 Secure Boot
- 关闭 Legacy 引导，使用 UEFI 引导



安装过程不再赘述，比较简单。



## Elementory



安装的版本为 Juno 5（Beta），基于Ubuntu 18.04。



### 缺陷



先说一些我发现的问题：



#### 1.多屏兼容性



我用了两块屏幕，一块28寸飞利浦4k屏（设置为默认屏幕），一块Dell 24英寸（旋转90°用于竖屏看代码）。但开机的时候始终以Dell的屏幕作为主屏（可能因为它的分辨率低？），且登录框无法自动或通过键盘获得焦点，所以我只能以自动登录来避免这个问题。



#### 2. 蓝牙兼容性



我一开始打算使用 罗技M558 鼠标的，但是每次重启无法自动连接，手动连接也有异常，每次都得重新配对。 后来换成了 罗技 Master 2s，但由于没有 Linux 驱动，所以比较难用。



#### 3. 没有 ALT 键



不确定是不是键盘的问题（HHKB Pro2 Type-S），ALT键位的实际作用有点类似 OS X系统下的 command （⌘）键。



#### 4. 状态栏图标

似乎是篡改过的，安装的软件都没有图标，比如 SS、输入法等，不太方便。而且状态栏的时间显示格式无法修改，显示为 `一，9月24 12:32` 这种格式。左上角始终为全局应用程序，不会变为当前应用的菜单。



### 软件推荐



- 钉钉： https://github.com/nashaofu/dingtalk
- 微信： https://github.com/geeeeeeeeek/electronic-wechat

- Konsole： 替代原生 Terminal
- Typora： 文本编辑
- ~~Conky~~： 系统监控，不兼容



### 问题：没有 Release 文件



```
  404  Not Found [IP: xxxxx]
正在读取软件包列表... 完成
E: 仓库 “xxxxxxxxx bionic Release” 没有 Release 文件。
N: 无法安全地用该源进行更新，所以默认禁用该源。
N: 参见 apt-secure(8) 手册以了解仓库创建和用户配置方面的细节。
```



解决方案：



打开 ` /etc/apt/sources.list.d/` 下对应的源配置。 将 `bionic` 改成该源有支持的。



对应版本：

- 18.04：`bionic`
- 17.10：`artful`
- 16.04：`xenial`
- 14.04：`trusty`

