# vue3.0 新语法预览
关于一些 vue3.0 的新语法, 期待正式版本的到来...

地址1: https://github.com/vuejs/rfcs/tree/master/active-rfcs
地址2: https://vue-composition-api-rfc.netlify.app/zh/#api-%E4%BB%8B%E7%BB%8D
## global API
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 全局的API直接被挂到实例上, 不是 VUE 的原型上
app.config.isCustomElement = tag => tag.startsWith('app-')
app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)

app.config.globalProperties.customProperty = () => {}

app.mount(App, '#app')
```
## composition API
组件内是用组合式 API 调用, 解决组件内部的 this 依赖, 更好的组件代码组织方式, 按函数执行逻辑的方式以及ts支持
```js
import { reactive, watchEffect, computed } from 'vue'

function setup() {
// 1.reactive自定义一个响应式对象, 而非 data 中会被遍历添加响应式依赖
  const state = reactive({
    count: 0,
  })
// 2.watchEffect处理外部影响
  watchEffect(() => {
    document.body.innerHTML = `count is ${state.count}`
  })
// 3.computed定义一个依赖于其他状态的状态
  const double = computed(() => state.count * 2)

// 4.lifecycle
  onMounted(() => {
    console.log('component is mounted!')
  })
  return {
    state
  }
}
```
## Tree-shaking支持
只打包用到的组件模块

## teleport 组件
解决 z-index 等问题
```html
<teleport to="#modals">
  <child>
    content...
  </child>
</teleport>
<!-- child 组件逻辑会被加入到下面这个DOM -->
<div id="modals"></div>
```
## 异步组件: 通过方法定义
```js
import { defineAsyncComponent } from "vue"
// simple usage
const AsyncFoo = defineAsyncComponent(() => import("./Foo.vue"))
// option usage
const AsyncFooWithOptions = defineAsyncComponent({
  loader: () => import("./Foo.vue"),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 100, // default: 200
  timeout: 3000, // default: Infinity
  suspensible: false, // default: true
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      retry()
    } else {
      fail()
    }
  }
})
```

## 函数组件
```js
import { h } from 'vue'
const FunctionalComp = (props, { slots, attrs, emit }) => {
  return h('div', `Hello! ${props.name}`)
}
// <FunctionalComp /> 通过组件属性传递参数
```

## 一些功能指令
- 插槽: 普通插槽和作用域插槽合并
```html
<!-- vue 3.x -->
<foo>
  <template v-slot:one="one">
    <bar v-slot="bar">
      <div>{{ one }} {{ bar }}</div>
    </bar>
  </template>
</foo>
```
- 动态指令
```html
<!-- v-bind with dynamic key -->
<div v-bind:[key]="value"></div>

<!-- v-bind shorthand with dynamic key -->
<div :[key]="value"></div>

<!-- v-on with dynamic event -->
<div v-on:[event]="handler"></div>

<!-- v-on shorthand with dynamic event -->
<div @[event]="handler"></div>

<!-- v-slot with dynamic name -->
<foo>
  <template v-slot:[name]>
    Hello
  </template>
</foo>
```

## 路由 router
```html
<!-- 添加了作用域插槽,可以根据回传的状态自定义一些效果 -->
<router-link to="/" custom v-slot="{ href, navigate, isActive }">
  <li :class="{ 'active': isActive }">
    <a :href="href" @click="navigate">
      <Icon>home</Icon><span class="xs-hidden">Home</span>
    </a>
  </li>
</router-link>
<!-- meta对象合并 -->
<!-- 添加了几个 router 实例的 api -->
<!-- router.addRoute(route: RouteRecord) 动态添加路由
     router.removeRoute(name: string | symbol)，动态删除路由
     router.hasRoute(name: string | symbol): boolean ，判断路由是否存在
     router.getRoutes(): RouteRecord[] 获取路由列表 -->
```

## 组件根元素数量
不再限制只是一个了