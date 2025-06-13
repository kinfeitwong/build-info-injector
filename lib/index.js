"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildInfoInjectorWebpackPlugin = void 0;
exports.BuildInfoInjectorVitePlugin = BuildInfoInjectorVitePlugin;
exports.BuildInfoInjectorRollupPlugin = BuildInfoInjectorRollupPlugin;
function injectBuildInfo(html, options) {
    const { version, projectName, buildTime, tagId = 'build-info' } = options;
    const info = `<!-- ${projectName || ''} v${version || ''} build:${buildTime || ''} -->`;
    // 注入到 <head> 末尾
    return html.replace(/<head(.*?)>/i, match => `${match}\n    <meta id="${tagId}" name="build-info" content="${info}">`);
}
function logBuildInfo(options) {
    const version = options.version || '';
    const projectName = options.projectName || '';
    const buildTime = options.buildTime || new Date().toISOString();
    // 控制台输出
    console.log(`[build-info] ${projectName} v${version} build:${buildTime}`);
}
// Webpack 4/5 插件
class BuildInfoInjectorWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
        logBuildInfo({
            version: this.options.version,
            projectName: this.options.projectName,
            buildTime: this.options.buildTime || new Date().toISOString(),
        });
    }
    apply(compiler) {
        const pluginName = 'BuildInfoInjectorWebpackPlugin';
        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            const HtmlWebpackPlugin = (compiler.options.plugins || []).find((p) => p.constructor && p.constructor.name === 'HtmlWebpackPlugin');
            if (HtmlWebpackPlugin) {
                const hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit;
                hook.tap(pluginName, (data) => {
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
exports.BuildInfoInjectorWebpackPlugin = BuildInfoInjectorWebpackPlugin;
// Vite 插件
function BuildInfoInjectorVitePlugin(options = {}) {
    logBuildInfo({
        version: options.version,
        projectName: options.projectName,
        buildTime: options.buildTime || new Date().toISOString(),
    });
    return {
        name: 'vite:build-info-injector',
        transformIndexHtml(html) {
            return injectBuildInfo(html, {
                version: options.version,
                projectName: options.projectName,
                buildTime: options.buildTime || new Date().toISOString(),
            });
        },
    };
}
// Rollup 插件
function BuildInfoInjectorRollupPlugin(options = {}) {
    logBuildInfo({
        version: options.version,
        projectName: options.projectName,
        buildTime: options.buildTime || new Date().toISOString(),
    });
    return {
        name: 'rollup:build-info-injector',
        generateBundle(_, bundle) {
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
