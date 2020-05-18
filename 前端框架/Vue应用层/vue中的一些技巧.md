# vue 项目中常用的一些技巧汇总
持续更新中...

## 复用性技巧
提高代码重用度, 有些地方只是减少项目代码,项目更加简洁而已...有些功能也存在副作用...

#### 混入(mixin对象)
通常使用局部混入对象(建议)
```js
import mixinObj from '@/mixin/mixinObj'

export default {
  // 组件中添加 mixins 字段, 组件初始化的时候会进行合并
  mixins: [mixinObj]
}
// 合并策略: 同名属性 & 非同名
/* data 数据: 同名字段 组件内部优先
 * 生命周期钩子: 合并为数组, mixin优先调用
 * methods对象: 同名字段 组件内部优先
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
  // bind钩子 → 第一次绑定到元素时调用
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
- about permission
```js
export function checkJurisdiction(key) {
    // 权限数组
    let jurisdictionList = ['1', '2', '3', '5']
    let index = jurisdictionList.indexOf(key)
    console.log('index:',index)
    if (index > -1) {
        // 有权限
        return true
    } else {
        // 无权限
        return false
    }
}

Vue.directive('permission',{
  inserted(el, binding){
    // inserted → 元素插入的时候
    let permission = binding.value // 获取到 v-permission的值

    if(permission){
      let hasPermission = checkJurisdiction(permission)
      if(!hasPermission){
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    }else{
      throw new Error('需要传key')
    }
  }
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

#### 函数组件(render函数应用)
简化 template 模板代码
```html
<!-- 函数组件 -->
<script>
export default {
    props:{
        type:{
            type:String,
            default:'normal'
        },
        text:{
            type:String,
            default:'按钮'
        }
    },
    render(h){
        /*
            h 类似于 createElement， 接受2个参数
            1 - 元素
            2 - 选项
         */
        return h('button',{
            // 相当于 v-bind:class
            class: {
                btn:true,
                'btn-success':this.type === 'success',
                'btn-danger':this.type === 'danger',
                'btn-warning':this.type === 'warning',
                'btn-normal':this.type === 'normal',
            },
            domProps:{
                innerText: this.text || '默认'
            },
            on:{
                click:this.handleClick
            }
        })
    },
    methods:{
        handleClick(){
            this.$emit('myClick')
        }
    }
}
</script>

<style scoped>
.btn{
    width: 100px;
    height:40px;
    line-height:40px;
    border:0px;
    border-radius:5px;
    color:#ffff;
}
.btn-success{
    background:#2ecc71;
}
.btn-danger{
    background:#e74c3c;
}
.btn-warning{
    background:#f39c12;
}
.btn-normal{
    background:#bdc3c7;
}
</style>
```
- 使用
```html
<Button type='success' text='button1' @myClick='handleClick'></Button>
```
#### 全局组件批量注册
```js
import Vue from 'vue'
/**
 * 读取 componetns/base 下的vue文件并自动注册全局组件
 * require.context(arg1, arg2, arg3)应用
 * arg1 - 读取文件的路径
 * arg2 - 是否遍历文件的子目录
 * arg3 - 匹配文件的正则
 */

// 返回一个模块对象
const requireComponent = require.context('../components/base', false, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\//, '').replace(/\.vue/, '')

  Vue.component(componentName, componentConfig.default || componentConfig)
})
```

## 路由技巧

#### router 分模块管理
将不同模块的路由文件单独定义 module1.ts, module2.ts等...
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerList = []  // 路由数组 - 存放所有路由
function importAll(routerModule){
    // 该函数用于将所有分区路由中的路由添加到路由数组
    routerModule.keys().forEach( key => {
        console.log(key)
        routerList.push(routerModule(key).default)
    })
}
importAll(require.context('./moudles', true, /\.ts/))

const routes = [
    ...routerList
]

const router = new VueRouter({
    routes
})

export default router
```