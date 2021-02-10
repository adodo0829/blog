// 生成器模式: 一步一步创建复杂对象;

/**
 * 生成器: 声明在所有类型生成器中通用的产品构造步骤接口
 * 具体生成器: 提供构造过程的不同实现
 * 产品: 最后生产的对象, 只有当产品较为复杂且需要详细配置时，使用生成器模式才有意义 
 * 主管: 定义调用构造步骤的顺序
 * 客户端: 将某个生成器对象与主管类关联,此后主管类就能使用生成器对象完成后续所有的构造任务
 */

interface Builder {
  createPartA(): void
  createPartB(): void
  createPartC(): void
}

// 产品: 功能集合
class Product1 {
  public parts: string[] = []

  public listParts() {
    console.log(`Pro Parts: ${this.parts.join(', ')}`)
  }
}

// 具体生产者: 生产具体产品
class ConcreteBuilder1 implements Builder {
  private product: Product1

  constructor() {
    this.reset()
  }

  public reset() {
    this.product = new Product1()
  }

  public createPartA() {
    this.product.parts.push('PartA1')
  }

  public createPartB() {
    this.product.parts.push('PartB1')
  }

  public createPartC() {
    this.product.parts.push('PartC1')
  }

  getProduct() {
    const res = this.product
    this.reset()
    return res
  }
}

// 主管: 执行生成步骤
class Director {
  private builder: Builder

  setBuilder(builder: Builder) {
    this.builder = builder
  }

  bulidPartOfProduct() {
    this.builder.createPartA()
  }

  buildFullProduct() {
    this.builder.createPartA()
    this.builder.createPartB()
    this.builder.createPartC()
  }
}

// 客户端: 让主管干活
function client(director: Director) {
  const builder = new ConcreteBuilder1()

  director.setBuilder(builder)
  director.bulidPartOfProduct() // 生产1
  director.buildFullProduct()   // 生产2
  builder.getProduct().listParts()

  // 自定义产品, 不经过director
  builder.createPartA()
  builder.createPartB()
  builder.getProduct().listParts()
}

const d = new Director()
client(d)

// 使 用 生 成 器 模 式 可 避 免 “重 叠 构 造 函 数 （telescopic constructor）”的出现
// 生成器模式让你可以分步骤生成对象，而且允许你仅使用必须的步骤。应用该模式后，你再也不需要将几十个参数塞进构造函数里了
// 使用生成器构造组合树或其他复杂对象