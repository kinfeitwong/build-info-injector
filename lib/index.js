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
// Webpack 4/5 插件（0依赖实现，直接处理输出目录下所有 HTML 文件）
const fs = require('fs');
const path = require('path');
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
        compiler.hooks.afterEmit.tap('BuildInfoInjectorWebpackPlugin', (compilation) => {
            var _a, _b;
            const outputPath = ((_a = compiler.options.output) === null || _a === void 0 ? void 0 : _a.path) || ((_b = compilation.outputOptions) === null || _b === void 0 ? void 0 : _b.path);
            if (!outputPath)
                return;
            const files = fs.readdirSync(outputPath);
            files.forEach((file) => {
                if (file.endsWith('.html')) {
                    const filePath = path.join(outputPath, file);
                    let html = fs.readFileSync(filePath, 'utf-8');
                    html = injectBuildInfo(html, {
                        version: this.options.version || compiler.options.version,
                        projectName: this.options.projectName || compiler.options.name,
                        buildTime: this.options.buildTime || new Date().toISOString(),
                    });
                    fs.writeFileSync(filePath, html, 'utf-8');
                }
            });
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
