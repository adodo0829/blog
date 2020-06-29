# JS 异步编程模型

再理解 js 异步编程时， 我们先再心中想一下为什么 js 语言会引入异步任务？异步到底解决了哪些问题？理解了这些之后，我们才能更好地运行异步编程思想去书写我们的业务代码逻辑。。。下面写一下个人对异步模型的理解

## JS 中的任务

所谓 js 中的任务，通俗点我们可以理解为等待运行的 js 代码（这里不搞那些专业术语），到此我们可以分为顺序立即执行的代码（同步任务），以及非立即顺序执行的代码（异步任务）。

- 两种任务分析

```txt
同步任务有个特点，就是顺序执行，代码被编译解析后按照既定的顺序去一步一步执行，这种执行方式效率高吗？视情况而定。
如果碰到一串耗时代码，意味着此代码段后面的代码需要等待该代码执行完毕他才能执行，这固然是不行的（代码运行被堵塞了）；

所以此时便引入异步的概念，我们把这段耗时任务扔给其他执行器（或者说线程）去处理，我们只需要获取其他执行器处理后的结果，
让结果代码滞后执行，或者说到相应的时机去执行（怎么去判断时机，发布订阅，先不说了）
让主线程继续执行其同步任务，这样效率是不是提高了，至少不会发生代码堵塞的问题了吧 ：）
```

- js 中异步任务

```txt
引入异步任务是为了提高代码执行的效率和速度，我觉得这只是结果的一部分。 为什么呢？

个人理解还是js这门语言的缺陷，js作为一种单线程语言，意味着它在处理 多任务并发时 没有了多线程语言（如java）的优势，
一个主线程下代码只得一行行执行咯；cpu的多核能力也不能完全发挥啊，emm...
所以异步任务的引入 一定程度上也提升了js在处理多任务的能力吧。

其实吧，js中异步任务（如网络请求，定时器， 事件监听等）是浏览器的其他进程/线程 为js主线程分担了处理多任务的压力，
浏览器其他进程/线程将异步任务处理后结果扔到js的事件循环机制的任务队列里，那么这里必然涉及到
进程/线程间的通信，一定程度上也是会损耗部分效率的
```

- 所以为什么引入异步？异步解决的问题？

```txt
宏观上来说：
    提升js代码执行效率， 怎么就提高了？ 思考一下
    提升js处理多任务的能力， 怎么去提升？ 思考一下
```

## js 如何实现异步机制

前面提到异步任务的概念：非立即执行的代码， 当然是不完全准确的啦，
js 中的异步任务会被放到任务队列（task queue）的任务，通过 js 事件循环机制（其实就是 js 主线程一直轮询访问任务队列）；
"任务队列"会通知 js 主线程，当某个异步任务可以执行了，该任务才会进入主线程的执行栈执行；

所以异步任务的特点之一是存在一种等待状态，滞后执行；那么 js 怎么来实现异步模式呢？

> 执行栈 + 任务队列

那么 js 中到底哪些才是异步任务呢？ 有具体规范吗？没找到明确的规范
`个人理解：凡是被放到事件队列里的任务就是异步任务，这些任务与运行环境相关`
而执行栈只是作为任务的消费者而已，真正生产异步任务的生产者是：浏览器那些 DOM API，网络线程，计时器线程；
node 环境下的事件等。。。

## js 实现异步编程的方式

异步编程为了啥？当然是为了更快的执行代码任务啊，怎么做？那代码为什么慢呢？任务太多了呀，所以我们要对任务进行合理拆分

### 1.回调函数

```js
f1(); // f1为耗时任务
f2(); // f2依赖f1的结果

function f1(cb) {
  setTimeout(() => {
    // f1 的逻辑代码
    // 。。。
    cb();
  });
}
f1(f2); // f1被转化为异步任务，f2在它之后执行
```

回调的方式代码耦合性太强，也不能捕获异常 try catch

### 2.事件监听

事件监听的本质在于 事件状态驱动，触发回调， 把阮老师的 demo 实现了一下

```js
const EVENT = {};

Function.prototype.on = function (eventName, cb) {
  EVENT[eventName] = cb;
};

Function.prototype.trigger = function (eventName) {
  EVENT[eventName]();
};

function f1() {
  setTimeout(() => {
    console.log("f1 start");
    // 触发事件
    f1.trigger("done");
  }, 1000);
}

function f2() {
  console.log("f2");
}

f1.on("done", f2); // 添加监听
f1();
```

实现了功能解耦，其实还是依靠回调函数， 只不过触发方式变化了， 不是直接嵌套在上一步任务里执行了

### 3.发布订阅

发布订阅基于事件监听，发布者和订阅者通过一个事件中心进行通信, 并且实现了多个事件解耦

