/**
 * 手动实现 async + await
 * 我们都知道它是 generator + promise 的语法糖, 如何实现的呢?
 * 首先,我们先摸清楚他的功能
 * async: 它标记的函数会返回一个 promise 实例
 * await: 它后面也会被包装一个 promise, 并且获取其 resolve 出来的值
 *        它必须在 async 内部使用
 *        多个await语句会顺序同步执行
 * 搞清楚功能, 我们就开始手写啦啦啦...
 */

// 首先要理解 generator 函数, 以及 yield 传值
// 他返回的是一个生成器对象{ next: fn, done: true }, 
// 必须手动调用其 next 方法才能获取值
// yield 会中断函数执行, 退出当前调用栈
// next()后重新获取执行权, 进入调用栈执行后续操作, 类似协程的操作
// yield 接受的值是 next 方法传入的, 并且首次传入的会被忽略
function promiseTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('i am async task value')
    }, 1000);
  })
}

// 通过生成器函数的 yield 我们将 await 后面的任务按顺序进行划分
function* genTask () {
  console.log('start')
  let res1 = yield promiseTask()
  console.log('res1: ', res1);
  let res2 = yield promiseTask()
  console.log('res2: ', res2);
  console.log('end');
  return 'task is done'
}

// 生成器必须手动调用 next() 方法才能获取持续执行权, 但是 async 函数可以一次性执行完
// 所以我们需要实现一个生成器函数自执行器
// 并且每一次执行还需要 await 后面的值传出来, 怎么传? next(value)

// async 返回一个 promise
// 同样, 这个函数需要返回一个promise 来供外部调用取值

function autoGenExecutor(genFn) {
  console.log(genFn.constructor.name);
  // 怎么保证自动持续执行next: 我们要一直获取genObj的引用 -> 闭包
  return function () {
    // 这里可以加个参数校验: genFn.constructor.name
    let genObj = genFn()
    
    // 想想怎么设计才能把只传出去, 还能一次性执行? 
    // 创建微任务队列, 微任务创建微任务最后一次性清空队列
    // 每个微任务 处理一个 genObj

    return new Promise((reslove, reject) => {
      
      let firstGen = genObj.next()
      handleNextFn(firstGen) // 首次处理
      
      function handleNextFn(gen) {
        let value, done
        try {
          value = gen.value
          done = gen.done
        } catch (error) {
          reject(error)
        }
        if (!done) {
          // 任务没执行完, 继续执行, 怎么继续?
          // 需要再次执行 handleNextFn 函数, 把 genobj 添加微任务队列
          return Promise.resolve(value).then(
            // 这里需要给 yield 传递上一次 next 的值 value
            resValue => handleNextFn(genObj.next(resValue)),
            // gen的throw方法抛出的错误要被内部捕获,前提是必须至少执行过一次next方法
            rejValue => handleNextFn(genObj.throw(rejValue))
          )
        } else {
          return reslove(value)
        }
      }
    })
  }
}

// 目标
let asyncPromise = autoGenExecutor(genTask)()
asyncPromise.then(res => console.log(res), rej=> console.log(rej))

// 我们看看结果顺序:
// start
// res1:  i am async task value
// res2:  i am async task value
// end
// task is done