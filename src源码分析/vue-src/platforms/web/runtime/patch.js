/* @flow */

import * as nodeOps from 'web/runtime/node-ops' // 一些当前平台下操作dom的方法
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index' // 解析指令
import platformModules from 'web/runtime/modules/index' // 处理dom属性的一系列方法

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

export const patch: Function = createPatchFunction({ nodeOps, modules })
