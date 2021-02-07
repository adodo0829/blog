// 抽象工厂: 抽象产品和具体产品, 抽象工厂和具体工厂
// 每个类仅负责一件事。如果一个类与
// 多种类型产品交互，就可以考虑将工厂方法抽取到独立的工
// 厂类或具备完整功能的抽象工厂类中


// 产品接口
interface IProductA {
  funcA(): string
}
interface IProductB {
  funcB(): string
  funcBB(collaborator: IProductA): string
}

// 具体产品
class ConcreteA1 implements IProductA {
  public funcA() {
    return '----product A1----'
  }
}
class ConcreteA2 implements IProductA {
  public funcA() {
    return '----product A2----'
  }
}

class ConcreteB1 implements IProductB {
  public funcB() {
    return '----product B1----'
  }
  public funcBB(collaborator: IProductA) {
    const res = collaborator.funcA()
    return `B1 + ${res}`
  }
}
class ConcreteB2 implements IProductB {
  public funcB() {
    return '----product B2----'
  }
  public funcBB(collaborator: IProductA) {
    const res = collaborator.funcA()
    return `B2 + ${res}`
  }
}

// 抽象接口: 需要返回各类抽象产品, 工厂必须实现
interface AFactory {
  makeProductA(): IProductA
  makeProductB(): IProductB
}

// 具体工厂
class ConcreteFactory1 implements AFactory {
  public makeProductA() {
    return new ConcreteA1()
  }
  public makeProductB() {
    return new ConcreteB1()
  }
}

class ConcreteFactory2 implements AFactory {
  public makeProductA() {
    return new ConcreteA2()
  }
  public makeProductB() {
    return new ConcreteB2()
  }
}

// 自己组合
const client = (factory: AFactory) => {
  const PA = factory.makeProductA()
  const PB = factory.makeProductB()
  console.log(PB.funcB())
  console.log(PB.funcBB(PA))
}

client(new ConcreteFactory1()) // 生产A1和B1
console.log('===============')
client(new ConcreteFactory2()) // 生产A2和B2