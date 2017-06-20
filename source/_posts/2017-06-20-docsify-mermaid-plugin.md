---
title: Docsify画图建模Mermaid插件支持
date: 2017-06-20 15:54:54
layout: post
categories: dev
tags: [docsify,markdown,plugin]
---

先上图

![mermaid1](https://user-images.githubusercontent.com/1890238/27322559-3217d3b8-5564-11e7-8d27-2d6de348aa5f.png)

<!-- more -->

## 引入Mermaid

在 `head` 中加入css:

```html
<link rel="stylesheet" href="//unpkg.com/mermaid/dist/mermaid.min.css">
```

在 底部 引用js:

```html
<script type="text/javascript" src="//unpkg.com/mermaid/dist/mermaid.min.js"></script>
```

## 配置文件修改


```js
window.$docsify = {
  // ...
  plugins: [
    function(hook, vm) {
      hook.ready(function () {
        mermaid.initialize({startOnLoad: false});
      });
      hook.doneEach(function () {
        mermaid.init(undefined,'.mermaid');
      });
    }
  ],
  markdown: {
    renderer: {
      code: function(code, lang) {
        var html = '';
        if(code.match(/^sequenceDiagram/) || code.match(/^graph/) || code.match(/^gantt/)){
          html = '<div class="mermaid">' + code + '</div>';
        }
        var hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
        return html + '<pre v-pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + hl + '</code></pre>'
      }
    }
  }
}
```

解释一下,两个关键步骤:

### markdown代码解析器

```js
markdown: {
  renderer: {
    code: function(code, lang) {
    var html = '';
    // 搜索 mermaid 代码
    if(code.match(/^sequenceDiagram/) || code.match(/^graph/) || code.match(/^gantt/)){
      // 生成一个 mermaid 图表的容器
      html = '<div class="mermaid">' + code + '</div>';
    }
    // 源码自带的 Prism 高亮插件
    var hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
    // 将图表的容器添加到代码之前
    return html + '<pre v-pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + hl + '</code></pre>'
    }
  }
}
```

### 自定义插件

```js
plugins: [
  function(hook, vm) {
    hook.ready(function () {
      // 类似 jQuery.ready 初始化 mermaid, 禁用自动渲染
      mermaid.initialize({startOnLoad: false});
    });
    hook.doneEach(function () {
      // 每个页面渲染完成后手动渲染 mermaid 图表
      mermaid.init(undefined,'.mermaid');
    });
  }
]
```


最后再补一张甘特图:


![mermaid2](https://user-images.githubusercontent.com/1890238/27322558-31c84fbe-5564-11e7-9949-851fddbafa33.png)


Mermaid支持:

- 流程图
- 序列图
- 甘特图

而且语法结构非常简单,值得推荐.

