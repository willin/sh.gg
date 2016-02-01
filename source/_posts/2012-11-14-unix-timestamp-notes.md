date: 2012-11-14
layout: post
title: Unix时间戳(Unix timestamp)学习笔记
categories: note
tags: [unix]
thread: 130
---

### 如何在不同编程语言中获取现在的Unix时间戳(Unix timestamp)？

<!-- more -->

<table>
<tbody>
<tr>
<td>Java</td>
<td>time</td>
</tr>
<tr>
<td>JavaScript</td>
<td>Math.round(new Date().getTime()/1000)

<span>getTime()返回数值的单位是毫秒</span></td>
</tr>
<tr>
<td>Microsoft .NET / C#</td>
<td>epoch = (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 10000000</td>
</tr>
<tr>
<td>MySQL</td>
<td>SELECT unix_timestamp(now())</td>
</tr>
<tr>
<td>Perl</td>
<td>time</td>
</tr>
<tr>
<td>PHP</td>
<td>time()</td>
</tr>
<tr>
<td>PostgreSQL</td>
<td>SELECT extract(epoch FROM now())</td>
</tr>
<tr>
<td>Python</td>
<td><span>先</span> import time <span>然后</span> time.time()</td>
</tr>
<tr>
<td>Ruby</td>
<td><span>获取Unix时间戳：</span>Time.now <span>或</span> Time.new

<span>显示Unix时间戳：</span>Time.now.to_i</td>
</tr>
<tr>
<td>SQL Server</td>
<td>SELECT DATEDIFF(s, '1970-01-01 00:00:00', GETUTCDATE())</td>
</tr>
<tr>
<td>Unix / Linux</td>
<td>date +%s</td>
</tr>
<tr>
<td>VBScript / ASP</td>
<td>DateDiff("s", "01/01/1970 00:00:00", Now())</td>
</tr>
<tr>
<td>其他操作系统

<span style="font-weight: normal; font-size: 12px;">(如果Perl被安装在系统中)</span></td>
<td><span>命令行状态：</span>perl -e "print time"</td>
</tr>
</tbody>
</table>

### 如何在不同编程语言中实现Unix时间戳(_Unix timestamp_) → 普通时间？

<table class="getcurrentunixtimetable">
<tbody>
<tr>
<td>Java</td>
<td>String date = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new java.util.Date(<span style="text-decoration: underline;">Unix timestamp</span> * 1000))</td>
</tr>
<tr>
<td>JavaScript</td>
<td><span>先</span> var unixTimestamp = new Date(<span style="text-decoration: underline;">Unix timestamp</span> * 1000) <span>然后</span> commonTime = unixTimestamp.toLocaleString()</td>
</tr>
<tr>
<td>Linux</td>
<td>date -d @<span style="text-decoration: underline;">Unix timestamp</span></td>
</tr>
<tr>
<td>MySQL</td>
<td>from_unixtime(<span style="text-decoration: underline;">Unix timestamp</span>)</td>
</tr>
<tr>
<td>Perl</td>
<td><span>先</span> my $time = <span style="text-decoration: underline;">Unix timestamp</span> <span>然后</span> my ($sec, $min, $hour, $day, $month, $year) = (localtime($time))[0,1,2,3,4,5,6]</td>
</tr>
<tr>
<td>PHP</td>
<td>date('r', <span style="text-decoration: underline;">Unix timestamp</span>)</td>
</tr>
<tr>
<td>PostgreSQL</td>
<td>SELECT TIMESTAMP WITH TIME ZONE 'epoch' + <span style="text-decoration: underline;">Unix timestamp</span>) * INTERVAL '1 second';</td>
</tr>
<tr>
<td>Python</td>
<td><span>先</span> import time <span>然后</span> time.gmtime(<span style="text-decoration: underline;">Unix timestamp</span>)</td>
</tr>
<tr>
<td>Ruby</td>
<td>Time.at(<span style="text-decoration: underline;">Unix timestamp</span>)</td>
</tr>
<tr>
<td>SQL Server</td>
<td>DATEADD(s, <span style="text-decoration: underline;">Unix timestamp</span>, '1970-01-01 00:00:00')</td>
</tr>
<tr>
<td>VBScript / ASP</td>
<td>DateAdd("s", <span style="text-decoration: underline;">Unix timestamp</span>, "01/01/1970 00:00:00")</td>
</tr>
<tr>
<td>其他操作系统

<span style="font-weight: normal; font-size: 12px;">(如果Perl被安装在系统中)</span></td>
<td><span>命令行状态：</span>perl -e "print scalar(localtime(<span style="text-decoration: underline;">Unix timestamp</span>))"</td>
</tr>
</tbody>
</table>

### 如何在不同编程语言中实现普通时间 → Unix时间戳(_Unix timestamp_)？

<table>
<tbody>
<tr>
<td>Java</td>
<td>long epoch = new java.text.SimpleDateFormat("<span style="text-decoration: underline;">dd/MM/yyyy HH:mm:ss</span>").parse("01/01/1970 01:00:00");</td>
</tr>
<tr>
<td>JavaScript</td>
<td>var commonTime = new Date(Date.UTC(<span style="text-decoration: underline;">year</span>, <span style="text-decoration: underline;">month</span> - 1, <span style="text-decoration: underline;">day</span>, <span style="text-decoration: underline;">hour</span>, <span style="text-decoration: underline;">minute</span>, <span style="text-decoration: underline;">second</span>))</td>
</tr>
<tr>
<td>MySQL</td>
<td>SELECT unix_timestamp(<span style="text-decoration: underline;">time</span>)

<span>时间格式: YYYY-MM-DD HH:MM:SS 或 YYMMDD 或 YYYYMMDD</span></td>
</tr>
<tr>
<td>Perl</td>
<td><span>先</span> use Time::Local <span>然后</span> my $time = timelocal($sec, $min, $hour, $day, $month, $year);</td>
</tr>
<tr>
<td>PHP</td>
<td>mktime(<span style="text-decoration: underline;">hour</span>, <span style="text-decoration: underline;">minute</span>, <span style="text-decoration: underline;">second</span>, <span style="text-decoration: underline;">day</span>, <span style="text-decoration: underline;">month</span>, <span style="text-decoration: underline;">year</span>)</td>
</tr>
<tr>
<td>PostgreSQL</td>
<td>SELECT extract(epoch FROM date('<span style="text-decoration: underline;">YYYY-MM-DD HH:MM:SS</span>'));</td>
</tr>
<tr>
<td>Python</td>
<td><span>先</span> import time <span>然后</span> int(time.mktime(time.strptime('<span style="text-decoration: underline;">YYYY-MM-DD HH:MM:SS</span>', '%Y-%m-%d %H:%M:%S')))</td>
</tr>
<tr>
<td>Ruby</td>
<td>Time.local(<span style="text-decoration: underline;">year</span>, <span style="text-decoration: underline;">month</span>, <span style="text-decoration: underline;">day</span>, <span style="text-decoration: underline;">hour</span>, <span style="text-decoration: underline;">minute</span>, <span style="text-decoration: underline;">second</span>)</td>
</tr>
<tr>
<td>SQL Server</td>
<td>SELECT DATEDIFF(s, '1970-01-01 00:00:00', <span style="text-decoration: underline;">time</span>)</td>
</tr>
<tr>
<td>Unix / Linux</td>
<td>date +%s -d"Jan 1, 1970 00:00:01"</td>
</tr>
<tr>
<td>VBScript / ASP</td>
<td>DateDiff("s", "01/01/1970 00:00:00", <span style="text-decoration: underline;">time</span>)</td>
</tr>
</tbody>
</table>