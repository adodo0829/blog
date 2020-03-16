# 函数类型
我理解的函数就是一个指令, 由所在的环境来调用或执行;
我们可以封装一系列操作语句在这个指令里面; 当然函数也是一个对象

## 函数定义
- 声明式: 关键字 function
```
function fnName(arg) {
  // do something
}

# 函数名提升问题
声明式函数fnName,函数名称和函数体都提升, 即在当前上下文都可调用

# 函数的重复声明会覆盖前面的声明
# 后面的函数声明会覆盖前面的函数声明
var a;
function a(){
  console.log(1);
}
function a(){
  console.log(2);
}
a() // 2

# 变量赋值的情况
var a = 100;
function a(){
  console.log(1);
}
a() // error, 先提升, 后赋值
```
- 表达式: 变量指向函数体
```
var fnName = function(arg) {
  // do something
}
匿名函数也叫拉姆达函数，是function关键字后面没有标识符的函数
```
- Function构造函数
```
Function构造函数接收任意数量的参数，但最后一个参数始终都被看成是函数体，而前面的参数则枚举出了新函数的参数

var functionName = new Function(['arg1' [,'arg2' [...,'argn']]],'statement;');
var sum = new Function('num1','num2','return num1 + num2');
//等价于, 不推荐, 多此一举
var sum = function(num1,num2){
    return num1+num2;
}
```
## 函数返回值
```
1.函数中的return语句用来返回函数调用后的返回值
2.return语句只能出现在函数体内
3.没有return语句，则函数调用仅仅依次执行函数体内的每一条语句直到函数结束，最后返回调用程序.调用结果为 undefined
4.当执行到return语句时，函数终止执行，并返回expression的值给调用程序
5.return语句不会阻止finally子句的执行
function testFinnally(){
    try {
      return 2;
    } catch(error){
      return 1;
    } finally{
      return 0;
    }
}
testFinnally() // 0
6.通过 new 去调用函数,return 的值不是对象的话,则返回 this 对象
它的__proto__指向构造函数 func

7.通过 new 去调用函数,return 的值是对象的话,则返回该对象
它的__proto__指向 Object

```
## 函数的调用
函数只有在被调用时，才会执行。调用运算符是跟在任何产生一个函数值的表达式之后的一对圆括号，圆括号内可包含零个或多个用逗号隔开的表达式。每个表达式产生一个参数值，每个参数值被赋予函数声明时定义的形参名

javascript一共有4种调用模式：函数调用模式、方法调用模式、构造器调用模式和间接调用模式.
### 函数调用模式
当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的。对于普通的函数调用来说，函数的返回值就是调用表达式的值.
```
function add(x,y){
    return x+y;
}
var sum = add(3,4) // 7
```
- this对象
```
通过函数调用模式调用函数时:
非严格模式下，this被绑定到全局对象;
在严格模式下，this是undefined
function add(){
  console.log(this);
}    
add(); // Window

function add(){
  'use strict'
  console.log(this);
}    
add(); // undefined

# this 绑到全局的弊端; 可能修改全局属性
var a = 0;
function fn(){
  this.a = 1;
}
fn();
console.log(this, this.a, a) // window, 1, 1; a 被重写了
```
### 作为方法调用
当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this(突破作用域的限制)被绑定到该对象.

