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
Function.prototype.myBind = function (ctx) {
  // 处理 myBind传入的参数, 通过 arguments
  let ctx = [].shift.call(arguments) // 待绑定的上下文
}
