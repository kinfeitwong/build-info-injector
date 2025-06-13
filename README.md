[English](#english) | [中文](#中文)

---

## English

A zero-dependency npm plugin that automatically injects version, build time, and project name information into all HTML files during build. Compatible with Webpack 4/5, Vite, and Rollup. Simple to configure and ready to use out of the box.

### Installation

```bash
npm install build-info-injector --save-dev
```

### Usage

#### Webpack 4/5
(Use with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin))

```js
const { BuildInfoInjectorWebpackPlugin } = require('build-info-injector');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin(),
    new BuildInfoInjectorWebpackPlugin({
      version: require('./package.json').version,
      projectName: 'Your Project Name',
      // buildTime is optional, defaults to current time
    })
  ]
};
```

#### Vite

```ts
import { BuildInfoInjectorVitePlugin } from 'build-info-injector';

export default {
  plugins: [
    BuildInfoInjectorVitePlugin({
      version: '1.0.0',
      projectName: 'Your Project Name',
    })
  ]
};
```

#### Rollup

```js
import { BuildInfoInjectorRollupPlugin } from 'build-info-injector';

export default {
  plugins: [
    BuildInfoInjectorRollupPlugin({
      version: '1.0.0',
      projectName: 'Your Project Name',
    })
  ]
};
```

### Injection Effect

The following will be automatically inserted into the `<head>` tag of the built HTML:

```html
<meta id="build-info" name="build-info" content="<!-- ProjectName v1.0.0 build:2024-06-13T07:00:00.000Z -->">
```

---

## 中文

一个零依赖、可自动在构建时为所有 HTML 文件注入版本号、构建时间和项目名信息的 npm 插件。兼容 Webpack 4/5、Vite 及 Rollup，配置简单，开箱即用。

### 安装

```bash
npm install build-info-injector --save-dev
```

### 用法

#### Webpack 4/5
需配合 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 使用：

```js
const { BuildInfoInjectorWebpackPlugin } = require('build-info-injector');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin(),
    new BuildInfoInjectorWebpackPlugin({
      version: require('./package.json').version,
      projectName: '你的项目名',
      // buildTime 可不传，默认当前时间
    })
  ]
};
```

#### Vite

```ts
import { BuildInfoInjectorVitePlugin } from 'build-info-injector';

export default {
  plugins: [
    BuildInfoInjectorVitePlugin({
      version: '1.0.0',
      projectName: '你的项目名',
    })
  ]
};
```

#### Rollup

```js
import { BuildInfoInjectorRollupPlugin } from 'build-info-injector';

export default {
  plugins: [
    BuildInfoInjectorRollupPlugin({
      version: '1.0.0',
      projectName: '你的项目名',
    })
  ]
};
```

### 注入效果

构建后的 HTML `<head>` 标签内会自动插入：

```html
<meta id="build-info" name="build-info" content="<!-- 项目名 v1.0.0 build:2024-06-13T07:00:00.000Z -->">
``` 