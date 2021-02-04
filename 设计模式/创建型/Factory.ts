// 工厂方法: 父类中提供一个创建对象的方法，让子类决定实例化对象的类型
// 创建者 制造 产品

/**
 * 产品: 声明接口, 适用于所有创建者
 * 具体产品: 产品接口的不同实现, 产品的子类
 * 创建者: 声明返回产品对象的工厂方法
 * 具体创建者: 返回不同类型的产品, 创建者的子类
 */

// 想创建的产品
interface FoodProps {
  eat: () => void;
}

// 具体产品
interface BreadProps extends FoodCreator {
  sell: () => void;
}

// 创建者:
class FoodCreator implements FoodCreator {
  constructor() {
    console.log("FoodCreator init");
  }
  // 默认方法
  eat() {
    console.log("foot can eat");
  }
}

// 具体创建者: 需要实现接口声明的方法和属性
class BreadCreator extends FoodCreator implements BreadCreator {
  constructor() {
    super();
    console.log("BreadCreator init");
  }

  sell() {
    console.log("bread can sell $5/per");
  }
}

type createType = 1 | 2;

class Factory<T> {
  createType: createType;
  constructor(createType: createType) {
    this.createType = createType;
  }

  init() {
    if (this.createType === 1) return (new FoodCreator() as unknown) as T;
    if (this.createType === 2) return (new BreadCreator() as unknown) as T;
  }
}

const factory1 = new Factory<FoodCreator>(1); // 工厂1, 创建食物
const factory2 = new Factory<BreadCreator>(2); // 工厂2, 创建面包

factory1.init().eat();
factory2.init().sell();

// FoodCreator init
// foot can eat
// FoodCreator init
// BreadCreator init
// bread can sell $5/per
