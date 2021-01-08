// 单例: 保证一个类仅有一个实例，并提供一个访问它的全局访问点

// 实现
// 用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象
class SingleTon {
  // 静态属性
  static instance = null

  constructor () {
    // 实例属性
  }

  // 静态方法
  static getInstance() {
    if (!SingleTon.instance) {
      return SingleTon.instance =  new SingleTon()
    }
    return SingleTon.instance
  }
}

let s1 = SingleTon.getInstance()
let s2 = SingleTon.getInstance()
console.log(s1 === s2)

// 使用场景
// 只需要创建一个实例的情况, 比如全局的对象
// 不管外部如何触发, 内部实际就触发一次, 单一职责
