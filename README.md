# build-info-injector

一个零依赖、可自动在构建时为所有 HTML 文件注入版本号、构建时间和项目名信息的 npm 插件。兼容 Webpack 4/5、Vite 及 Rollup，配置简单，开箱即用。

## 安装

```bash
npm install build-info-injector --save-dev
```

## 用法

### Webpack 4/5

```js
const { BuildInfoInjectorWebpackPlugin } = require('build-info-injector');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin(),
    new BuildInfoInjectorWebpackPlugin({
      version: '1.0.0',
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