# build-info-injector

一个轻量级的 npm 插件，可在构建时自动向所有 HTML 文件注入版本号、构建时间戳和项目名。支持 Webpack 4/5、Vite 和 Rollup。

## 安装

```bash
npm install build-info-injector --save-dev
```

## 用法

### Webpack 4/5
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

### Vite

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

### Rollup

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

## 注入效果

构建后的 HTML `<head>` 标签内会自动插入：

```html
<meta id="build-info" name="build-info" content="<!-- 项目名 v1.0.0 build:2024-06-13T07:00:00.000Z -->">
``` 