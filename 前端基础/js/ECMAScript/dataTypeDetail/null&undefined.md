# undefined & null
由于历史原因, js作者设计了 null 和 undefined 来分别表示 "无"这个值; null是一个表示”无”的对象，转为数值时为0；undefined是一个表示”无”的原始值，转为数值时为NaN; 当然它俩都是原始类型.

## undefined
Undefined类型只有一个值，就是undefined。当声明的变量未初始化时，该变量的默认值是undefined。所以一般地，undefined表示变量没有初始化

- `undefined`出现的场景
```
1.声明为赋值的变量
2.对象不存在的属性
3.无返回值的函数的执行结果
4.函数的参数没有传入
5.void(0)
```
- 类型检测
```
console.log(typeof undefined);//'undefined'
console.log(typeof 'undefined');//'string'
undefined不是一个关键字，其在IE8-浏览器中会被重写，在高版本函数作用域中也会被重写；所以可以用void 0 来替换undefined
```
- 类型转换
```
Boolean(undefined) //　 false
Number(undefined)  //　 NaN
String(undefined)  //　'undefined'    
```

## null
Null类型只有一个值，就是null。null是javascript语言的关键字，它表示一个特殊值，常用来描述"空值"

逻辑角度看，null值表示一个空对象指针

不同的对象在底层都表示为二进制，在javascript中二进制前三位都为0会被判断为object类型，null的二进制表示是全0，所以执行typeof时返回'object'

null和undefined是不同的，但它们都表示"值的空缺"，null表示"空值"，undefined表示"未定义"。两者往往可以互换。判断相等运算符==认为两者是相等的

- `null`出现场景
```
1.不存在的 DOM 对象节点
console.log(document.getElementById('node')) // null
2.自定义变量
var timeId = null
```
- 类型检测
```
1.全等符
console.log(null === null);// true
2.万能方法
Object.prototype.toString.call(null).slice(8, -1) // 'Null'
```

- 类型转换
```
Boolean(null) //　 false
Number(null)  //　 0
String(null)  //　'null'    
```