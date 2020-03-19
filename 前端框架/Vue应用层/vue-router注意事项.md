# vue-router 踩坑

## 使用导航守卫beforeEach时堆栈溢出
- next() 表示路由成功，直接进入to路由，不会再次调用router.beforeEach()
- next('/xxx') 表示路由拦截成功，重定向至xxx，会再次调用router.beforeEach()
```
这里可能出现返回调用的情况;
所以, 当一系列条件判断完后, 最终的出口必须是 next()
```

