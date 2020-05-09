# typescript 总结笔记

## 前言介绍
- typescript 的优点
  静态弱类型语言, 编译时就会报错, 降低bug,低级错误出现的可能性
  自带代码提示,类型注解
  对于多人合作的项目比较友好,降低沟通成本

- 为什么学习 ts
  除了上面一些优点之外, ts 可以帮助我们锻炼数据类型思维(数据定义: 数据类型&结构), 提高我们编码的严谨性以及代码的健壮性;
  本篇笔记就 ts 的理论基础和实践两个方面进行了一些总结
- 一些思考
 在写 ts 项目时,往往限制的都是我们向外输出的变量类型,而外部向项目中输入的数据结构和类型我们往往没法限制, 比如接口返回的数据, 虽然也可以限制, 但是感觉有点鸡肋
 另外: 泛型的使用非常灵活...多写写才能融会贯通

## 理论基础篇

#### 常用类型
基础篇就快速过一下...
- string	
```js
let s: string = 'i am string'
```
- number
```js
let n: number = 1
```
- boolean
```js
let b: boolean = true
```
- null & undefined
```js
/**
 * undefined 类型的变量只能被赋值为 undefined
 * null 类型的变量只能被赋值为 null
 * 赋值为其他类型会报错
 */
let ud: undefined = undefined
let nu: null = null
```
- void 空值
```js
// 没有返回值的函数为void
// 声明一个 void 类型的只能将它赋值为 undefined 和 null
const popup = (): void => {
  console.log('function no return')
}
let useless: void = undefined
```
- any 任意类型, 实在没招了就用这个吧
```js
// 可以被任何值赋值, 声明未指定类型的变量也为 any
let anyType: any = 'str'
anyType = 111
```
- unkonwn
```js
let uk: unknown;
// unknown 和 any 的主要区别是 unknown 类型会更加严格:
// 在对unknown类型的值执行大多数操作之前,我们必须进行某种形式的检查, 通常可以用as断言
// 而在对 any 类型的值执行操作之前,我们不必进行任何检查。
// 当 unknown 类型被确定是某个类型之前,它不能被进行任何操作(比如实例化)
```
- 数组array
```js
let arr1: (number | string)[] = [1, 2, 3, '2121']
let arr2: Array<number | boolean> = [2, 2, 2, true]
```
- 元组类型
```js
// 表示一个已知元素数量和类型的数组,各元素的类型不必相同;
// 越界不能访问
// 在函数的剩余参数中定义参数的个数和类型
let t1: [string, number, boolean | string]
t1 = ['hello', 123, false]
```
- never
``` js
// 永不存在的值的类型
// never类型: 
    // 总是会抛出异常
    // 或不会有返回值的函数表达式
    // 或箭头函数表达式的返回值类型
// 不能赋值给除了 never 类型的其他类型, 不能接受其他类型
const err = (msg: string): never => {
  throw new Error(msg)
}
// err('hahaahah')
```
- symbol
```js
let ss: symbol = Symbol('hello')
console.log(ss)
```
- object 表明数据类型是 object, 
```js
let obj: {name: string, value: number} = { name: 'huhua', value: 1232 }
let obj1: object = { name: '哈哈', value: 1232 }
console.log(obj, obj1, obj.name)
console.log(obj1.name) // name 不在 object 上, object 类型并不精确
```
- function类型
``` js
// 定义函数
let myAdd = (x: number, y: number): number => x + y
let add = (x: number, y: number) => x + y // 类型推断, 不必注明返回值类型
console.log(myAdd(1, 2), add(3, 100))

 // 定义函数类型形式: compute
let compute: (x:number, y:number) => number  
compute = (aaa, bbb) => aaa + bbb
```

### 枚举类型 enum
枚举: 我们可以理解为一组常量的集合, 可以帮助我们解决一些硬编码问题
特别是 if 语句中的判断值

- 数字枚举
```js
export enum EState {
  one = 1,
  two,
  three,
  four,
  five,
  six,
  seven
}
可以正反取值: EState['one'] === 1; EState[1] === 'one'
方便维护一个状态数组; 另外在组件中可以赋值给一个变量
```
- 字符串枚举
```js
enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

console.log(Direction['Right'], Direction.Up); // Right Up
```
- 异构枚举(混合)
```js
enum StrNum {
  n = 0,
  y = 'yes'
}
```
- 常量枚举(const 声明)
```js
// 只需要对象的值时可以使用常量枚举, 提高性能
const enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

const up = Direction.Up
console.log(up)
```
### 接口 interface
接口（Interfaces）用于对「对象的形状（Shape）」进行描述
接口通常用来约束我们定义的对象, 函数, 类的结构和类型

