/**
 * 泛型
 */

 /**
  * 泛型: 意义在于做到类型重用, 通常用在函数, 接口, 和类中对成员进行约束;
  * ts 中使用<T>的形式来表示结构为一个泛型
  * 声明的时候: T是一个未确定的类型, 我们可以理解为一个类型参数 
  * 运行的时候: T会被指定一个类型, 相当于一个参数
  */

// 当函数、接口、类是接受多个类型参数的时候,我们可以用泛型提高类型可重用性
// 不然要声明一大堆类型

/**
 * 泛型函数: T约束参数,返回值,函数内成员的类型
 * @param value 元素
 * @param len 数组长度
 */
function createArray<T>(value: T, len:number = 5) : T[] {
  // 生成一个数组由 T 类型元素组成的数组
  let arr: T[] = []
  for (let index = 0; index < len; index++) {
    arr[index] = value
  }
  return arr
}

// *********************** 泛型应用: 函数 **************************
/**
 * 多个类型约束的泛型函数
 * 交换元组值
 */
function swap<T, U>(tuple: [T, U]) :[U, T]{
  return [tuple[1], tuple[0]]
}

// 总之, 泛型函数注意三点: 泛型声明 fn<T>, 参数声明 arg: T, 返回值声明 :T

// 泛型约束: 使用泛型未声明的属性会在编译阶段报错
interface Length {
  length: number;
}
function demo<T extends Length>(arg: T): T {
  console.log(arg.length); // T本身是不带 length属性的, 需要显示声明
  return arg;
}

// 保证参数 U 上不会出现 参数T 中不存在的字段。
// 赋值source对象的部分属性
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
      target[id] = (<T>source)[id];
  }
  return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };
let y = { b: 10, d: 20 }
copyFields(x, y)

// ************************** 泛型应用: 接口 **********************
// interface IFuncCreateArray {
//   <T>(value:T, len:number): T[]
// }
// 我们将 T 提取出来, 等价于 ==> 
// 此时定义变量时我们就需要给 接口传参了
interface IFuncCreateArray<T> {
  (value:T, len:number): T[]
}

const createNumberArray: IFuncCreateArray<number> = function (v, len) {
  let arr: Array<number> = []
  for (let i = 0; i < len; i++) {
    arr[i] = v 
  }
  return arr
}
createNumberArray(1, 10)
// 这时候是不是逻辑更加清晰了呢? 想创建啥数组就给IFuncCreateArray这个接口传啥类型
// 在创建的时候我们就知道了, 避免了类型不确定可能导致风险

// 泛型参数的默认类型
// 给 T 赋值一个默认的类型
interface IFuncCreateDefaultArray<T = number> {
  (value:T, len:number): T[]
}
const createDefaultArray: IFuncCreateDefaultArray = function (v, len) {
  let arr: Array<number> = []
  for (let i = 0; i < len; i++) {
    arr[i] = v 
  }
  return arr
}
createDefaultArray(1, 10)

// ************************** 泛型应用: 类 **********************
// 用来约束类成员的类型: 属性和方法
class CNumber<T> {
  initValue: T;
  add: (x: T, y: T) => T;
}
​
let c1 = new CNumber<number>();
c1.initValue = 1
c1.add = function (x, y) { return x + y; };
c1.add(1, 2)
