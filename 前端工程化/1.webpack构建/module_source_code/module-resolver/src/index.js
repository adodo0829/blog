const {existsSync, writeFileSync, readFileSync, watch} = require('fs');
const {dirname, resolve, basename, extname} = require('path');

const root = dirname(require.main.paths[1]);

// 将我们的模块字符串包裹在这个函数当中
const funcWrapper = ['function (require, module, exports) {', '}'];
// 判断当前路径下的文件，例如 require('./a') 可以找 a a.js a/index.js 的文件
const getFilePath = modulePath => [modulePath, `${modulePath}.js`, `${modulePath}/index.js`].find(existsSync);
const dummy = args => args;

// 读取当前执行路径下的 package.config.js/packer.config.json 文件配置
main(require(resolve(root, 'packer.config')));

function main(config) {
    // 如果配置是一个 array，则对每个配置执行当前的入口函数
    if (Array.isArray(config)) return config.map(main);

    // 如果是多个 entry，则对每个 entry 都执行当前的入口函数
    if (Array.isArray(config.entry)) return config.entry.map(entry => main({...config, entry, name: entry}));

    // 如果 entry 是一个 object，则获取他的名称和最终生成的文件名
    if (typeof config.entry === 'object') return Object.entries(config.entry).map(([name, entry]) => main({...config, entry, name}));

    // 默认配置
    const defaultConfig = {
        base: root,
        name: 'index',
        entry: 'index',
        output: '[name].bundle.js',
        public: (config.base || config.output) ? resolve(config.base || '', dirname(config.output || '')).replace(root, '') + '/' : '/'
    };
    // 通过传入的配置和默认配置，生成一份最终的配置
    const bundleConfig = Object.assign({}, defaultConfig, config);

    const modulePathIdMap = {};
    const moduleList = [];
    const moduleDepMapList = [];
    const chunkModuleList = [];
    const chunkModulePathIdMap = {};

    // 从入口向下递归
    deepTravel(resolve(root, bundleConfig.base, bundleConfig.entry), moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap);

    // 所有的 chunk 文件的列表，遍历之后替换 boilerplate 中的内容并进行输出
    chunkModuleList.forEach((chunk, id) => {
        const dynamicTemplate = readFileSync(resolve(__dirname, 'chunk.boilerplate'), 'utf-8');

        writeFileSync(
            resolve(root, bundleConfig.base, `chunk_${id}.js`),
            dynamicTemplate
                .replace('/* dynamic-require-chunk-id */', `"chunk_${id}"`)
                .replace('/* dynamic-require-chunk-code */', chunk),
            'utf-8'
        );
    });

    // 所有 bundle 中的内容，遍历之后替换 boilerplate 中的内容进行输出
    writeFileSync(
        resolve(root, bundleConfig.base, bundleConfig.output.replace('[name]', bundleConfig.name.replace(extname(bundleConfig.name), ''))),
        readFileSync(resolve(__dirname, 'bundle.boilerplate'), 'utf-8')
            .replace('/* dynamic-import-status */', !!chunkModuleList.length)
            .replace('/* runtime-config */', JSON.stringify(bundleConfig))
            .replace('/* module-list-template */', moduleList.join(','))
            .replace('/* module-dep-map-list-template */', moduleDepMapList.map(item => JSON.stringify(item)).join(',')),
        'utf-8'
    );
}

function deepTravel(fullPath, moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap, isChunk, lifeCycle = {}) {
    const {beforeModuleParsing = dummy} = lifeCycle;
    // 正则匹配当前文件内容中的 require 相关内容
    const modulePathMatcher = /require(\.ensure)?\(["`'](.+?)["`']\)/g;
    // 读取模块内容
    const moduleText = beforeModuleParsing(readFileSync(getFilePath(fullPath), 'utf-8'));
    // 记录当前模块依赖的子模块列表
    const childModules = [];
    // 记录子模块的 name：id 映射
    const moduleDepMap = {};
    let moduleContent = moduleText;
    let match = null;
    while ((match = modulePathMatcher.exec(moduleText)) !== null) {
        // 匹配出的是否是异步模块和模块路径
        const [, isDynamicModule, modulePath] = match;
        // 拼接一下子模块的绝对路径
        const childModuleAbsolutePath = resolve(dirname(getFilePath(fullPath)), modulePath);
        // 判断一下当前的模块是不是之前已经处理过了，如果处理过了就不继续处理了而是跳过
        if ((isDynamicModule ? chunkModulePathIdMap : modulePathIdMap).hasOwnProperty(childModuleAbsolutePath)) {
            moduleDepMap[modulePath] = isDynamicModule ? getChunkRuntimePath(chunkModulePathIdMap, childModuleAbsolutePath) : modulePathIdMap[childModuleAbsolutePath];
            continue;
        };
        // 父模块记录一下当前的模块是一个子模块依赖
        childModules.push(modulePath);
        // 递归处理子模块
        deepTravel(childModuleAbsolutePath, moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap, !!isDynamicModule);
        // 处理完成之后，当前模块的 id 已经记录到 modulePathIdMap 中了，取出来作为依赖的映射
        moduleDepMap[modulePath] = isDynamicModule ? getChunkRuntimePath(chunkModulePathIdMap, childModuleAbsolutePath) : modulePathIdMap[childModuleAbsolutePath];
    }
    // 如果当前模块的子模块都处理完成了，那么将当前模块内容进行包裹
    const funcStr = `${funcWrapper[0]}\n${moduleContent}\n${funcWrapper[1]}`;
    // 通过是否是 chunk，来在不同的对象中缓存
    isChunk
        ? cacheModule(chunkModuleList, chunkModulePathIdMap, funcStr, fullPath)
        : cacheModule(moduleList, modulePathIdMap, funcStr, fullPath);
    // 如果是 bundle 则记录一下 moduleDepMapList 中
    !isChunk && moduleDepMapList.push(moduleDepMap);
}

function cacheModule(list, map, listVal, mapKey) {
    list.push(listVal);
    map[mapKey] = list.length - 1;
}

function getChunkRuntimePath(chunkModulePathIdMap, childModuleAbsolutePath) {
    return `chunk_${chunkModulePathIdMap[childModuleAbsolutePath]}`
}

module.exports = main;