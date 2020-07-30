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

## 6.useRef
**useRef的作用**
- 获取DOM元素的节点: 操作自己和子元素(子元素通过const ChildRef = React.forwardRef(Child)传递)
- 获取子组件的实例: (子组件为class类组件)
- 渲染周期之间共享数据的存储 (通过给useRef返回的对象赋值, 设置成全局的变量, 跨多个effect来控制他)

```tsx
// 1.操作DOM
// 1.1操作自己
const refObj = useRef<HTMLDivElement>(null)
const eleNode = refObj.current
// 1.2操作子元素DOM
const Child1 = React.forwardRef(Child)
const inputRef = useRef()
inputRef.current.value = 'focus';
inputRef.current.focus()
<Child1 ref={inputRef} />

// 2.获取子元素实例, 子元素为类组件
const childInstance = useRef() // react instatce obj
<ChildRef ref={childInstance} />

// 3.跨Effect共享数据
const Index: FC = () => {
  const [count, setCount] = useState(0);
  // 把定时器设置成全局变量使用useRef挂载到current上
  const timer = useRef() as any;
  console.log(timer);

  // 首次加载useEffect方法执行一次设置定时器
  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);
  // count每次更新都会执行这个副作用，当count > 5时，清除定时器
  useEffect(() => {
    if (count > 5) {
      clearInterval(timer.current);
    }
  });
  return <h6>count: {count}</h6>;
};
```

## 7.useImperativeHandle
可以操作子组件中多个DOM元素
useImperativeHandle可以让你在使用 ref 时, 自定义暴露给父组件的实例值

```tsx
function Child(props: any, parentRef: any) {
  // 子组件内部自己创建 ref
  let focusRef = useRef() as any;
  let inputRef = useRef() as any;
  useImperativeHandle(parentRef, () => {
    // 这个函数会返回一个对象
    // 该对象会作为父组件 current 属性的值
    // 通过这种方式，父组件可以使用操作子组件中的多个 ref
    return {
      focusRef,
      inputRef,
      name: "计数器",
      focus() {
        focusRef.current.focus();
      },
      changeText(text: string) {
        inputRef.current.value = text;
      },
    };
  });

  return (
    <>
      <input ref={focusRef} />
      <input ref={inputRef} />
    </>
  );
}

const ForwardChild = forwardRef(Child);

```

## 8.custom hook
自定义hook: 函数, 使用了其他hook的函数

```ts
/**
 * 自定义 Hook 更像是一种约定，而不是一种功能。
 * 如果函数的名字以 use 开头，并且调用了其他的 Hook，则就称其为一个自定义 Hook
 * 有时候我们会想要在组件之间重用一些状态逻辑，之前要么用 render props ，要么用高阶组件，要么使用 redux
 * 自定义 Hook 可以让你在不增加组件的情况下达到同样的目的
 * Hook 是一种复用状态逻辑的方式，它不复用 state 本身
 * 事实上 Hook 的每次调用都有一个完全独立的 state
 */

import { useState, useEffect } from 'react'

const useNumber = () => {
  const [num, setNum] = useState(0)

  useEffect(() => {
    
    const timer = setInterval(() => {
      setNum(num => num + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return [num, setNum]
}

export default useNumber
```

## 9.useCallback
缓存函数引用

```ts
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
在a和b的变量值不变的情况下，memoizedCallback的引用不变。
即：useCallback的第一个 入参函数 会被缓存，从而达到渲染性能优化的目的。
useCallback缓存的是函数引用

```tsx
const Index: FC = () => {
  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  // 每次组件渲染时这个handleCount都是重新创建的一个新函数
  // const handleCount = () => setCount(count + 1);

  // 此时使用useCallback来缓存了函数，依赖项(deps)是一个空数组它代表这个函数在组件的生成周期内会永久缓存
  // deps[]中依赖项不变的话, 函数引用也不变
  const handleCount = useCallback(() => setCount(count => count + 1), []);
  const handleTotal = () => setTotal(total + 1);
  const prevHandleCount = usePrevProps(handleCount);

  console.log(prevHandleCount, handleCount);
  console.log("两次处理函数是否相等：", prevHandleCount === handleCount);

  return (
    <div>
      <div>Count is {count}</div>
      <div>Total is {total}</div>
      <br />
      <div>
        <button onClick={handleCount}>Increment Count</button>
        <button onClick={handleTotal}>Increment Total</button>
      </div>
    </div>
  );
};
```

## 10. useMemo
缓存函数的返回值

```ts
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
// 可理解：在a和b的变量值不变的情况下，memoizedValue的值不变。
// 即：useMemo函数的第一个入参函数不会被执行，从而达到节省计算量的目的。
// useMemo缓存计算数据的值
```

- 实例
```tsx
const Index: FC = () => {
  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const calcValue = React.useMemo(() => {
    return Array(100000)
      .fill("")
      .map((v) => /*一些大量计算*/ v + 1);
      // 只有当count变量值改变的时候才会执行useMemo第一个入参的函数
  }, [count]);

  const handleCount = () => setCount((count) => count + 1);
  const handleTotal = () => setTotal(total + 1);
  const prevCalcValue = usePrevProps(calcValue);
  
  console.log("两次计算结果是否相等：", prevCalcValue === calcValue);
  return (
    <div>
      <div>Count is {count}</div>
      <div>Total is {total}</div>
      <div>
        <button onClick={handleCount}>Increment Count</button>
        <button onClick={handleTotal}>Increment Total</button>
      </div>
    </div>
  );
};
```