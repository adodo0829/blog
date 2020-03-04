# 对象类型 Object

## 对象定义
javascript的数据类型包括原始值类型(undefined、null、boolean、string、number, symbol, bigInt)和引用类型(object)。对象和其他简单类型值不同的是，对象是一种复合值：它将许多值(原始值或者其他对象)聚合在一起，可通过名字访问这些值.

所以,对象也可看做是属性的无序集合，每个属性都是一个名值对。属性名是字符串，因此我们可以把对象看成是从字符串到值的映射.

## 对象初始化
三种方式来初始化一个对象，包括new构造函数、对象直接量和Object.create()函数
- new构造函数
```
使用new操作符后跟Object构造函数用以初始化一个新创建的对象
var person = new Object();
# 如果不给构造函数传递参数可以不加括号 var person = new Object;
person.name = 'huhua';
person.age = 25;

# 不传参: 创建空对象, 原型指向 Object
var o1 = new Object();
var o2 = new Object(undefined);
var o3 = new Object(null);

# 传参: 传对象类型 和 传原始值类型
var o1 = {a: 1};
var o2 = new Object(o1); // 传对象,直接返回这个对象
console.log(o1 === o2);  // true, o1,o2应用的地址一致

console.log(new Object('str')); // 传原始值, 会返回其包装类型
// String {0: "s", 1: "t", 2: "r", length: 3, [[PrimitiveValue]]: "str"}

# Object()函数, 类似原始类型的包装对象方法, 可以将值转为对象
null,undefined => {}
object => object
string,number,boolean => 对应的包装类型
```
- 对象字面量
```
使用字面量只是隐藏了与使用new操作符相同的基本过程,也可以叫做语法糖
var person = {
    name : 'huhua',
    age : 25,
    boy : true
};
使用对象字面量的方法来定义对象，属性名会自动转换成字符串
```
- Object.create()
```
这个方法创建一个新对象，第一个参数就是这个对象的原型，第二个可选参数用以对对象的属性进行进一步描述.

var o1 = Object.create({x:1,y:1}); // o1继承了属性x和y
console.log(o1.x); // 1

注意: 传入参数null来创建一个没有原型的新对象，但通过这种方式创建的对象不会继承任何东西，甚至不包括基础方法。比如toString()和valueOf();
我们得到一个纯粹的数据容器

Object.create()方法的第二个参数是属性描述符;
var o1 = Object.create({z:3},{
  x:{value:1,writable: false,enumerable:true,configurable:true},
  y:{value:2,writable: false,enumerable:true,configurable:true}
}); 
console.log(o1.x,o1.y,o1.z);// 1 2 3
```
## 对象引用
如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量

如果取消某一个变量对于原对象的引用，不会影响到另一个变量
```
var o1 = {};
var o2 = o1;

o1 = 1;
console.log(o2);//{}
```
## 对象的实例方法
- valueOf()
```
对象的valueOf()方法返回自己
var o = new Object({a:1});
o.valueOf() // {a:1}
```
- toString()
```
toString()方法返回当前对象对应的字符串形式
var o1 = new Object();
o1.toString() // "[object Object]"

var o2 = {a:1};
o2.toString() // "[object Object]"

# 注意函数和数组不一样
可以使用Object.prototype.toString()来获取对象的类属性
```

## 判空
```
function isEmptyObject(obj) {
  return !Object.keys(obj).length
}
```

未完待续...