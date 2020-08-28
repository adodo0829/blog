// useMemo()是定义一段函数逻辑是否重复执行

// 由于组件状态更新后会触发render, 有时候我们不希望组件内部所有东西都更新
// 比如: 父组件改变自身数据，不涉及子组件数据变化，就会在父组件每次render时都渲染子组件。
// 因此需要做一些优化

// useMemo: 接受一个函数, 和一个依赖值 => 函数中对依赖值处理后的返回值
import React, { memo, useState, useMemo } from "react"

const FC = () => {
  const [value, setValue] = useState(0);

  const increase = useMemo(() => {
    if (value > 2) return value + 1; // 值大于2 increase才有值
  }, [value]);

  return increase
}

// memo: 判断一个函数组件的渲染是否重复执行
const Child = memo(function Child(props) {
  console.log('Child render') // 只有当props发生变化时, Child才会渲染
  return <h1>value: {props.value}</h1>;
})
