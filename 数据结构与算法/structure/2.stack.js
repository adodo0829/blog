/**
 * 栈结构: 一组成员的集合
 * 特性: 新成员位于栈顶, 老成员位于栈底, 后进先出
 * 应用: 上下文调用栈, 历史记录栈...适用于储存记录的操作
 */

class StackByArray {
  constructor() {
    // 基于 array 实现栈
    this.list = []
  }

  // push: 添加元素到栈顶
  push(item) {
    this.list.push(item)
  }

  // pop: 移除栈顶元素,并返回
  pop() {
    return this.list.pop()
  }

  // peek: 返回栈顶元素
  peek() {
    return this.list[this.list.length - 1]
  }

  // isEmpty: 判空
  isEmpty() {
    return this.list.length === 0
  }

  // clear: 清除栈中元素
  clear() {
    this.list.length = 0
  }

  // size: 栈元素个数
  size() {
    return this.list.length
  }
}
// 数组操作需要经常遍历, 复杂度为O(n), 当数据量足够庞大耗时会显著增长
// 同时维护一组有序列表, 内存上也会带来过多的消耗

class StackByObject {
  constructor() {
    // 栈成员为对象的value, 使用id来做key
    this.id = 0
    // 基于 object 实现栈
    this.list = Object.create(null)
  }

  push(item) {
    // 长度 = 索引 + 1
    this.list[this.id] = item
    this.id++
  }

  pop() {
    // 空栈
    if (this.isEmpty()) return void 0;
    // 非空栈
    this.id--
    let item = this.list[this.id]
    delete this.list[this.id]
    return item
  }

  peek() {
    if (this.isEmpty()) return void 0;
    return this.list[this.id - 1]
  }

  clear() {
    this.id = 0
    this.list = Object.create(null)
  }

  isEmpty() {
    return this.id === 0
  }

  size() {
    return this.id
  }
}

let OStack = new StackByObject()

OStack.push('html')
OStack.push('css')
OStack.push('js')

console.log(OStack.size()); // 3
console.log(OStack.pop())   // js
console.log(OStack);
// OStack类是基于原型的, 其属性是可以修改的, 但作为基础类的操作我们是不允许的
// 所以需要对类的内部私有属性和方法进行保护
// 但是 js 内部并未提供这种特性(不过可以模拟: _变量, symbol, WeakMap)...
// 引入ts的特性可以在编写的时候实现 private私有属性
class Stack {
  // private id = 0
  // private list = Object.create(null)
  // ...
}
