/**
 * instanceof
 * 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链
 * 分析:
 * 去实例的原型链中寻找一个属性进行比对 => 一个对象遍历的过程
 * instance.__proto__ === FUNC.prototype
 */


/**
 * @param { Object } instance 
 * @param { Function } Func
 * @return { Boolean } 
 */
function findSelfPrototype(instance, Func) {
  // 此处省略参数校验...
  let prototype1 = Func.prototype
  let prototype2 = instance.__proto__
  while (true) {
    if (isNullOrUndefined(prototype2)) {
      return false
    }
    if (prototype2 === prototype1) {
      return true
    }
    // 继续找
    prototype2 = prototype2.__proto__
  }
}

function isNullOrUndefined(val) {
  return val === null || val === undefined
}

function Func() {

}

let f = new Func()

console.log(findSelfPrototype(f, Func))