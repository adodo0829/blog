# react hooks
hook函数, 函数组件, react特性

## 1.useState
const [ count, setCount ] = useState(0)

参数: js中的数据类型, 参数为函数时, useState中的函数只会执行一次
返回值: 数组 [count, setCount]; 通过setCount可以设置更新后的值, setCount(count + 1)

** 注意state变化, 就会导致FC重新渲染, 重新执行内部逻辑 **

## 2.useEffect
通常我们在绑定事件、解绑事件、设定定时器、查找 dom 的时候，都是通过 componentDidMount、componentDidUpdate、componentWillUnmount 生命周期来实现的;
而 useEffect 会在组件每次 render 之后调用，就相当于这三个生命周期函数，只不过可以通过`传参`来决定是否调用

```js
useEffect(() => {

}, [])

// 参数1: 函数
() => {
  // do something: 相当于componentDidMount、componentDidUpdate
  window.addEventListener('resize', onChange, false)

  return () => {
    // clear something: 相当于componentWillUnmount
     window.removeEventListener('resize', onChange, false)
  }
}

// 参数2: 依赖数组

// 什么都不传，组件每次 render 之后 useEffect 都会调用，相当于 componentDidMount 和 componentDidUpdate
// 传入一个空数组 [], 只会调用一次，相当于 componentDidMount 和 componentWillUnmount
// 传入一个数组，其中包括变量，只有这些变量变动时，useEffect 才会执行
```

## 3.useReducer
适用于state 逻辑较复杂且包含多个子值, 或者下一个 state 依赖于之前的 state 等, 性能优化(传递dispatch方法)
提供了一种复杂state的管理功能

```tsx
function reducer(state: any, action: any) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
interface Iprops {
  [k: string]: number
}
// 父组件传值: initialState
const Counter = ({ initialState }: Iprops) => {
  // 1.指定初始 state: initialState
  // const [state, dispatch] = useReducer(reducer, initialState);
  // 2.惰性初始化: init 函数作为 useReducer 的第三个参数传入，这样初始 state 将被设置为 init(initialArg)。
  const [state, dispatch] = useReducer(reducer, initialState, (initialState) => {
    return { count: initialState }; // state
  })
  return (
    <>
      Count: {state.count}
      <div>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </div>
    </>
  );
};
```

## 4.useContext
当一些数据需要全局用到的业务场景下：例如切换用户登录信息、切换语言、切换主题，props层层传递数据就显得复杂繁琐。
Context提供了一种共享数据的方式，不用通过props层层传递数据，在任意一级组件中都可以直接获取到需要的数据。

提供了跨组件传值功能

```tsx
// themeContext
import React from 'react';
const defalutValue: any = null
const ThemeContext = React.createContext(defalutValue);
export default ThemeContext;

// Parent
const Index = () => {
  return (
    // must be value=xxx
    <ThemeContext.Provider value="green">
      <CompA />
    </ThemeContext.Provider>
  );
};

// Child
export default () => {
  const bg = useContext(ThemeContext)
  console.log(bg); // green
  return (
    <p style={{ backgroundColor: bg }}>
      Hello World, Context color
    </p>
  )
}
```

## 5.useLayoutEffect
useEffect 在全部渲染完毕后才会执行, 滞后于layout执行
useLayoutEffect 会在 浏览器 layout 之后，painting 之前执行
其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect

可以使用它来读取 DOM 布局并同步触发重渲染
在浏览器执行绘制之前 useLayoutEffect 内部的更新计划将被同步刷新
尽可能使用标准的 useEffect 以避免阻塞视图更新
```tsx
import React, { useState, useLayoutEffect, useEffect } from "react";

function LayoutEffectComp() {
  const [color, setColor] = useState("red");

  useLayoutEffect(() => {
    // 每次先 alert
    alert(color);
  });

  useEffect(() => {
    console.log("color", color);
  });

  return (
    <>
      <div id="myDiv" style={{ background: color }}>
        bgColor
      </div>
      <button onClick={() => setColor("red")}>红</button>
      <button onClick={() => setColor("yellow")}>黄</button>
      <button onClick={() => setColor("blue")}>蓝</button>
    </>
  );
}
```