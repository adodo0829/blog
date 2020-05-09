# vue 项目中常用的一些技巧汇总
持续更新中...

## 复用性技巧
#### 混入(mixin对象)
通常使用局部混入对象(建议)
```js
import mixinObj from '@/mixin/mixinObj'

export default {
  // 组件中添加 mixins 字段, 组件初始化的时候会进行合并
  mixins: [mixinObj]
}
// 合并策略: 同名属性 & 非同名
/* data 数据: 同名字段组件优先
 * 生命周期钩子: 合并为数组, mixin优先调用
 * methods对象: 同名字段组件优先
 * /
```
#### 自定义指令(directive对象)
通常使用全局的自定义指令, 局部貌似没太大必要
```js
/*
 * 节流指令, 防止函数调用过多
 */ 
import { DirectiveOptions } from 'vue'

export const throttle: DirectiveOptions = {
  // bind钩子,第一次绑定到元素时调用
  bind: (el, binding) => {
    // value: support 200, 400, ...2000ms, defalut 2s
    let time = binding.value as number
    if (!time) {
      time = 2000
    }
    let timeId: any
    el.addEventListener('click', (event) => {
      // first execute
      if (!timeId) {
        timeId = setTimeout(() => {
          timeId = null
        }, time)
      } else {
        event && event.stopImmediatePropagation()
      }
    }, true)
  }
}

// 将directives目录下的多个自定义指令批量导出
export * from './throttle'
export * from './debounce'

// main.ts 下批量导入并注入
import * as directives from '@/directives'
// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})
```

#### 过滤器(filter函数)
通常用来处理文本字符串(格式化处理...)

```js
import { getPadFunc } from '@/utils/tool'

// 整数位补0
export const padOneZero = getPadFunc(1) // 1 => 1.0
export const padTwoZero = getPadFunc(2) // 1 => 1.00

// 多行溢出 ...
export const ellipsis = (str: string, len = 40) => {
  if (!str.trim()) return ''
  if (str.length <= len) {
    return str
  } else {
    return str.substr(0, len) + '...'
  }
}

/**
 * 批量导入注册
 */
import * as filters from '@/filters' // filters: Modules对象

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string ]: Function })[key])
})
```

#### 插件(plugin对象)
插件本质就是一个需要`显式声明install方法`的对象
```js
// 实现http插件, 暴露install方法
export const pluginHttp = {
    // options对象可选, Vue 必传
    install(Vue, options) {
        Vue.prototype.$http = Axios;

        // 其他功能...自行扩展
    }
}

// 使用插件, 这样就可用插件对象里面的东西了
// 不过这里我们就实现了一个全局的$http
import { pluginHttp } from '@/api/http'
Vue.use(pluginHttp)
```