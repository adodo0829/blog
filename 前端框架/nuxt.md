# 基于 Vue 的服务端渲染应用框架 Nuxt
- 什么是服务器端渲染 (SSR: Server Side Rendering)？  
按照官方的说法, 传统的 SPA 应用是在浏览器上输出 Vue 组件，进行生成 DOM 和操作 DOM。服务端渲染应用则是在 node 服务器环境下将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序; 也称为同构,即b/c 端同时构建

- 优点
```
SEO
首屏加载变快
```
- 缺点
```
开发环境限制: 浏览器有些 api 在 node 环境下没有, 在 node 中产生副作用代码消耗不必要的内存, 规避单例对象
构建配置和部署: 需要 node 环境下部署
服务器负载增加: 运行 node.js 程序会占用更多的服务器内存, 消耗 CPU 资源
```

## vue 官方自带的 SSR
原理: 通过 new Vue 将我们的模板的转化为 vdom 然后再转为 html字符串返回给浏览器进行解析渲染, 浏览器接管渲染出来的页面,包括事件处理,响应式等; client 和 server 端分开构建, 执行对应的方法和逻辑.
参见链接: https://ssr.vuejs.org/zh/
项目实例: https://github.com/appleguardu/vue-server-render

## Nuxt.js
官方文档: https://www.nuxtjs.cn/guide

- 项目生成
```
直接是用vue-cli 脚手架
vue init nuxt/starter project-name
```
- 目录解释
```
|-- .nuxt                            // Nuxt自动生成，临时的用于编辑的文件，build
|-- assets                           // 用于组织未编译的静态资源入LESS、SASS 或 JavaScript
|-- components                       // 用于自己编写的Vue组件，比如滚动组件，分页组件
|-- layouts                          // 布局目录，用于组织应用的布局组件，不可更改。
|-- middleware                       // 用于存放中间件
|-- pages                            // 用于存放写的页面，我们主要的工作区域
|-- plugins                          // 用于存放JavaScript插件的地方
|-- static                           // 用于存放静态资源文件，比如图片
|-- store                            // 用于组织应用的Vuex 状态管理。
|-- .editorconfig                    // 开发工具格式配置
|-- .eslintrc.js                     // ESLint的配置文件，用于检查代码格式
|-- .gitignore                       // 配置git不上传的文件
|-- nuxt.config.json                 // 用于组织Nuxt.js应用的个性化配置，已覆盖默认配置
|-- package-lock.json                // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
|-- package-lock.json                // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
|-- package.json                     // npm包管理配置文件
```
- 常用配置项
```
# ip,port, 在 package.json 中增加
"config": {
    "nuxt": {
      "host": "0.0.0.0",
      "port": "8888"
    }
  }
# nuxt.config.js
配置全局的 css
配置 webpack 打包等
```
- 路由页面配置
```
// 页面组件
直接在 pages 目录中创建文件夹, nuxt会把文件夹映射生当前层级的路由
// 页面跳转
<nuxt-link :to="{name:'index'}">home</nuxt-link> 组件
// 路由传参
<nuxt-link :to="{name: 'news', params: {id:1}}">新闻事件</nuxt-link>
// 动态路由: 可以理解为详情页
目录下创建一个_id.vue 文件
// 动态参数校验: 不存在则返回错误页
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
}
```
- 页面过渡效果
```
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
页面组件中的 transition 属性的值设置为 test 即可：
export default {
  transition: 'test'
}
全局的直接设置为 page-enter-active...
```
- 默认模板和布局
```
// 新建一个 app.html 模板
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }} 读取的是nuxt.config.js里的信息
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }} 是我们写的pages文件夹下的主体页面
  </body>
</html>

// layouts/default.vue 默认布局
// layouts/blog.vue 自定义布局, 页面组件中通过 layout 属性设置
```
- 个性化 meta 设置
```
<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      title: this.$route.params.title
    }
  },
  // 设置独立的 head
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'news',
          content: 'this is content'
        }
      ]
    }
  }
}
</script>
```
- 获取异步数据
```
asyncData方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用。
export default {
  async asyncData ({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```