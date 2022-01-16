源码文件指引地址：https://www.processon.com/view/link/5dd68342e4b001fa2e0c4697

##说明
本项目用于调试源码，即修改配置使得项目中引用的 react 包来自 src/react，使得我们可以在 src/react 下 debug 和打 log 调试。

##使用步骤

1. 在根目录下安装： yarn add
2. 下载react包到src下，并按照下面的修改配置步骤修改react中的文件。
3. 在根目录下启动： yarn start



### 修改配置





### 修改 react 包

**最新的react包只需要修改下面的1、2、3、6、7。（2021.7.27）**

如果想要自己重新 clone react，有以下一些文件需要更改：

1. /src/react/packages/react-reconciler/src/ReactFiberHostConfig.js

```jsx
// import invariant from 'shared/invariant';
//invariant(false, 'This module must be shimmed by a specific renderer.'); //sy
// sy
export * from "./forks/ReactFiberHostConfig.dom";
```

2. /src/react/packages/shared/invariant.js

```jsx
export default function invariant(condition, format, a, b, c, d, e, f) {
  if (condition) return; // sy 加上这个

  throw new Error(
    "Internal React error: invariant() is meant to be replaced at compile " +
      "time. There is no runtime version."
  );
}
```

3. /src/react/packages/shared/ReactSharedInternals.js

```jsx
// import React from 'react';
// const ReactSharedInternals =
//   React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

// sy
import ReactSharedInternals from "../react/src/ReactSharedInternals";
```

4. /src/react/packages/scheduler/index.js

   ```jsx
   "use strict";
   
   export * from "./src/Scheduler";
   // sy 添加以下
   export {
     unstable_flushAllWithoutAsserting,
     unstable_flushNumberOfYields,
     unstable_flushExpired,
     unstable_clearYields,
     unstable_flushUntilNextPaint,
     unstable_flushAll,
     unstable_yieldValue,
     unstable_advanceTime,
     unstable_setDisableYieldValue,
   } from './src/forks/SchedulerMock';
   ```


5. react/.eslintrc.js

1）搜索  extends: ['fbjs', 'prettier']，把这个数组置空。

2）搜索no-function-declare-after-return和react-internal，把相关的代码行全部注释掉。

3）搜索eol-last，把` 'eol-last': ERROR,`的ERROR改为OFF

4）搜索quotes，把quotes和jsx-quotes的值也修改为OFF

5）搜索no-unused-vars，把no-unused-vars的值也改为OFF

我修改后的文件如下：

