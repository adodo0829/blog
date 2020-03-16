/**
 * new 关键字实现, 通过 new Function的方式创建一个实例对象
 * 1.创建一个对象
 * 2.指定原型
 * 3.绑定 this
 * 4.返回这个对象
 * js中可以通过 new Function的方式创建一个实例对象
 * 分析: 
 * 我们需要接受一个构造函数和一些实例属性, 创建我们想要的实例对象
 */

function createInstance(constructorFunc, ...args) {
  // 校验参数
  if (!constructorFunc.prototype) {
    throw new Error('First argument is not a constructor function!!!')
  }
  // 创建一个空对象
  let obj = {}
  // 获取构造函数, 并指定原型对象, 及实例的__proto__属性
  Object.setPrototypeOf(obj, constructorFunc.prototype)
  console.log(obj.__proto__);
  // 生成实例对象, 绑定this到 obj, 执行 Constructor
  let instanceObj = constructorFunc.apply(obj, args)
  // 返回该实例对象
  if (instanceObj && (instanceObj instanceof Object)) {
    return instanceObj
  } else {
    return obj
  }
}
function Func(name, gender) {
  this.xx = name
  this.gender = gender
  // 如果这里 return 一个对象, 则 new 返回这个对象
  // 如果 return 一个原始值, 则返回实例对象
}
Func.prototype.say = function() {
  console.log(`my name is ${this.xx}`)
}

let func1 = createInstance(Func, 'huhua', 'male')
console.log(func1.xx, func1.gender)
func1.say()

// ************
// Object.setPrototypeOf()是ECMAScript 6最新草案中的方法，相对于 Object.prototype.__proto__ ，它被认为是修改对象原型更合适的方法