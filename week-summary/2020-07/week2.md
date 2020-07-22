# 1.个人

## ts 相关

<http://semlinker.com/ts-keyof/#%E5%9B%9B%E3%80%81keyof-%E4%B8%8E-typeof-%E6%93%8D%E4%BD%9C%E7%AC%A6>

- keyof & typeof

```js
interface IPerson {
  name: string
  age: number
}

const person = {
  name: 'huhua',
  age: 26,
  job: 'fe'
}

// keyof 操作符, 操作对象是类型
// 用于获取某种类型的所有键，并返回键组成的联合类型
// 只对类型进行操作, 而不是对象
// 支持对 接口, 类, 基础类型的操作
type kp = keyof IPerson // "name" | "age"
// 常用场景就是取对象的某个键值
function getValueFromMap<T, K extends keyof T>(key: K, map: T) {
  return map[key]
}


// typeof 操作符, 操作对象是变量
// 用于获取我们所定义的变量的类型, 比如person变量
type p = typeof person

const num = 1
type n = typeof num
const num1: n = 1 // num1的类型必须是1

// typeof常用场景, 取到某变量对象的类型, 再通过keyof取其属性的类型
type personItem = keyof typeof person //
```

## react hooks

一系列引入 react 特性 的钩子函数(hook function), 执行时机, 执行顺序等;

Hook 是一个对 State 逻辑处理函数进行管理的管理者, 它通过队列的方式有效管理这些逻辑处理函数

- 一些特性

```js
// state的存储结构, 单向链表
{
  memoizedState: 1;
  next: {
    memoizedState: "ff";
    next: null;
  }
}
// hook的存储结构
var hook = {
  memoizedState: null,
  baseState: null,
  baseQueue: null,
  queue: null,
  next: null,
};
```

```txt
Hooks 会随着 FC ReRender 而重复执行
Hooks 和 State 都保存在一个单向链表中, 其中的 memoizedState 和 State 单向链表中的一致
读写 State 存在 mount 和 update 两条不同的路径
每个 FC 都有存有自己的 State 表

##  React 怎么知道哪个 state 对应哪个 useState？答案是 React 靠的是 Hook 调用的顺序

Hooks 只有在 mount 阶段才会去初始化 State, 而 mount 阶段是根据组件的状态来判断的, 所以 Hooks 虽然一直在 ReRun, 但是生命周期却并不一样

在 mount 阶段 Hooks 链表通过 memoizedState 映射到 State 链表, 但一旦进入 update 阶段, Hooks 不会检查映射是否正确, 此时 mount 阶段的建立的映射顺序就是读写正确的保障

```

### 使用 hooks 的规则:

- 1.函数组件 & 2.顶层顺序调用

```js
const Main: FC = () => {
  const [data, setData] = useState<ITableItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { default: res } = await import('../mock')
      setData(res.palletizeTaskList)
    }
    fetchData()
  }, [])

  return (
    <TableList tableData={data} />
  )
}
```

- 3.自定义 hook 调用

```js
import { useState, useEffect } from "react";
import moment from "moment";

type language = "en" | "zh-cn";

const DEAFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss"; // 年月日 时分秒 24小时制

const useClock = (format = DEAFAULT_FORMAT, lang: language = "en") => {
  const [time, setTime] = useState(Number(new Date()));

  // time state更新, FC会重新执行渲染, 注意逻辑
  if (lang === "zh-cn") {
    moment.updateLocale("zh-cn", {
      // 添加中文自定义配置
      weekdays: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
    });
  }

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime((p) => p + 1000);
    }, 1000);

    return () => {
      timerID && clearInterval(timerID);
    };
  }, []);

  return moment(time).format(format);
};
export default useClock;
```

#### 函数组件 FC

FC 的 ReRender 会导致内部的 Hooks 全部都执行一遍

```tsx
// 可以接受父组件传值, 事先用ts定义好组件对象参数的类型
interface PropsType {
  p1: string;
  p2: number;
  p3: string[];
}
const Main: FC<PropsType> = ({ p1, p2, p3 }) => {
  return (
    <>
      <p>{(p1, p2)}</p>
      {p3.map((item) => {
        return <span key={item}>{item}</span>;
      })}
    </>
  );
};
```

### useState

- 用来初始化一个函数组件(FC)所依赖的状态, 状态值变化, 组件重新 render;
- React 初始化就会自顶向下按照顺序调用 hooks

```js
const [state, setState] = useState(initState);
当使用多个useState的时候必须保证每次他们的调用顺序是一样的
initState可以是一个函数，用来处理initState需要经过复杂计算得到
```

### useEffect

- 替代生命周期的写法

```js
// 每次组件重新运行effect都会清除上一个effect，组件卸载的时候也会执行清除副作用的函数
// useEffect会在dom更新完成后才会执行
useEffect(() => {
  // do something
  return () => {}; // remove something
}, [a, b]); // 指定依赖项

// 第一个参数相当于class组件的componentDidMount和componentDidUpdate;

// return值相当于componentWillUnmount, 执行清除副作用的函数

// 第二个参数是一个数组，表示依赖项，只有依赖项发生改变时，第一个函数参数才会执行
// 当第二个参数不传递时，每次组件重新渲染都会重新运行effect（默认是依赖所有)
// 空数组表示无依赖性, 只调用一次
```

# 2.团队

## 组件库建设 hetu-component

组件, 文档(功能, API)

- useClock  
  结合 moment.js 实现一个格式化的系统时间 hook

## 业务,技术思考

- 页面适配

```
1.针对纯单页面,一屏下展示的页面(已知宽,高)
这类页面的适配方式采用 宽高比固定,整体缩放的方式会相对方便点,直接写尺寸即可

2.一屏展示不下的页面(已知宽度)
这类页面的适配方案更适合vw + rem方式进行布局, 基于适口宽度来调整页面元素的大小
```
