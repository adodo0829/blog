/**
 * 使用栈实现队列的下列操作：
push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。

示例:
MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false
 */

// queue的操作方向和stack是相反的, 一个stack能实现queue吗? 不能
// 所以需要两个stack: 一个输入栈，一个输出栈
// 想一想 汉诺塔游戏

class ArrayStack {
  constructor() {
    this.items = []; // 元素都在在尾部操作
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

var MyQueue = function () {
  this.stackIn = new ArrayStack();
  this.stackOut = new ArrayStack();
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  // push行为: 在push数据的时候，只要数据放进输入栈就好,
  this.stackIn.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  // pop行为:  在pop的时候，操作就复杂一些，需要对输出栈判空，
  // 输出栈为空, 就把进栈数据全部导入进来（注意是全部导入），再从输出栈弹出数据，如果输出栈不为空，则直接从出栈弹出数据就可以了
  if (!this.stackOut.isEmpty()) {
    return this.stackOut.pop();
  }

  while (!this.stackIn.isEmpty()) {
    this.stackOut.push(this.stackIn.pop());
  }
  return this.stackOut.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  if (!this.stackOut.isEmpty()) {
    return this.stackOut.peek();
  }

  while (!this.stackIn.isEmpty()) {
    this.stackOut.push(this.stackIn.pop());
  }
  return this.stackOut.peek();
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stackOut.isEmpty() && this.stackIn.isEmpty();
};
