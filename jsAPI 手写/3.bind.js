/**
 * bind实现: 
 * 1.绑定一个上下文对象
 * 2.对传入进行分配
 * 3.返回一个新函数
 * 分析: 
 * 我们需要接受一个绑定对象, 函数自己执行后返回一个更换 this 对象的新函数
 * fn 都是 Function 的实例, 所有函数对象都继承 bind
 * fn.bind(null, args)
 */

/**
 * bind() 方法创建一个新的函数, 当被调用时，将其 this 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
 * 语法：  fun.bind(thisArg[, arg1[, arg2[, ...]]])
 * 参数：thisArg：当绑定函数被调用时，该参数会作为原函数运行时的 this 指向
 * 当使用 new 调用绑定函数时，该参数无效。
 * arg1, arg2, ...：当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。
 * 返回值： 返回由指定的 this 值和初始化参数改造的原函数拷贝
 */
Function.prototype.myBind = function (ctx) {
  // 必须是函数调用bind
  if (typeof this !== 'function') {
    throw new TypeError('myBind must be called by function')
  }
  // 处理 myBind传入的参数, 通过 arguments获取
  let args = Array.prototype.slice.call(arguments, 1) // 参数集合
  
  let that = this
  let fn = function() {} // 解决 new 关键字调用问题
  
  let fBind = function () {
    return that.apply(
      // 如果是 new 调用绑定函数，此时绑定函数中的 this 是由 new 调用绑定函数返回的实例对象，这个对象的构造函数是 fBind
      this instanceof fn ? this : ctx,
      // 获取调用fBind的传参
      args.concat(Array.prototype.slice.call(arguments))
    )
  }

  // 维护原型关系
  // if (this.prototype) {
  //   // Function.prototype doesn't have a prototype property
  //   fn.prototype = this.prototype
  // }
  // fBind.prototype = new fn()
  return fBind;
}

function demo(x) {
  console.log(this.a);
  console.log(x);
}

let obj = { a: 'bind value' }

let f1 = demo.myBind(obj, 'xxx')
f1()