```js
'use strict';

const {
  es5Paths,
  esNextPaths,
} = require('./scripts/shared/pathsByLanguageVersion');

const restrictedGlobals = require('confusing-browser-globals');

const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: [], // sy['fbjs', 'prettier'],

  // Stop ESLint from looking for a configuration file in parent folders
  root: true,

  plugins: [
    'jest',
    'no-for-of-loops',
    // 'no-function-declare-after-return',
    'react',
    // 'react-internal',
  ],

  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'script',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },

  // We're stricter than the default config, mostly. We'll override a few rules
  // and then enable some React specific ones.
  rules: {
    'accessor-pairs': OFF,
    'brace-style': [ERROR, '1tbs'],
    'consistent-return': OFF,
    'dot-location': [ERROR, 'property'],
    // We use console['error']() as a signal to not transform it:
    'dot-notation': [ERROR, {allowPattern: '^(error|warn)$'}],
    'eol-last': OFF,//ERROR,
    eqeqeq: [ERROR, 'allow-null'],
    indent: OFF,
    'jsx-quotes': OFF,// [ERROR, 'prefer-double'],
    'keyword-spacing': [ERROR, {after: true, before: true}],
    'no-bitwise': OFF,
    'no-console': OFF,
    'no-inner-declarations': [ERROR, 'functions'],
    'no-multi-spaces': ERROR,
    'no-restricted-globals': [ERROR].concat(restrictedGlobals),
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'no-shadow': ERROR,
    'no-unused-expressions': ERROR,
    'no-unused-vars': OFF,//[ERROR, {args: 'none'}],
    'no-use-before-define': OFF,
    'no-useless-concat': OFF,
    quotes:OFF,// [ERROR, 'single', {avoidEscape: true, allowTemplateLiterals: true}],
    'space-before-blocks': ERROR,
    'space-before-function-paren': OFF,
    'valid-typeof': [ERROR, {requireStringLiterals: true}],
    // Flow fails with with non-string literal keys
    'no-useless-computed-key': OFF,

    // We apply these settings to files that should run on Node.
    // They can't use JSX or ES6 modules, and must be in strict mode.
    // They can, however, use other ES6 features.
    // (Note these rules are overridden later for source files.)
    'no-var': ERROR,
    strict: ERROR,

    // Enforced by Prettier
    // TODO: Prettier doesn't handle long strings or long comments. Not a big
    // deal. But I turned it off because loading the plugin causes some obscure
    // syntax error and it didn't seem worth investigating.
    'max-len': OFF,
    // Prettier forces semicolons in a few places
    'flowtype/object-type-delimiter': OFF,

    // React & JSX
    // Our transforms set this automatically
    'react/jsx-boolean-value': [ERROR, 'always'],
    'react/jsx-no-undef': ERROR,
    // We don't care to do this
    'react/jsx-sort-prop-types': OFF,
    'react/jsx-space-before-closing': ERROR,
    'react/jsx-uses-react': ERROR,
    'react/no-is-mounted': OFF,
    // This isn't useful in our test code
    'react/react-in-jsx-scope': ERROR,
    'react/self-closing-comp': ERROR,
    // We don't care to do this
    'react/jsx-wrap-multilines': [
      ERROR,
      {declaration: false, assignment: false},
    ],

    // Prevent for...of loops because they require a Symbol polyfill.
    // You can disable this rule for code that isn't shipped (e.g. build scripts and tests).
    'no-for-of-loops/no-for-of-loops': ERROR,

    // Prevent function declarations after return statements
    // sy
    // 'no-function-declare-after-return/no-function-declare-after-return': ERROR, 

    // CUSTOM RULES
    // the second argument of warning/invariant should be a literal string
    // sy
    // 'react-internal/no-primitive-constructors': OFF,
    // 'react-internal/no-to-warn-dev-within-to-throw': OFF,
    // 'react-internal/invariant-args': OFF,
    // 'react-internal/warning-args': OFF,
    // 'react-internal/no-production-logging': OFF,
    // 'react-internal/no-cross-fork-imports': OFF,
    // 'react-internal/no-cross-fork-types': OFF, 
    // [
    //   ERROR,
    //   {
    //     old: [],
    //     new: [],
    //   },
    // ],
  },

  overrides: [
    {
      // We apply these settings to files that we ship through npm.
      // They must be ES5.
      files: es5Paths,
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script',
      },
      rules: {
        'no-var': OFF,
        strict: ERROR,
      },
    },
    {
      // We apply these settings to the source files that get compiled.
      // They can use all features including JSX (but shouldn't use `var`).
      files: esNextPaths,
      parser: 'babel-eslint',
      parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
      },
      rules: {
        'no-var': ERROR,
        'prefer-const': ERROR,
        strict: OFF,
      },
    },
    {
      files: ['**/__tests__/*.js'],
      rules: {
        // https://github.com/jest-community/eslint-plugin-jest
        'jest/no-focused-tests': ERROR,
        'jest/valid-expect': ERROR,
        'jest/valid-expect-in-promise': ERROR,
      },
    },
    {
      files: [
        '**/__tests__/**/*.js',
        'scripts/**/*.js',
        'packages/*/npm/**/*.js',
        'packages/dom-event-testing-library/**/*.js',
        'packages/react-devtools*/**/*.js',
      ],
      rules: {
        // 'react-internal/no-production-logging': OFF,
        // 'react-internal/warning-args': OFF,

        // Disable accessibility checks
        'jsx-a11y/aria-role': OFF,
        'jsx-a11y/no-noninteractive-element-interactions': OFF,
        'jsx-a11y/no-static-element-interactions': OFF,
        'jsx-a11y/role-has-required-aria-props': OFF,
        'jsx-a11y/no-noninteractive-tabindex': OFF,
        'jsx-a11y/tabindex-no-positive': OFF,
      },
    },
    {
      files: [
        'scripts/eslint-rules/*.js',
        'packages/eslint-plugin-react-hooks/src/*.js'
      ],
      plugins: ['eslint-plugin'],
      rules: {
        'eslint-plugin/prefer-object-rule': ERROR,
        'eslint-plugin/require-meta-fixable': [
          ERROR,
          {catchNoFixerButFixableProperty: true},
        ],
        'eslint-plugin/require-meta-has-suggestions': ERROR,
      },
    },
    {
      files: [
        'packages/react-native-renderer/**/*.js',
        'packages/react-server-native-relay/**/*.js',
      ],
      globals: {
        nativeFabricUIManager: true,
      },
    },
    {
      files: ['packages/react-server-dom-webpack/**/*.js'],
      globals: {
        __webpack_chunk_load__: true,
        __webpack_require__: true,
      },
    },
    {
      files: ['packages/scheduler/**/*.js'],
      globals: {
        TaskController: true,
      },
    },
  ],

  globals: {
    spyOnDev: true,
    spyOnDevAndProd: true,
    spyOnProd: true,
    __EXPERIMENTAL__: true,
    __EXTENSION__: true,
    __PROFILE__: true,
    __TEST__: true,
    __UMD__: true,
    __VARIANT__: true,
    gate: true,
    trustedTypes: true,
  },
};
```



6. 根据控制台此时的报错，找到报错信息以react-internal开头文件，然后搜索react-internal，把相关注释全部去掉。或者在react/packages下暴力全局搜索react-internal，把包含react-internal的注释行全部删掉。当然后者东西比较多，因为全局下有些文件里的react-internal并不影响运行，可以不删除的。建议选择前者。





