title: MySQL跨表数据同步优化
layout: post
date: 2016-03-08 19:30:21
categories: dev
tags: [sql,performance]
---

## 应用场景描述

> 有两张设备在线状态表,其中一张记录心跳时间戳(`tb1`),另一张做异地数据同步(`tb2`).


## 原始方案


```
  > 查询tb1所有数据,循环(select all)
    >> 判断该条数据对应的设备是否依然在线
      >>> 若在线
        >>>> 查找tb2中是否存在该设备ID(select limit 1)
          >>>>> 若存在,更新(在线:true, update 1)
          >>>>> 若不存在,插入(在线:true, update 1)
      >>> 若不在线
        >>>> 查找tb2中是否存在该设备ID(select limit 1)
                >>>>> 若存在,更新(在线:false, insert 1)
                >>>>> 若不存在,插入(在线:false, insert 1)
        >>>> 删除tb1中已离线的记录(delete)
```

<!-- more -->


## 问题

遍历所有数据,频繁查询,效率低下.

## 优化要求

1. 避免遍历所有数据
2. 不能有太多SQL语句
3. 减少不必要的数据操作

## 设计思路

### 首先:考虑该场景涉及到的数据类型

1. 保持在线(无变化)
2. 新上线
3. 已下线

### 针对这三种类型数据的处理方式

1. 之前在线,现在依然在线,不做任何处理(***处理干什么?***)
2. 新上线,插入到tb2中
3. 已下线,从tb2中删除
4. 改良过程: tb1中历史在线数据没必要清除

## 解决方案

两条SQL语句搞定:

1.添加在线不在同步表里的设备

```sql
insert into tb2([fields]) select [fields],[data] from tb1 left join tb2 on tb1.`key` = tb2.`key` where tb1.updatedat > [时间戳] and tb1.location = [地域] and tb2.did is null;
```

2.删除同步表里当前不在线的设备

```sql
delete from tb2 where location=[地域] and `key` not in (select `key` from tb1 where updatedat > [时间戳] and location = [地域]);
```