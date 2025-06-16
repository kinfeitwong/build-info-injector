# build-info-injector

A zero-dependency npm plugin that automatically injects version, build time, and project name information into all HTML files during build. Compatible with Webpack 4/5, Vite, and Rollup. Simple to configure.

## Installation

```bash
npm install build-info-injector --save-dev
```

## Usage

### Webpack 4/5

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

### Vite

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

### Rollup

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

## Injection Effect

The following will be automatically inserted into the `<head>` tag of the built HTML:

```html
<meta id="build-info" name="build-info" content="<!-- ProjectName v1.0.0 build:2024-06-13T07:00:00.000Z -->">
``` 