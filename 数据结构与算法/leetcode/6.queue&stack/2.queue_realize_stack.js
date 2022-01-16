// 队列是先进先出的规则，把一个队列中的数据导入另一个队列中，数据的顺序并没有变，并没有变成先进后出的顺序。

// 两个队列如何实现, 备份思想
// 可以先模拟栈行为一下过程
// 栈: 先进后出

// 一个队列: 先进先出, 一个队列在模拟栈弹出元素的时候只要将队列头部的元素（除了最后一个元素外） 重新添加到队列尾部，此时在去弹出元素就是栈的顺序了。
// 两个队列: 出栈 =》 队列最后一个元素出队列, 前面的元素怎么处理, 可以暂时保存在另一个队列里

// class MyQueue {
//   constructor() {
//     this.items = {};
//     this.head = 0; // 队头指针, 记录首位元素的位置key
//     this.count = 0; // 队列元素key
//   }

//   // last in
//   enQueue(item) {
//     this.items[this.count] = item;
//     this.count++;
//   }

//   // first out
//   deQueue() {
//     if (this.isEmpty()) return null;

//     let temp = this.items[this.head];
//     delete this.items[this.head];
//     this.head++;
//     return temp;
//   }

//   // return queue head item
//   peek() {
//     if (this.isEmpty()) return null;

//     return this.items[this.head];
//   }

//   isEmpty() {
//     return this.size() === 0;
//   }
//   size() {
//     return this.count - this.head;
//   }
// }

// var MyStack = function () {
//   this.queueStack = new MyQueue(); // 负责模拟栈行为
//   this.queueBackup = new MyQueue(); // 负责备份
// };

// /**
//  * @param {number} x
//  * @return {void}
//  */
// MyStack.prototype.push = function (x) {
//   // 进栈 =》 进队列, 如果备份队列有值, 先还原
//   if (this.queueStack.isEmpty()) {
//     this.queueStack.enQueue(x);
//   } else {
//     while (!this.queueBackup.isEmpty()) {
//       this.queueStack.enQueue(this.queueBackup.deQueue());
//     }
//     this.queueStack.enQueue(x);
//   }
// };

// /**
//  * @return {number}
//  */
// MyStack.prototype.pop = function () {
//   // 出栈 =》 队列最后一个元素出去
//   if (this.queueStack.isEmpty()) return null;

//   while (this.queueStack.size() > 1) {
//     this.queueBackup.enQueue(this.queueStack.deQueue());
//   }

//   return this.queueStack.deQueue();
// };

// /**
//  * @return {number}
//  */
// MyStack.prototype.top = function () {
//   if (this.queueStack.isEmpty()) return null;

//   while (this.queueStack.size() > 1) {
//     this.queueBackup.enQueue(this.queueStack.deQueue());
//   }

//   return this.queueStack.peek();
// };

// /**
//  * @return {boolean}
//  */
// MyStack.prototype.empty = function () {
//   return this.queueBackup.isEmpty() && this.queueStack.isEmpty();
// };

var MyStack = function () {
  // 数组（push, shift）模拟队列
  this.queueStack = []; // 模拟
  this.queueBackup = []; // 备份
};

MyStack.prototype.push = function (x) {
  this.queueStack.push(x);
};

MyStack.prototype.pop = function () {
  // 弹出之前, 需要还原 queueStack
  if (this.queueStack.length === 0) {
    [this.queueStack, this.queueBackup] = [this.queueBackup, this.queueStack];
  }

  while (this.queueStack.length > 1) {
    this.queueBackup.push(this.queueStack.shift());
  }
  return this.queueStack.shift();
};

MyStack.prototype.top = function () {
  // 返回pop出去的元素
  let temp = this.pop();
  this.queueStack.push(temp);
  return temp;
};

MyStack.prototype.empty = function () {
  return !this.queueStack.length && !this.queueBackup.length;
};

// 单队列模拟
// MyStack.prototype.pop = function() {
//   let size = this.queue.length;
//   while(size > 1) {
//       this.queue.push(this.queue.shift());
//       size--;
//   }
//   return this.queue.shift();
// };
