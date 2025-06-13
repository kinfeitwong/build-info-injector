interface InjectOptions {
  version?: string;
  projectName?: string;
  buildTime?: string;
  tagId?: string;
}

function injectBuildInfo(html: string, options: InjectOptions): string {
  const { version, projectName, buildTime, tagId = 'build-info' } = options;
  const info = `<!-- ${projectName || ''} v${version || ''} build:${buildTime || ''} -->`;
  // 注入到 <head> 末尾
  return html.replace(/<head(.*?)>/i, match => `${match}\n    <meta id="${tagId}" name="build-info" content="${info}">`);
}

function logBuildInfo(options: InjectOptions) {
  const version = options.version || '';
  const projectName = options.projectName || '';
  const buildTime = options.buildTime || new Date().toISOString();
  // 控制台输出
  console.log(`[build-info] ${projectName} v${version} build:${buildTime}`);
}

// Webpack 4/5 插件
export class BuildInfoInjectorWebpackPlugin {
  private options: InjectOptions;
  constructor(options: InjectOptions = {}) {
    this.options = options;
    logBuildInfo({
      version: this.options.version,
      projectName: this.options.projectName,
      buildTime: this.options.buildTime || new Date().toISOString(),
    });
  }
  apply(compiler: any) {
    const pluginName = 'BuildInfoInjectorWebpackPlugin';
    compiler.hooks.compilation.tap(pluginName, (compilation: any) => {
      const HtmlWebpackPlugin = (compiler.options.plugins || []).find((p: any) => p.constructor && p.constructor.name === 'HtmlWebpackPlugin');
      if (HtmlWebpackPlugin) {
        const hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit;
        hook.tap(pluginName, (data: any) => {
          data.html = injectBuildInfo(data.html, {
            version: this.options.version || compiler.options.version,
            projectName: this.options.projectName || compiler.options.name,
            buildTime: this.options.buildTime || new Date().toISOString(),
          });
          return data;
        });
      }
    });
  }
}

// Vite 插件
export function BuildInfoInjectorVitePlugin(options: InjectOptions = {}): any {
  logBuildInfo({
    version: options.version,
    projectName: options.projectName,
    buildTime: options.buildTime || new Date().toISOString(),
  });
  return {
    name: 'vite:build-info-injector',
    transformIndexHtml(html: string) {
      return injectBuildInfo(html, {
        version: options.version,
        projectName: options.projectName,
        buildTime: options.buildTime || new Date().toISOString(),
      });
    },
  };
}

// Rollup 插件
export function BuildInfoInjectorRollupPlugin(options: InjectOptions = {}): any {
  logBuildInfo({
    version: options.version,
    projectName: options.projectName,
    buildTime: options.buildTime || new Date().toISOString(),
  });
  return {
    name: 'rollup:build-info-injector',
    generateBundle(_: any, bundle: any) {
      Object.keys(bundle).forEach(fileName => {
        if (fileName.endsWith('.html')) {
          const chunk = bundle[fileName];
          if (typeof chunk.source === 'string') {
            chunk.source = injectBuildInfo(chunk.source, {
              version: options.version,
              projectName: options.projectName,
              buildTime: options.buildTime || new Date().toISOString(),
            });
          }
        }
      });
    },
  };
} 