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

#### 插槽(slot组件)
当组件被多个地方使用
- 每个父组件中对该组件的内部有一部分需要特殊定制
- slot可以让我们更好的复用组件的同时并对其定制化处理
- 可以理解为`父组件`向`子组件`传递了一段 vnode

- 1.普通插槽 slot
```html
<!-- 父组件引用: 负责分发插槽内容, 存活周期在父组件下 -->
<!-- 父组件获取子组件可以通过 this.$refs.child 来做操作 -->
<child ref=child>
    我是父组件分发给 child 的所有内容
</child>

<!-- 子组件: child -->
<template>
    <slot>这里可以放一些默认值</slot>
</template>
```
- 2.具名插槽 子组件通过 name 属性 来匹配父组件分发的内容
```html
<!-- 父组件: 添加 slot 属性来作为标识 -->
<div slot="header">我是 header 分发的内容 111</div>
<div slot="main">我是 main 分发的内容222</div>
<div slot="footer">我是 footer 分发的内容333</div>

<!-- 在2.6.0 以上使用的是 v-slot:header; 默认插槽为: v-slot:default -->

<!-- 子组件child: slot 组件来标识 -->
<template>
    <slot name="header"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
</template>
```
- 3.作用域插槽 父组件可以接收来自子组件的 slot 传递过来的参数值
```html
<!-- 可以理解为: 子组件中的作用域插槽可以为父组件中的插槽的展示提供数据 -->
<!-- 存活周期在子组件内 -->
<!-- 子组件: -->
<template>
    <div>
        <slot name="header" :value="value"></slot>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value: '我是子组件的值'
            }
        }
    }
</script>

<!-- 父组件: -->
<child>
    <template slot="header" slot-scope="slotHeaderProps">
        渲染子组件传过来的对象中value值{{ slotHeaderProps.value }}
    </template>
</child>

<!-- 在 2.6 以上绑定值的方式: v-slot:header="slotHeaderProps"
     而且可以使用解构 v-slot:header="{value}", 将子组件传过来的值解构 -->

<!-- 还有就是, 我们可以把 slot直接写在子组件行内, 不必另起一个 template
即这样: <child v-slot:header="{value}">{{value}}</child> -->
```
vue3.0以后 slot 和 slot="xxx",slot-scope 的方式会被废弃...
新的用法slot, v-slot:xxx || v-slot:default, v-slot:xxx="slotProps"
简写: v-slot:header 可以被重写为 #header