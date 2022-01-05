/**
 * 队列特性:
 * 循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。
 * 队列在尾部添加新元素，并从顶部移除元素。
 * 最新添加的元素必须排在队列的末尾
 *
 * 一头进, 另一头出, 需要一个指针索引来定位队头元素
 * 有序
 * {
 *  0: a,
 *  1: b,
 *  2: c
 * }
 */

class Queue {
  constructor() {
    this.items = {};
    this.len = 0;
    this.firstIndex = 0;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.len - this.firstIndex;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.firstIndex];
  }

  enQueue(ele) {
    this.items[this.len] = ele;
    this.len++;
  }

  deQueue() {
    if (this.isEmpty()) return;
    let res = this.items[this.firstIndex];
    delete this.items[this.firstIndex];
    this.firstIndex++;
    return res;
  }

  clear() {
    this.items = {};
    this.firstIndex = 0;
    this.len = 0;
  }

  toString() {
    if (this.isEmpty()) return "";

    let res = `${this.items[this.firstIndex]}`;
    for (let index = this.firstIndex + 1; index < this.len; index++) {
      res = `${res},${this.items[index]}`;
    }
    return res;
  }
}

let OQueue = new Queue()
OQueue.enQueue('vue')
OQueue.enQueue('react')
OQueue.deQueue()
// console.log(OQueue.toString())

/**
 * 使用场景: 环里存在固定元素的问题
 * 浏览器事件循环, js任务队列
 * 击鼓传花, 中奖
 */

const getLast = (arr, n) => {
  const queue = new Queue()
  let outList = []

  for (let i = 0; i < arr.length; i++) {
    queue.enQueue(arr[i])
  }

  while (queue.size() > 1) {       // 循环队列
    for (let j = 0; j < n; j++) {
      // 轮换 n 次
      queue.enQueue(queue.deQueue())
    }
    outList.push(queue.deQueue())
  }
  
  return {
    outList,
    last: queue.deQueue()
  }
}

const arr = ['divid', 'sally', 'jim', 'mary', 'bob']
let res = getLast(arr, 4)
// console.log(res)

module.exports = {
  Queue
}