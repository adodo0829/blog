// 抽象工厂: 抽象产品和具体产品, 抽象工厂和具体工厂
// 找出代码中所有对产品构造函数的直接调用，将其替换为对工厂对象中相应构建方法的调用
// 替代new

// 抽象接口
interface IFactory {
  createButton: () => void
  createInput: () => void
}

// 具体工厂类
