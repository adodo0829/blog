interface IPerson {
  name: string
  age: number
}

const person = {
  name: 'huhua',
  age: 26,
  job: 'fe'
}

// keyof 操作符, 操作对象是类型
// 用于获取某种类型的所有键，并返回键组成的联合类型
// 只对类型进行操作, 而不是对象
// 支持对 接口, 类, 基础类型的操作
type kp = keyof IPerson // "name" | "age"
// 常用场景就是取对象的某个键值
function getValueFromMap<T, K extends keyof T>(key: K, map: T) {
  return map[key]
}


// typeof 操作符, 操作对象是变量
// 用于获取我们所定义的变量的类型, 比如person变量
type p = typeof person

const num = 1
type n = typeof num
const num1: n = 1 // num1的类型必须是1

// typeof常用场景, 取到某变量对象的类型, 再通过keyof取其属性的类型
type personItem = keyof typeof person // 