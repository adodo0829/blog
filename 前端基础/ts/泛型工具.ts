/**
 * ts 中泛型工具: 可以理解为类型转换函数, 接受泛型类型作为参数
 * 理解类型编程的基础, 把类型当作参数, 并返回类型
 */

/**
 * 1.Partial<T>: 将传入的属性变为可选项
 */
interface Full {
  name: string
  age: number
}
// => 如何转化? 我们肯定要遍历接口的属性名,然后设置, 得到一个新的接口类型
// interface Full {
//   name?: string
//   age?: number
// }

// 遍历常用 keyof(获取接口的所有key, 返回一个联合类型) 和 in(遍历可枚举的类型) 操作符
// 参数&返回
type MyPartial<T> = {
  // 不过这里只遍历了第一层, 只能转化第一层
  // [K in keyof T]?: T[K]

  // 如果涉及到深层次,需要对 T[K]的类型进行再次判断和递归转化
  // 改为下面:
  [K in keyof T] ?: T[K] extends object ? MyPartial<T[K]> : T[K]
}
type part = MyPartial<Full>


/**
 * 2.Required<T>: 将传入的属性变为必选项
 */
interface unReq {
  name: string
  sex?: string
}
// 遍历接口对象, 移除 ?符号: -?
type MyRequired<T> = {
  [K in keyof T]-?: T[K]
}
type req = MyRequired<unReq>

/**
 * 3.Readonly: 将属性变为只读
 */
interface demoReadonly {
  name: string
  readonly age: number
}
// 同上
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
type mydemoReadonly = MyReadonly<demoReadonly>

/**
 * 4.Mutable: 移除(-)属性类型的只读特性
 */
type MyMutable<T> = {
  -readonly [K in keyof T]: T[K]
}
type demomyMutable = MyMutable<demoReadonly>

/**
 * 5.Pick: 从 T类型 中取出属性 组成 K类型
 * 需要两个类型参数: T key
 */
interface Man {
  name: string
  age: number
  sex: string
}

// 我们要从 Man 类型中挑选一些类型组成新的类型, 继承它的某些类型
// 通过 extends 关键字
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}
type newMan = MyPick<Man, 'age' | 'name'>
// 等同于 ==>
// interface newMan {
//   name: string
//   age: number
// }

/**
 * 6.Exclude: 将 T 中的某些属于 U 的类型移除掉
 * 6.Extract: 将 T 中的某些属于 U 的类型提取掉
 * 排除某些类型
 * 需要两个类型参数: T U
 */

// 同样要利用 extends 排除 T中 U的子类型
// T extends U ? X : Y
// T 是 U 的子类型的话，那么就会返回 X，否则返回 Y
type MyExclude<T, U> = T extends U ? never : T
type MyExtract<T, U> = T extends U ? T : never

type e1 = MyExclude<1 | 2 | 3, 1 | 'a'>
// e = 2 | 3
type e2 = MyExtract<1 | 2 | 3, 1 | 'a'>
// e = 1

/**
 * 7.Omit: 将 T 中的某些 属于 K类型 的属性忽略掉, 与 Pick 反过来
 * 需要两个类型参数: T K
 */

// 我们可以理解为 过滤掉 T 中的一些类型, Pick 是筛选, Omit 是过滤
// 取出我们不想要的类型(排除的类型)
type MyOmit<T, K> = MyPick<T, MyExclude<keyof T, K>>
type o = MyOmit<Man, 'name'>
// => Man 类型中排除 name 属性类型


/**
 * 8.RetrunType: 获取函数/方法的返回类型
 * 使用条件类型infer 推断泛型 T 的返回类型 R 来拿到方法的返回类型
 */
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any

function demo() {
  return 'xxx'
}
// typeof 类型保护
let a = 1
type num = typeof a // number
type demoReturn = MyReturnType<typeof demo>

/**
 * 9.NonNullable: 过滤 null 和 undefined 类型
 */
type MyNonNullable<T> = T extends null | undefined ? never : T;
type T1 = '123' | '222' | null;
type T2 = NonNullable<T1>; // '123' | '222'

/**
 * 上面这么多泛型工具, 都是类型编程的手段
 * 养成类型编程的思维和习惯: TODO: 写工具库的时候练习
 * 类型定义: 定义一个好的类型结构
 * 类型复用: 提高类型重用度
 */