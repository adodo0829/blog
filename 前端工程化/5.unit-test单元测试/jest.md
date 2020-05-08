# Jest单元测试应用
jest参考: https://jestjs.io/docs/zh-Hans/getting-started

## 以 vue 项目为例
https://alexjover.com/blog/write-the-first-vue-js-component-unit-test-in-jest/
需要配合 vue-cli 脚手架一起使用

- jest 配置
```js
module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/utils/**/*.{ts,vue}',
    '!src/utils/auth.ts',
    '!src/utils/request.ts',
    'src/components/**/*.{ts,vue}'
  ],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  coverageReporters: [
    'lcov',
    'text-summary'
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
}
```

## 组件测试示例
```js
// 组件测试
import { mount, createLocalVue } from '@vue/test-utils'
import FormTitle from '@/components/base/form-title.vue'

const localVue = createLocalVue()
localVue.component(FormTitle.name, FormTitle)

describe('测试base组件', () => {
  // 表单 title
  it('form-title.vue, prop默认值', () => {
    const wrapper = mount(FormTitle, { localVue })
    expect(wrapper.props().require).toBe(false)
  })
  it('设置title值', () => {
    const wrapper = mount(FormTitle, { localVue, propsData: { title: 'this is title' } })
    expect(wrapper.props('title')).toBe('this is title')
  })
  // it('修改title值', () => {
  //   const wrapper = mount(FormTitle, { localVue })
  //   wrapper.setProps({ title: 'updateTitle' })
  //   expect(wrapper.find('span').text()).toMatch('updateTitle')
  // })
})

```
## 工具函数测试示例
```js
// 函数测试
import { padOneZero, padTwoZero } from '@/filters/index'

// describe表示分组; 分组里面一个个的用例
describe('utils: padZero整数补0', () => {
  // it语法表示一个用例
  it('补 .0', () => {
    // expect表示预期结果; toBe表示三个等号的比较
    expect(padOneZero(1)).toBe('1.0')
  })
  it('补 .00', () => {
    // expect表示预期结果; toBe表示三个等号的比较
    expect(padTwoZero(2)).toBe('2.00')
    expect(padTwoZero(2.1)).toBe('2.10')
  })
})

```