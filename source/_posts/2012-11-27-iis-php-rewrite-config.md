---
date: 2012-11-27
layout: post
title: IIS环境下PHP重写设置(支持中文参数)
categories: note
tags: [php,iis]
thread: 174
---

在网站根目录下加入:

<!-- more -->

Web.Config:

```xml
    <?xml version="1.0" encoding=”UTF-8″?>
    <configuration>
        <system.webServer>
            <rewrite>
                <rules>
                    <rule name="cnUrl" stopProcessing="true">
                        <match url="!^(index\.php|images|assets|robots\.txt)" />
                        <action type="Rewrite" url="cnurl.php" />
                    </rule>
                    <rule name="Default" patternSyntax="Wildcard">
                        <match url="*" />
                        <conditions>
                            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                        </conditions>
                        <action type="Rewrite" url="index.php" />
                    </rule>
                </rules>
            </rewrite>
        </system.webServer>
    </configuration>
```

cnurl.php:

```php
	<?php
    if (isset($_SERVER['HTTP_X_ORIGINAL_URL'])) {
       // IIS Mod-Rewrite
       $_SERVER['REQUEST_URI'] = $_SERVER['HTTP_X_ORIGINAL_URL'];
    } else if (isset($_SERVER['HTTP_X_REWRITE_URL'])) {
       // IIS Isapi_Rewrite
       $_SERVER['REQUEST_URI'] = $_SERVER['HTTP_X_REWRITE_URL'];
    } else {
       // Use ORIG_PATH_INFO if there is no PATH_INFO
       (!isset($_SERVER['PATH_INFO']) && isset($_SERVER['ORIG_PATH_INFO'])) && ($_SERVER['PATH_INFO'] = $_SERVER['ORIG_PATH_INFO']);
       // Some IIS + PHP configurations puts the script-name in the path-info (No need to append it twice)
       if (isset($_SERVER['PATH_INFO'])) {
           ($_SERVER['PATH_INFO'] == $_SERVER['SCRIPT_NAME']) ? ($_SERVER['REQUEST_URI'] = $_SERVER['PATH_INFO']) : ($_SERVER['REQUEST_URI'] = $_SERVER['SCRIPT_NAME'] . $_SERVER['PATH_INFO']);
       }
       // Append the query string if it exists and isn't null
    (isset($_SERVER['QUERY_STRING']) && !empty($_SERVER['QUERY_STRING'])) && ($_SERVER['REQUEST_URI'] .= '?' . $_SERVER['QUERY_STRING']);
    }
    require("index.php");
``` 


支持IIS环境下跑各种开源PHP项目，如：Wordpress、Emlog、Typecho等。