- 对象约束
```js
// 赋值的时候，变量的形状必须和接口的形状保持一致(不能多也不能少,类型还必须一致)
interface Person {
  readonly id: number // 只读属性
  name: string
  age: number
  sex?: string // 可选属性
  [key: string]: any //  索引类型, 值为任意属性; 以上必须为 any 的子级
}
```  
- 函数约束
```js
// 只是约束函数的形状, 没有实质性的声明和计算
interface Func {
  (x: number, y: number): number
}
let addSum1: Func
addSum1 = (a, b) => a + b
```
- 类的约束
```js
// 不同类之间公有的属性或方法，可以抽象成一个接口, 来被类实现（implements)
// 类必须实现接口中声明的所有属性;可以定义接口未声明的属性
// 接口只能约束类的公有成员 public
// 接口不能约束类的构造函数
interface Man {
    name: string
    age: number
}

class Huhua implements Man {
    // 类中声明共有属性
    name!: string // 赋值断言
    age!: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    eat() {
        console.log('eat food')
    }
}
```
- 接口继承
```js
// 接口继承接口
interface Alarm {
    alert();
}
interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
// 接口继承类
class Point {
    x: number;
    y: number;
}
interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```
### 函数类型
- 函数类型定义:
```js
// function 声明
function add(a:number, b: number) {
  return a + b
}
// 类型结构声明, 表达式另外声明
let add: (a: number, b: number) => number
type Add: (a: number, b: number) => number
interface IAdd {
  (a: number, b: number): number
}
```
- 参数
```js
// 可选参数, 默认参数, 剩余参数: 注意顺序
function add(a: number, b = 100, c?: number) {
  return c ? a + b + c : a + b
}
function add(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, acc) => pre + acc)
}
```
- 函数重载
```js
// 同名函数多类型兼容, 根据参数的不同来实现不同功能, 进行匹配
function add(...rest: number[]): number
function add(...rest: string[]): string
function add(...rest: any[]): any {
  let first = rest[0]
  if (typeof first === 'string') {
    return rest.join('')
  }
  if (typeof first === 'number') {
    return rest.reduce((pre, acc) => pre + acc)
  }
}
```
### class类的类型 
ts主要添加`成员的类型注解`和`成员修饰符`;
ES6中类的数据类型就是函数，类本身就指向构造函数, 其方法都定义在构造函数的 prototype 属性上.我们可以通过 ClassName.prototype.xxx 去访问
- 类声明
```js
class Car {
  // 实例属性: 这样声明要有初始值
  _wheel: number = 4
  // 实例属性成员构造器: 默认返回实例对象（即this）
  constructor(name: string) {
    this.name = name
  }
  // 只读属性
  readonly oil: string = '汽油'
  // public 默认的: 成员是可以被外部访问
  public name: string = 'car'
  // 实例方法
  run() { console.log(this.name + 'runing...') }
  // 私有成员: 成员是只可以被类的内部访问
  private priv() { console.log('priv') }
  // 被保护成员: 成员是只可以被类的内部以及类的子类访问
  protected pro() {}
  // 静态成员: 可以被类名调用和其子类名调用
  static seats: string = '座位'
}
let bz = new Car('benz') // 通过 new 来实例化
let bm: Car = new Car('bm') // 类的类型
console.log(Car.seats)
```
- 类继承
```js
class Bmw extends Car {
  constructor(name: stirng, public color: string) {
    // 先调用父类的实例
    super(name)
    this.color = color
  }
}
console.log(Bmw.seats)
```
- 抽象类 abstract
抽象类无法实例化, 一般作为`基类`使用, 我们可以抽离其他类的公共属性和方法
写入抽象类中
```js
abstract class Animal {
  // abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法
  abstract say(): void;
  move(): void {
    console.log('i can move')
  }
}

class Dog extends Animal {
  // 声明抽象类中的方法, 这里子类可以对父类方法进行重写; 实现所谓的多态
  say() {
    console.log('汪汪汪');
  }
}

let dog1 = new Dog()
dog1.say() // 汪汪汪
dog1.move() // i can move
```
- 类实现接口  
不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces, 用 implements 关键字来实现
```js
// 类必须实现接口中声明的所有属性(相当于约束公有属性);可以定义接口未声明的属性
// 接口只能约束类的公有成员 public
// 接口不能约束类的构造函数
interface Alarm {
    alert();
}

interface Light {
    lightOn();
    lightOff();
}

class Car implements Alarm, Light {
    //  类必须实现接口中声明的所有属性
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```
### 泛型(相当于给类型传参)
泛型：在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
在声明的同时指定类型变量的类型值
```js
// 1.函数泛型约束
// 类型T不需要预先指定 相当于any类型
// 保证输入类型和返回值类型是一致的 弥补了any类型的缺点
function log<T>(v: T): T {
  return v;
}
let s: string = "generics";
let a = log(s);
console.log(a);
console.log(log(1111));

// 2.函数类型泛型约束
// 联合类型,类型别名与字符串字面量类型都是使用 type 进行定义。
// type Log = <T>(v: T) => T // 类型别名
interface Log {
  <T>(v: T): T;
}
let myLog: Log = log;
console.log(myLog([1, 2, 3]));

// 3.泛型接口
// 接口的所有属性都可以受到泛型变量的约束
// 可以传入默认类型
interface IGeneric<T = string> {
  (v: T): T;
}
let IG1: IGeneric<number> = log;
console.log(IG1(123));

// 4.泛型类
class GenericNumber<T> {
  // 泛型变量不能约束类的静态属性
  // zeroValue: T = T;
  add(x: T, y?: T) {
    console.log(x);
    return x;
  }
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.add(1);
let myG1 = new GenericNumber();
myG1.add("hello ts generics");

// 5.泛型约束
interface Length {
  length: number;
}

// T继承Length接口, 这样的话输入的参数必须具有length属性 获取value.length就是合法的了
function ggg<T extends Length>(value: T): T {
  console.log(value, value.length);
  return value;
}
ggg('hello')
ggg([1, 2, 3])
```

