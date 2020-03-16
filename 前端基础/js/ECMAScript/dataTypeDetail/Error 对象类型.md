# Error对象
error对象是包含错误信息的对象，是javascript的原生对象。当代码解析或运行时发生错误，javascript引擎就会自动产生并抛出一个error对象的实例，然后整个程序就中断在发生错误的地方.

## 属性
error对象包括两个属性：message和name。
```
message: 错误信息
name:    错误类型

try {
  xxxx
}
catch(e){
  console.log(e.message); // xxxx is not defined 
  console.log(e.name);    // ReferenceError
}

可以使用error()构造函数来创建错误对象。如果指定message参数，则该error对象将把它用做它的message属性
throw new Error('test'); // Uncaught Error: test
```
## 类型
```
Error (基类)
EvalError(eval错误)
RangeError(范围错误)
ReferenceError(引用错误)
SyntaxError(语法错误)
TypeError(类型错误)
URIError(URI错误)
```

## 错误事件 onerror
```
加载图像失败时会显示一个警告框。发生error事件时，
图像下载过程已经结束，也就是不能再重新下载了

var image = new Image();
image.src = 'smilex.gif';
image.onerror = function(e){
    console.log(e);
}
```
## throw语句
throw语句用于抛出错误。抛出错误时，必须要给throw语句指定一个值，这个值是什么类型，没有要求

抛出错误的过程是阻塞的，后续代码将不会执行

## try catch语句与捕获错误
```
try{
    //通常来讲，这里的代码会从头到尾而不会产生任何问题
    //但有时会抛出一个异常，要么是由throw语句直接抛出，要么通过调用一个方法间接抛出
}catch(e){
    //当且仅当try语句块抛出了异常，才会执行这里的代码
    //这里可以通过局部变量e来获得对Error对象或者抛出的其他值的引用
    //这里的代码块可以基于某种原因处理这个异常，也可以忽略这个异常，还可以通过throw语句重新抛出异常
}finally{
    //不管try语句是否抛出了异常，finally里的逻辑总是会执行，终止try语句块的方式有：
    //1、正常终止，执行完语句块的最后一条语句
    //2、通过break、continue或return语句终止
    //3、抛出一个异常，异常被catch从句捕获
    //4、抛出一个异常，异常未被捕获，继续向上传播
}
```