import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue) //      1.初始化_init方法
stateMixin(Vue) //     2.初始化$set $delete $watch
eventsMixin(Vue) //    3.初始化vue中的$on $emit事件
lifecycleMixin(Vue) // 4.初始化_update方法
renderMixin(Vue) //    5.初始化_render方法

export default Vue
