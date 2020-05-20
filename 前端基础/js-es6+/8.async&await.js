/**
 * async&await
 * async函数: Generator 函数的语法糖
 */

// 1.原生的Generator函数
var fn = function (v) {
  return new Promise((reslove, reject) => {
    reslove(v)
  })
}

// new Promise((reslove, reject) => {
//   console.log('ppppp');
//   reslove('p')
// }).then((res) => { console.log(res); })

function* genFn() {
  console.log('start');
  yield fn('s1').then(res => { console.log('result', res) })
  console.log('111111');
  yield fn('s2').then(res => { console.log('result', res) })
  console.log('2222222');
}
var g = genFn()
// console.log(g.next());
// 111 { value: Promise { <pending> }, done: false }
// console.log(g.next());
// 111111 { value: Promise { <pending> }, done: false }
// console.log(g.next());
// 2222222 { value: undefined, done: true }

// 1s后: result s1 result s2

// 传入生成器函数, 实现自执行 next()
function co(gen) {
  gen = gen() // gen: 迭代器对象
  // gen.next() => { value: Promise { <pending> }, done: false }
  return next(gen.next())

  function next({ done, value }) {
    return new Promise(resolve => {
      if (done) {
        resolve(value)
      } else {
        value.then(data => {
          // 回收执行权
          next(gen.next(data)).then(resolve)
        })
      }
    })
  }
}

function genPromise(v) {
  return new Promise((resolve, reject) => {
    console.log(v);
    resolve(v)
  })
}

function* Gen() {
  var n1 = yield genPromise(100)
  var n2 = yield genPromise(200)
  console.log('end yield');
  return n1 + n2
}

// co(Gen).then(res => {
//   console.log('result:', res);
// })
function genPromise(v) {
  return new Promise((resolve, reject) => {
    console.log(v);
    resolve(v)
  })
}
console.log('start script');
// async + await改写
async function GenAsync() {
  console.log('start async')
  // await 语法本质上还是嵌套执行
  // 通过 promise.then 的方式延迟执行了, 被放到了一层层微任务队列里, 执行时序被推迟
  let num1 = await genPromise(1) // 延迟执行,创建微任务, 下一轮微任务执行, 等待本轮宏任务执行完毕
  let num2 = await genPromise(2) // 延迟执行,创建微任务, 下一轮微任务执行
  await f()                      // 延迟执行,创建微任务, 下一轮微任务执行
  console.log('end async');
}

async function f() {
  console.log('ffff');
}
GenAsync()
new Promise((reslove, reject) => {
  console.log('promise start');
  reslove()
}).then(() => {
  console.log('promise then1');
}).then(() => {
  console.log('promise then2');
}).then(() => {
  console.log('promise then3');
}).then(() => {
  console.log('promise then4');
}).then(() => {
  console.log('promise then5');
}).then(() => {
  console.log('promise then6');
}).then(() => {
  console.log('promise then7');
}).then(() => {
  console.log('promise then8');
})
console.log('end script');

/**
 * 小结:
 * await后面的代码会包装成新的 promise
 * await下面会放到新的 promise 的 then 中执行, 也就是一下轮微任务中(任务为空的话,就什么都不做)
 * 微任务嵌套微任务, 看.then 的执行时机
 */

// ********************************************************************

new Promise((reslove, reject) => {
  console.log('promise1 start');
  reslove()   
}).then(() => {
  console.log(1); // 第1轮微任务
}).then(() => {
  console.log(3); // 第2轮微任务
})

new Promise((reslove, reject) => {
  console.log('promise2 start');
  reslove()   
}).then(() => {
  console.log(2); // push 到第1轮微任务队列
}).then(() => {
  console.log(4); // push 到第2轮微任务队列
})

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() { console.log('async2') }
async1();
new Promise(function (resolve) {
  resolve();
}).then(function () {
  console.log('promise2')
}).then(function () {
  console.log('promise3')
}).then(function () {
  console.log('promise4')
})
console.log('end')

// 代码解析: node 环境下
/**
async function async1() {
  return new Promise(resolve => {
    resolve(async2())
  }).then(() => {
    console.log('async1 end')
  })
 */

// ==> 

/**
async function async1() {
 return new Promise(resolve => {
   Promise.resolve().then(() => {
     async2().then(resolve)
   })
 }).then(() => {
   console.log('async1 end')
 })
}
 */

// node下: 
// async2
// end
// promise2
// promise3
// async1 end
// promise4

// function async1(){
//   console.log('async1 start')
//   return Promise.resolve(async2())
//       .then(() => { console.log('async1 end') });
// }

// 浏览器下:
// async2
// end
// async1 end
// promise2
// promise3
// promise4


// node 规范:
// await fn() => return new Promise(resolve => resolve(fn())) 放到队列

// 浏览器规范
// await fn() => return Promise.resolve(fn())) 直接执行

new Promise((resolve) => {
  resolve(thenable);
  // thenable会先被放到队列里
});

// 等价于 ==>

new Promise((resolve) => {
  Promise.resolve().then(() => {
    thenable.then(resolve);
  });
});