- this对象
```
方法可以使用this访问自己所属的对象，所以它能从对象中取值或对对象进行修改。
this到对象的绑定发生在方法被调用的时候。
通过this可取得它们所属对象的上下文的方法称为公共方法.

var o = {
  a: 1,
  m: function(){
    return this;
  },
  n: function(){
    this.a = 2;
  }
};
console.log(o.m()); // {a: ..., m: fn, n:fn} o 自己
o.n();
console.log(o.m().a);// 2
```
- 嵌套函数的 this
```
由于this没有作用域的限制，嵌套的函数不会从调用它的函数中继承this。如果嵌套函数作为方法调用，其this的值指向调用它的对象。如果嵌套函数作为函数调用，其this值不是全局对象(非严格模式下)就是undefined(严格模式下)

var o = {
    m: function(){
       function n(){
           // 'use strict' // undefined
           return this;
       }
       return n();
    }
}
console.log(o.m()); // window

# 如果想访问这个外部函数的this值，需要将this的值保存在一个变量里，这个变量和内部函数都同在一个作用域内。通常使用变量self或that来保存this

var o = {
  m: function(){
    var self = this;
    console.log(this === o); // true
    function n(){
       // 访问 m 所处环境下 this 对象 
       console.log(this === o); // false
       console.log(self === o); // true
       return self;
    }
    return n();
  }
}
console.log(o.m() === o); // true
```
### 构造函数调用模式
如果函数或者方法调用之前带有关键字new，它就构成构造函数调用

```
function fn(){
  console.log(this) // {}
  this.a = 1;
};
var obj = new fn(); // 上面已经提过,会返回 this 对象
console.log(obj.a); // 1

# 如果构造函数调用在圆括号内包含一组实参列表，先计算这些实参表达式，然后传入函数内
function fn(x){
    this.a = x;
};
var obj = new fn(2);
console.log(obj.a); // 2

# 构造函数即使是一个方法调用，它依然会使用这个新对象作为调用上下文

# 构造函数通常不使用return关键字，它们通常初始化新对象，当构造函数的函数体执行完毕时，它会显式返回;
# 如果构造函数使用return语句但没有指定返回值，或者返回一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果;
# 如果构造函数显式地使用return语句返回一个对象，那么调用表达式的值就是这个对象
```
### 间接调用模式
javascript中函数也是对象,函数对象也可以包含方法。call()和apply()方法可以用来间接地调用函数.修改this指向
这两个方法都允许显式指定调用所需的this值，也就是说: 
任何函数可以作为任何对象的方法来调用,哪怕这个函数不是那个对象的方法。
call()方法使用它自有的实参列表作为函数的实参
apply()方法则要求以数组的形式传入参数

```
var obj = {};
function sum(x,y){
    return x+y;
}
console.log(sum.call(obj, 1, 2));  // 3
console.log(sum.apply(obj, [1,2]));// 3
```
### bind
bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
```
fun.bind(thisArg[, arg1[, arg2[, ...]]])

## thisArg 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。
## 当使用 new 操作符调用绑定函数时，该参数无效。
## arg1, arg2, … （可选）当绑定函数被调用时，这些参数加上绑定函数本身的参数会按照顺序作为原函数运行时的参数。

function fn(a, b, c) {
  return a + b + c;
}

var _fn = fn.bind(null, 10);
var ans = _fn(20, 30, 40); // 60

相当于前几个参数已经 “内定” 了，我们便可以用 bind 返回一个新的函数。也就是说，bind() 能使一个函数拥有预设的初始参数。这些参数（如果有的话）作为 bind() 的第二个参数跟在 this 后面，之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。
```
## 函数的参数
- 参数为基础类型
```
# 值传递
var a = 1
function fn(o) {
    o = 3;
    console.log(o) // 3
}
fn(a);
console.log(a) // 1
```
- 参数为引用类型  

```
# 对函数形参的赋值，不会影响实参的值
var obj = {x : 1};
function fn(o) {
    o = 100; // 此时相当于一个局部变量
    console.log(o) // 100
}
fn(obj);
console.log(obj.x); // 仍然是1, obj并未被修改为100.

# 修改形参对象的属性值，也会影响到实参的属性值
var obj = {x : 1};
function fn(o) {
    o.x = 3;
}
fn(obj);
console.log(obj.x); // 3, 被修改了!

故调用函数传参时，函数接受对象实参引用的副本(虽是副本，引用的对象是相同的)(既不是按值传递的对象副本，也不是按引用传递的隐式引用)
```