## 理论进阶篇
### ts类型检查机制
- 类型推断
根据tsconfig.json的配置规则进行推断, 上下文推断, 类型断言as, 双断言,  
is关键字: xx is string, 赋值断言 let x!: string

- 类型兼容
不同变量相互赋值时的类型检查
函数兼容: 参数个数, 参数类型, 返回值类型
接口兼容: 成员少可以被赋值为成员多的

- 类型保护
在特殊区块使用确定的类型属性和方法, 比如使用联合类型变量的方法时
```
1.instanceof
if (c instanceof A) c.a 
2.in
if (c in C) c.a
3.typeof
函数的参数为联合类型
if (typeof arg === 'string') {} else {}
4.声明类型保护方法
字面量
```
### 联合,交叉,索引类型
- 交叉 & 合并类型属性
- 联合 | 指定类型的所有可能性
- 索引
``` js
// 缩小类型的约束范围;
// 索引类型查询操作符K keyof T: 联合类型的集合;
// 索引类型访问操作符 T[K]; 
// 泛型约束 T extends U
interface IObj {
  a: string
  b: number
}
let key: keyof IObj
let k: IObj['a']

let iobj = {
  a: 1,
  b: 2,
  c: 'ccc'
}
// 泛型索引约束
function getObjValue<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}
console.log(getObjValue(iobj, ['a', 'c']));
// console.log(getObjValue(iobj, ['a', 'd'])); 保错
```

## 工程实践篇
这里是针对我们在正式开发中使用 ts 的一些技巧及规范说明

### tsconfig.json配置文件
[参考 1](https://segmentfault.com/a/1190000013514680)
[参考 2](http://www.typescriptlang.org/docs/handbook/compiler-options.html)

### 声明文件 xxx.d.ts
```
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
declare interface 和 type 声明全局类型
export 导出变量
export namespace 导出（含有子属性的）对象
export default ES6 默认导出
export = commonjs 导出模块, import xx = require('xxx')
export as namespace UMD 库声明全局变量
declare global 扩展全局变量
declare module 扩展模块
```
### ts工具类(泛型)
- Partial: 将属性全部变为可选.
```js
type Partial<T> = { [P in keyof T]?: T[P] };
type p = Partial<InterfaceXXX>
```
- Required: 将可选变为必选
- Exclude: 从 T 中排除出可分配给 U的元素
```js
type T = Exclude<1 | 2, 1 | 3> // -> 2
```
- Omit: Omit<T, K>的作用是忽略T中的某些属性.
```js
type Foo = Omit<{name: string, age: number}, 'name'> // -> { age: number }
```
- Merge: Merge<O1, O2>的作用是将两个对象的属性合并:
- Intersection<T, U>的作用是取T的属性,此属性同样也存在于U.
- Overwrite<T, U> U的属性覆盖 T中相同的属性

## vue 项目中使用的一些问题
本人是在 vue 项目中首先使用的, 发现支持并不是很好...但是还是咬牙写完了一个项目, 后续打算在 react使用一下
- 相关插件文档  
[vue-class-component](https://github.com/vuejs/vue-docs-zh-cn/tree/master/vue-class-component)
[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
[vuex-class](https://github.com/ktsn/vuex-class)
[vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators)

- 类型断言: 用于绕过ts编译器的类型检查; 即手动指定一个值的类型
```js
//  <类型>值 =>  <string> value
//  值 as 类型 => value as string
(this.$refs['multiTable'] as any).clearSelection()
(this.$refs['downParams'] as Form).resetFields()
```   
- $refs 双重断言
```js
((this.$refs.saveTagInput as Vue)['$refs'].input as HTMLInputElement).focus()
```
- 使用三方库时安装或者自己写声明文件
```
@types/xxx

```
