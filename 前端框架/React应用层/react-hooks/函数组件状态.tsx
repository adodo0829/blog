// 函数组件状态
import { useState } from 'react'

const FuncComponent = () => {
  // 1.函数内部依赖的状态更新, 组件render, 内部逻辑重新执行一遍
  // 所以需要注意状态值的改变, 避免出现无限render
  const [state, setState] = useState('') // 当依赖的状态变更时, 组件render

  return (
    <div>
      data: { state }
    </div>
  )
}