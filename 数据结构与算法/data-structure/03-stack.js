/**
 * 栈是一种遵从后进先出（LIFO）原则的有序集合。
 * 特点:
 * 新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。
 * 在栈里，新元素都靠近栈顶，旧元素都接近栈底
 * 同一侧进,也同一侧出
 * 
 * 思考, 如何把业务特性 具像化到栈结构的实现上来
 */
class ArrayStack {
  constructor() {
    this.items = [];
  }
  // 添加新元素, 顶部添加, last in
  push(item) {
    this.items.push(item);
  }
  // 从栈里移除元素, 只能从栈顶移除, first out
  pop() {
    return this.items.pop();
  }
  // 查看栈顶元素, 最后一个入栈的元素
  peek() {
    return this.items[this.items.length - 1];
  }
  // 栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }
  // 清除栈
  clear() {
    this.items = [];
  }
}

const stack = new ArrayStack();
// stack.push(11);
// stack.push(22);
// console.log(stack.items.toString())
// console.log(stack.peek(), stack.isEmpty());

// 数据量大时, 数组的查找性能差, 对象栈适合查找
class ObjectStack {
  constructor() {
    this.items = {}; // key-value,
    this.len = 0; // length
  }

  push(ele) {
    this.items[this.len] = ele;
    this.len++;
  }

  pop() {
    if (this.isEmpty()) return undefined;
    this.len--;
    let temp = this.items[this.len];
    delete this.items[this.len];
    return temp;
  }
  
  peek() {
    return this.isEmpty() ? undefined : this.items[this.len - 1];
  }
  size() {
    return this.len;
  }
  isEmpty() {
    return this.len === 0;
  }
  clear() {
    this.len = 0;
    this.items = {};
  }
}

const oStack = new ObjectStack();

oStack.push("aaa");
oStack.push("bbb");
oStack.push("ccc");

// console.log(oStack);
// console.log(oStack.pop());
// console.log(oStack);

// =========== 实现是私有属性的栈 ============
// 限定作用域 Symbol类型: 是不可变的，可以用作对象的属性
const _items = Symbol("stackItems");

class Stack {
  constructor() {
    this[_items] = [];
  }
  // 其他代码同上
}

// WeakMap: 可以存储键值对，其中键是对象，值可以是任意数据类型。
const items = new WeakMap();
class PriviteStack {
  constructor() {
    items.set(this, []);
  }

  push(ele) {
    const s = items.get(this);
    s.push(ele);
  }

  pop() {
    const s = item.get(this);
    return s.pop();
  }
  // ...
}

// =============== 栈结构的应用 =================
// 在回溯问题中，它可以存储访问过的任务或路径、撤销的操作
// 进制转换,平衡圆括号和汉诺塔等
// 先把对称的另一半放在栈里, 再遍历的过程中, 再逐一消除

// | | | 第二次同理 | 第一次整除完是二进制最后一位:栈底元素 |
const transform10To2 = (num) => {
  let stack = new ArrayStack();
  let item;
  let tempNum = num;
  let result = "";

  // 先遍历除完
  while (tempNum > 0) {
    item = tempNum % 2;
    stack.push(item);
    tempNum = Math.floor(tempNum / 2);
  }

  //再拼接
  while (!stack.isEmpty()) {
    result += String(stack.pop());
  }

  if (result === "") result = "0";

  console.log(result)
  return result;
};

// transform10To2(11);
// transform10To2(0);
// transform10To2(8);

const transform10ToBase = (num, base) => {
  const F = '0123456789ABCDEF'
  let stack = new ArrayStack();
  let item;
  let tempNum = num;
  let result = "";

  // 先遍历除完
  while (tempNum > 0) {
    item = tempNum % base;
    stack.push(item);
    tempNum = Math.floor(tempNum / base);
  }

  while (!stack.isEmpty()) {
    result += F[stack.pop()]
  }

  console.log(result)
  return result
}

transform10ToBase(31, 16)