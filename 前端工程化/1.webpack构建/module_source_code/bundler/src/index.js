const {existsSync, writeFileSync, readFileSync, watch} = require('fs');
const {dirname, resolve, basename, extname} = require('path');
const net = require('net');

const root = dirname(require.main.paths[1]);

const funcWrapper = ['function (require, module, exports) {', '}'];
const getFilePath = modulePath => [modulePath, `${modulePath}.js`, `${modulePath}/index.js`].find(existsSync);

main(require(resolve(root, 'packer.config')));

function main(config) {
    if (Array.isArray(config)) return config.map(main);

    if (Array.isArray(config.entry)) return config.entry.map(entry => main({...config, entry, name: entry}));

    if (typeof config.entry === 'object') return Object.entries(config.entry).map(([name, entry]) => main({...config, entry, name}));

    const defaultConfig = {
        base: root,
        name: 'index',
        entry: 'index',
        output: '[name].bundle.js',
        public: (config.base || config.output) ? resolve(config.base || '', dirname(config.output || '')).replace(root, '') + '/' : '/'
    };
    const bundleConfig = Object.assign({}, defaultConfig, config);

    const modulePathIdMap = {};
    const moduleList = [];
    const moduleDepMapList = [];

    deepTravel(resolve(root, bundleConfig.base, bundleConfig.entry), moduleList, moduleDepMapList, modulePathIdMap);

    writeFileSync(
        resolve(root, bundleConfig.base, bundleConfig.output.replace('[name]', bundleConfig.name.replace(extname(bundleConfig.name), ''))),
        readFileSync(resolve(__dirname, 'bundle.boilerplate'), 'utf-8')
            .replace('/* dynamic-import-status */', false)
            .replace('/* runtime-config */', JSON.stringify(bundleConfig))
            .replace('/* module-list-template */', moduleList.join(','))
            .replace('/* module-dep-map-list-template */', moduleDepMapList.map(item => JSON.stringify(item)).join(',')),
        'utf-8'
    );
}

function deepTravel(fullPath, moduleList, moduleDepMapList, modulePathIdMap) {
    const modulePathMatcher = /require\(["`'](.+?)["`']\)/g;
    const moduleText = readFileSync(getFilePath(fullPath), 'utf-8');
    const childModules = [];
    const moduleDepMap = {};
    let moduleContent = moduleText;
    let match = null;
    while ((match = modulePathMatcher.exec(moduleText)) !== null) {
        const [, modulePath] = match;
        const childModuleAbsolutePath = resolve(dirname(getFilePath(fullPath)), modulePath);
        if ((modulePathIdMap).hasOwnProperty(childModuleAbsolutePath)) {
            moduleDepMap[modulePath] = modulePathIdMap[childModuleAbsolutePath];
            continue;
        };
        childModules.push(modulePath);
        deepTravel(childModuleAbsolutePath, moduleList, moduleDepMapList, modulePathIdMap);
        moduleDepMap[modulePath] = modulePathIdMap[childModuleAbsolutePath];
    }
    const funcStr = `${funcWrapper[0]}\n${moduleContent}\n${funcWrapper[1]}`;
    cacheModule(moduleList, modulePathIdMap, funcStr, fullPath);
    moduleDepMapList.push(moduleDepMap);
}

function cacheModule(list, map, listVal, mapKey) {
    list.push(listVal);
    map[mapKey] = list.length - 1;
}

module.exports = main;