```js
/**
 * 发布订阅方式
 * 维护一个事件中心进行通信
 */

const event = {
  // 事件中心
  eventList: [],

  // 订阅事件, 添加一个回调逻辑
  on(type, fn) {
    if (!this.eventList[type]) {
      this.eventList[type] = [];
    }
    this.eventList[type].push(fn);
  },

  // 发布事件, 遍历事件列表，去执行所有事件
  emit(type, ...args) {
    const cbList = this.eventList[type];
    if (!cbList || cbList.length === 0) return;

    cbList.forEach((cb) => {
      cb.apply(event, args);
    });
  },
};

let data = {};

// 我们可以订阅多个事件, 并且相比回调, 订阅结合发布完全解耦了, 两者并有关联性
event.on("change", (data) => {
  // 订阅者1的逻辑
  console.log("订阅者1: data obj change", data);
});

event.on("change", (data) => {
  // 订阅者2的逻辑
  if (Object.keys(data).length === 2) {
    console.log("订阅者2: data s数据有两个了", data);
  }
});

// 发布事件: 我们可以等待数据状态发生变化或者 异步执行完去发布
setTimeout(() => {
  data.name = "huhua";
  // 发布者, 我想在哪发就在哪发
  event.emit("change", data);
}, 1000);

setTimeout(() => {
  data.age = "26";
  event.emit("change", data);
}, 2000);
```

#### 既然说到了发布订阅, 我们顺便理解一下观察者模式

vue 源码中不是用到了吗...那我们动手写写, 看看发布订阅和观察者模式的区别

```js
/**
 * 观察者模式的简易实现
 * 观察者对象:   需要在被观察者状态变化时触发更新逻辑
 * 被观察者对象: 需要收集所有的对自己进行观测的观察者对象
 */

// 被观察者
// 对于一个被观察的人来说: 我要知道是哪些人在观察我, 我的状态怎么样
class Sub {
  constructor(name) {
    this.name = name;
    this.state = "pending";
    this.observer = []; // 存放所有观察者的集合
  }

  // 添加观察者
  add(ob) {
    this.observer.push(ob);
  }
  // 更改状态
  setState(newState) {
    this.state = newState;
    // 状态改了不得告诉所有观察者啊, 其实就是执行观察者对象的更新函数
    this.notify();
  }
  // 通知
  notify() {
    this.observer.forEach((ob) => ob && ob.update(this));
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }

  update(sub) {
    console.log(
      `观察者${this.name} 已收到被观察者${sub.name}状态改变了: ${sub.state}`
    );
  }
}

let sub = new Sub("学生小麦");

let ob1 = new Observer("语文老师");
let ob2 = new Observer("数学老师");
let ob3 = new Observer("英语老师");

// 与发布订阅不同的是, 这里被观察者需要添加所有的观察者对象, 以便在自己状态改变时去执行观察者的更新逻辑
// 二者有关联关系, 我要知道我被谁观察

// 发布订阅中, 发布者和订阅者之间没有关联关系, 通过事件中心来管理
// 订阅不需要知道谁去发布
sub.add(ob1);
sub.add(ob2);
sub.add(ob3);

sub.setState("fulfilled");
// 观察者语文老师 已收到被观察者学生小麦状态改变了: fulfilled
// 观察者数学老师 已收到被观察者学生小麦状态改变了: fulfilled
// 观察者英语老师 已收到被观察者学生小麦状态改变了: fulfilled

sub.setState("rejected");
// 观察者语文老师 已收到被观察者学生小麦状态改变了: rejected
// 观察者数学老师 已收到被观察者学生小麦状态改变了: rejected
// 观察者英语老师 已收到被观察者学生小麦状态改变了: rejected
```

### 4.Promise 对象

promise 为我们提供了一种新的异步编程方式, 写这篇文章目的也是为了手动实现一个满足 A+规范的 promise 对象;
我们先来看一看 promise A+规范 https://www.ituring.com.cn/article/66566

其实 promise 的核心就是 then 方法, 源码中也用到发布订阅模式思想, 通过 then 链的 链式回调将上一步结果透传给下一步使用,
解决了回调地狱的问题

手写 promise 正在进行中 ing...到时候附上链接

### 5.async + await

async + await 是最新的异步编程方案...比较符合我们的编码习惯

其实搞懂了 generator 函数和 promise 之后, async 和 await 就很好懂了, 我后面也实现了一遍
附上链接:
https://github.com/appleguardu/blog/blob/master/jsAPI%20%E6%89%8B%E5%86%99/4.async-await.js

还是说一下:
generator 函数是一个状态机，封装了多个内部状态
generator 函数除了状态机，还是一个遍历器对象生成函数
可暂停函数, yield 可暂停(保存上下文)，next 方法可启动，每次返回的是 yield 后的表达式结果
yield 表达式本身没有返回值，next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值

async+await 就是一个被包装的 generator 自执行器函数

## 参考

[异步编程](https://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)
