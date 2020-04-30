# vue nextTick源码理解
[nextTick 源码地址](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js#L90)
vue 在修改data中的数据到视图试图更新的过程: 就是一个“setter -> Dep -> Watcher -> patch -> 视图update”的过程. 如果一个 data 中数据被连续更改 100 次, 是不是触发 100 次的更新呢? 显然不会...
这里 vue 通过 nextTick 实现了DOM批量异步更新...

## nextTick 源码逐行解释
```js
  // 回调函数队列
  var callbacks = [];
  // 标志位
  var pending = false;
  // 触发 callbacks 队列中的函数
  function flushCallbacks() {
    pending = false;
    //[].slice(0) 浅拷贝
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    console.log(copies)

    for (var i = 0; i < copies.length; i++) {
      //执行回调函数
      copies[i]();
    }
  }

  // Here we have async deferring wrappers using both microtasks and (macro) tasks. 
  // In < 2.4 we used microtasks everywhere, but there are some scenarios where 
  // microtasks have too high a priority and fire in between supposedly  
  // sequential events (e.g. #4521, #6690) or even between bubbling of the same 
  // event (#6566). However, using (macro) tasks everywhere also has subtle problems 
  // when state is changed right before repaint (e.g. #6813, out-in transitions). 
  // Here we use microtask by default, but expose a way to force (macro) task when  
  // needed (e.g. in event handlers attached by v-on). 
  // 这里,我们默认使用微任务,但是暴露一种方法来强制（宏）任务
  // 在这里,我们使用了微任务和宏任务的异步包装器。
  // 在< 2.4中,我们到处使用微任务,但也有一些场景。
  // 微任务优先级太高,据称介于两者之间。
  // 序贯事件（例如α4521,α6690）,甚至在同一气泡之间
  // 事件（α6566）。然而,到处使用（宏）任务也有微妙的问题。
  // 当状态在重新绘制之前被正确改变（例如,α6813,在过渡中出现）。
  // 需要的（例如在事件处理程序中附加的V-on）。

  var microTimerFunc; // 微任务派发功能
  var macroTimerFunc; // 宏任务派发功能
  var useMacroTask = false; // 使用宏任务
  
  // Determine (macro) task defer implementation. 
  // Technically setImmediate should be the ideal choice, but it's only available 
  // in IE. The only polyfill that consistently queues the callback after all DOM 
  // events triggered in the same loop is by using MessageChannel. 
  // 确定（宏）任务延迟实现。
  // 技术上应该是理想的选择,但它是唯一可用的。
  // 在IE.中,唯一的填充在所有DOM之后始终排队回叫。
  // 在同一循环中触发的事件是通过使用消息通道。

  /* istanbul ignore if */
  //判断setImmediate 是否存在,如果存在则判断下是是否是系统内置函数
  if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    //函数表达式赋值给macroTimerFunc
    macroTimerFunc = function () {
      setImmediate(flushCallbacks);
    };
  } else if (typeof MessageChannel !== 'undefined' && (
    isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]'
  )) {
    //如果有 消息体 内置函数则实例化
    var channel = new MessageChannel();
    //获取端口2
    var port = channel.port2;
    //设置端口1 的接受函数为flushCallbacks
    channel.port1.onmessage = flushCallbacks;
    //端口2推送信息给端口1
    macroTimerFunc = function () {
      port.postMessage(1);
    };
  } else {
    // 异步执行
    macroTimerFunc = function () {
      setTimeout(flushCallbacks, 0);
    };
  }

  // Determine microtask defer implementation.
  // 确定微任务延迟执行。
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    // 声明一个成功的 Promise
    var p = Promise.resolve();
    //microTimerFunc 一个异步 队列函数
    microTimerFunc = function () {
      p.then(flushCallbacks);
      // in problematic UIWebViews, Promise.then doesn't completely break, but 
      // it can get stuck in a weird state where callbacks are pushed into the 
      // microtask queue but the queue isn't being flushed, until the browser 
      // needs to do some other work, e.g. handle a timer. Therefore we can 
      // "force" the microtask queue to be flushed by adding an empty timer. 
      // 在有问题的UIWebVIEW中,Promise.then并没有完全崩溃,而是
      // 它可能会陷入一种怪异的状态,其中回调被推到
      // 微任务队列,但队列没有刷新,直到浏览器
      // 需要做一些其他的工作,例如处理计时器。因此我们可以
      // [强制]通过添加空计时器来刷新微任务队列。

      // 如果是ios, 派发macro
      if (isIOS) {
        setTimeout(noop);
      }
    };
  } else {
    // 如果无法派发micro,就退而求其次派发为macro
    microTimerFunc = macroTimerFunc;
  }

  /**
   * Wrap a function so that if any code inside triggers state change, 
   * the changes are queued using a (macro) task instead of a microtask. 
   * 包装一个函数,如果内部的任何代码触发状态改变,
   * 使用宏（宏）任务而不是微任务对这些队列进行排队
   */
  function withMacroTask(fn) {
    //宏任务
    return fn._withTask || (fn._withTask = function () {
      useMacroTask = true;
      var res = fn.apply(null, arguments);
      useMacroTask = false;
      return res
    })
  }

  //为callbacks 收集队列cb 函数 并且根据 pending 状态是否要触发callbacks 队列函数
  function nextTick(cb, ctx) {
    //cb 回调函数
    //ctx this的指向
    var _resolve;
    //添加一个回调函数到队列里面去

    callbacks.push(function () {
      if (cb) {
        //如果cb存在 并且是一个函数就执行
        try {
          cb.call(ctx);
        } catch (e) {
          //如果不是函数则报错
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        //_resolve 如果存在则执行
        _resolve(ctx);
      }
    });

    // 这里会检查上一个异步任务队列（即名为callbacks的任务数组）是否派发和执行完毕了。
    // pending此处相当于一个锁
    if (!pending) {
      pending = true;
      // 确认 pending 锁是开着的（false）,就把它设置为锁上（true）,
      // 然后对当前 callbacks 数组的任务进行派发（丢进 micro 或 macro 队列）和执行。
      // 设置 pending 锁的意义在于保证状态更新任务的有序进行,避免发生混乱
      if (useMacroTask) {
        macroTimerFunc(); //异步触发 或者 实现观察者触发callbacks 队列中的函数
      } else {
        microTimerFunc(); //异步触发 或者 实现观察者触发callbacks 队列中的函数
      }
    }

    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
      //如果回调函数不存在 则声明一个Promise 函数
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
```
## 源码过程分析
nextTick 函数,传入一个 cb,这个 cb 会被存储到一个队列中,在下一个 tick 时触发队列中的所有 cb 事件.


#### 何时调用的nextTick
```
data 
=> setter
=> dep.notify() 
=> watcher.update() 
=> queueWatcher(this)  // watcher把自身传进了queueWatcher()

在queueWatcher方法中
=> queue.push(watcher)  // 在push之前会检查queue中是否已有该watcher
=> !waiting && waiting = true && nextTick(() => {
		// ... 执行queue中所有watcher的run
    waiting = false
	})

当触发某个数据的 setter 方法后,对应的 Watcher 对象其实会被 push 进一个队列 queue 中,
在下一个 tick 的时候将这个队列 queue 全部拿出来 run
（ Watcher 对象的一个方法,用来触发 patch 操作） 
```
