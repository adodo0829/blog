/**
 * 动手实现promise
 * 参考: promsie A+规范
 * https://www.ituring.com.cn/article/66566
 */

// 先解析一下A+规范
// 1.首先promise是一个拥有then方法的对象或函数

// 2.一个promise必须具备一个状态
//    等待状态: Pending
//    执行状态: Fulfilled
//    拒绝状态: Rejected

// 3.promise接受一个执行函数, 这个执行函数默认立即执行, 并且这个函数参数为两个函数: resolve和reject
// resolve调用时, promise状态变为fulfilled, 并且给then方法的成功回调传递一个终值value
// reject调用时, promise状态变为rejected, 并且给then方法的失败回调传递一个拒因reason
// 注意: 执行函数中抛出错误也走reject的逻辑

// 4.如果同时调用reslove和reject, 只会执行一个, 一个promise只能做一次状态的变更

// 5.核心: then方法, 一个promise返回的实例必须有一个then方法用来访问终值value和拒因reason
// promise.then(onFulfilled, onRejected)
// onFulfilled必须是一个函数: 接受promise中resolve出来的值
// onRejected必须是一个函数: 接受promise中reject出来的值

// 6.重点: then方法链式调用: 解决回调嵌套的关键
// 那么如何实现then链式调用? 即同一个promise实例可以多次调用then方法, 且上一步的输出作为下一步的输入

// 这里其实then返回了一个新的promise, 并延迟执行获取到这个promise, 将上一步的值 通过reslove和reject透传出去

// then方法的回调处理的值: 普通值, 异常值, promise值, 针对这三种情况分别处理
// 关键点: then链中的成功回调和失败回调都会被存放到各自队列里, 等待新promise状态变更是调用
// 这里就用到了发布订阅模式

// 我们先来实现一个简易的Promise
const STATE = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

class Promise {
  // 每个实例接受一个执行函数
  constructor(executor) {
    // 初始化一个Promise所要做的事, 都在这里做

    this.status = STATE.pending; // 初始状态
    this.value = void 0;
    this.reason = void 0;
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    const resolve = (value) => {
      // 调用resolve, 状态变更, 参数值需要保持才能传递
      // 并且resolve只能调用一次, 所以还要对实例状态进行判断
      if (this.status !== STATE.pending) return;
      this.status = STATE.fulfilled;
      this.value = value;

      this.onFulfilledCbs.forEach(cb => cb()) // 自动执行then的回调
    };

    const reject = (e) => {
      // 同理
      if (this.status !== STATE.pending) return;
      this.status = STATE.rejected;
      this.reason = e;

      this.onRejectedCbs.forEach(cb => cb()) // 自动执行then的回调
    };

    // 默认立即执行executor, 其中这两个回调函数要事先定义
    // 执行代码出错也走 reject逻辑, 所以要cathc一下
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 这里还没参数校验
    // then方法调用时机: 状态变更, 即执行函数中调用了resolve或者reject
    if (this.status === STATE.fulfilled) {
      typeof onFulfilled === "function" && onFulfilled(this.value);
    }
    if (this.status === STATE.rejected) {
      typeof onRejected === "function" && onRejected(this.reason);
    }
    // 要是没有调用resolve或者reject呢? 我们将存到各自的回调队列里
    // 等到resolve时我们就全部取出来执行
    if (this.status === STATE.pending) {
      this.onFulfilledCbs.push(() => {
        onFulfilled(this.value);
      });

      this.onRejectedCbs.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

module.exports = Promise;
