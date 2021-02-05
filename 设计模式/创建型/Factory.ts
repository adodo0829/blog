// 工厂方法: 基类中提供一个创建对象的方法，子类决定实例化对象的类型

/**
 * 具体产品: 产品接口的不同实现, 产品的子类
 * 创建者: 声明返回产品对象的工厂方法
 * 具体创建者: 返回不同类型的产品, 创建者的子类
 */

// 产品: 声明接口, 适用于所有创建者, 必须实现
interface IProduct {
  operation: () => string
}

/**
 * 抽象类（Abstract Class): 抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
 * 创建者: 父类, 声明返回产品对象的工厂方法
 */
abstract class Creator {
  // 声明抽象方法, 返回实例对象
  public abstract factoryFunc(): IProduct

  // 加入一些操作逻辑
  public init(): string {
    const instance = this.factoryFunc() // 核心就是实现一个factoryFunc来创建对象
    const res = instance.operation()
    this.start()
    return res
  }
  // ...其他的操作
  public start(): void {
    console.log('start to work')
  }
}

/**
 * 具体类: 实现父类方法
 * 具体创建者: 创建者子类, 重写工厂方法获取具体产品
 * 这里我们可以重写operation 的逻辑, 让每个产品有自己的行为
 */
class SubCreator1 extends Creator implements IProduct {
  public factoryFunc(): IProduct {
    return new SubCreator1()
  }

  public operation(): string {
    const str = 'i am the apple'
    return 'SubCreator1 created' + str
  }
}

class SubCreator2 extends Creator implements IProduct {
  public factoryFunc(): IProduct {
    return new SubCreator2()
  }

  public operation(): string {
    const str = 'i am the pie'
    return 'SubCreator2 created' + str
  }
}

const createProduct = (creator: Creator) => {
  console.log('--------------')
  console.log(creator.init())
}

// 根据配置创建 不同的子类
createProduct(new SubCreator1())
createProduct(new SubCreator2())

// 使用场景:
// 代替对于对象构造函数的直接调用（即使用 new 运算符）
// 单一职责原则。你可以将产品创建代码放在程序的单一位置，从而使得代码更容易维护
// 开闭原则。无需更改现有客户端代码，你就可以在程序中引入新的产品类型
// 避免创建者和具体产品之间的紧密耦合

// 需要创建多个子类