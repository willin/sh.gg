---
tags: 前端, 技巧
date:  2017-10-11 11:29
title:  VSCode配置Webpack路径提示及智能跳转
categories: note
---

## Webpack 配置

```js
resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src')
    ],
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      public: path.resolve(__dirname, '../public'),
      component: path.resolve(__dirname, '../src/component'),
      config: path.resolve(__dirname, '../src/config'),
      lib: path.resolve(__dirname, '../src/lib'),
      i18n: path.resolve(__dirname, '../src/i18n'),
      store: path.resolve(__dirname, '../src/store')
    }
  }
```

### Eslint 选配

需要安装插件 `eslint-import-resolver-webpack`。进行配置：

```yml
settings:
  import/resolver:
    webpack:
      config: 'build/webpack.config.js'
```

## 智能路径提示 

需要安装插件`Path Intellisense`，并且进行配置（项目或者全局的`settings.json`）：

```js
"path-intellisense.mappings": {
    "config": "${workspaceRoot}/src/config",
    "lib": "${workspaceRoot}/src/lib",
    "store": "${workspaceRoot}/src/store",
    "i18n": "${workspaceRoot}/src/i18n",
    "component": "${workspaceRoot}/src/component"
  }
```
![智能提示](http://i.giphy.com/iaHeUiDeTUZuo.gif)

## 代码智能跳转

项目根目录创建 `jsonfig.json`：

```js
{
  "include": [
    "./src/**/*"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
        "component/*": ["src/component/*"],
        "config/*": ["src/config/*"],
        "lib/*": ["src/lib/*"],
        "i18n/*": ["src/i18n/*"],
        "store/*": ["src/store/*"]
    }
  }
}
```


￼

按住 `⌘command`就可以跳转到对应代码了。
