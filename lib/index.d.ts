interface InjectOptions {
    version?: string;
    projectName?: string;
    buildTime?: string;
    tagId?: string;
}
export declare class BuildInfoInjectorWebpackPlugin {
    private options;
    constructor(options?: InjectOptions);
    apply(compiler: any): void;
}
export declare function BuildInfoInjectorVitePlugin(options?: InjectOptions): any;
export declare function BuildInfoInjectorRollupPlugin(options?: InjectOptions): any;
export {};
