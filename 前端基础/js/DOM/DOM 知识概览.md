# DOM(文档对象模型)
DOM 定义了 JS 访问和操作 HTML 文档的标准; 所有 HTML 元素（节点）均可被修改，也可以创建或删除节点, 包括属性,样式,结构关系等...

## 关键知识点
- DOM 节点树
```
document > html > [head,body] > [div] > [p,span,img,a,...tags]
```
- 节点分类
```
分类: 4 大节点; 元素,文本,属性,注释节点
结构: 树形层级结构
```
- 节点对象
```
var ele = getElementById('selector')
ele即dom节点对象; 对应有其属性和方法;
emmm...太多记不住; 用到的时候再去查 :)
{
  属性: 各个节点值(文本,属性,注释), 名称, 类型, 样式等...,
  方法: 查get, 增append, 删remove, 改(重新赋值)
}
```
- 节点样式
```
getComputedStyle()
CSSStyleSheet
js 操作节点样式
```
- 节点尺寸(三大家族)
```
offset
client
scroll
getBoundingClientRect
```
- 节点事件(人机,外设,交互的基础)
```
# 事件机制
  1.事件流: 事件流又称为事件传播,DOM2级事件规定的事件流包括三个阶段:
        事件捕获阶段,处于目标阶段和事件冒泡阶段

　　     首先发生的是事件捕获,为截获事件提供了机会.
        然后是实际的目标接收到事件,
        最后一个阶段是冒泡阶段,可以在这个阶段对事件做出响应.

  2.事件处理程序(回调函数)
    this值等于事件的目标元素
    DOMO事件处理程序: el.onclick = function(){}
                    el.onclick = null
    DOM2级事件处理程序: addEventListener() 和 removeEventListener()
                    el.addEventListener('click', function(){}, false)
    IE事件处理程序: attachEvent()和detachEvent()
  
  3.事件对象 event: 
    属性和方法;
    事件委托代理: click、mousedown、mouseup、keydown、keyup和keypress
    事件阻止: prevent, 阻止冒泡等...

  4.事件模拟
    自定义事件 Event()构造函数
    creatEvent()创建事件

# 事件类型
  鼠标: mouse,
  键盘: key,
  节点变更: DOMNode,
  剪切板: clipboardData
  文本: change,
  浏览器加载: load,unload,error,DOMContentLoaded...
  焦点: focus,
  ...
```