/**
 * 双端队列
 * 特性:
 * 允许同时从前端和后端添加和移除元素的特殊队列。
 * 即队头出,队头入; 队列尾部入和出
 */

class DoubleQueue {
  constructor() {
    this.items = {};
    this.len = 0;
    this.firstIndex = 0;
  }

  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.len - this.firstIndex; // 取得差值
  }
  clear() {
    this.items = {};
    this.firstIndex = 0; // 最小值为0
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
  // 后入队列
  insertEnd(ele) {
    this.items[this.len] = ele;
    this.len++;
  }
  // 前出队列
  removeFront() {
    if (this.isEmpty()) return undefined;
    let item = this.items[this.firstIndex];
    delete this.items[this.firstIndex];
    this.firstIndex++;
    return item;
  }
  peekFront() {
    if (this.isEmpty()) return undefined;
    return this.items[this.firstIndex];
  }

  // ====================== 新增特性 ================
  // 前入队列
  insertFront(ele) {
    if (this.isEmpty()) {
      this.insertEnd(ele);
    }
    // 负数键
    // this.firstIndex--
    // this.items[this.firstIndex] = ele
    // 模拟一下数组位移
    if (this.firstIndex > 0) {
      this.firstIndex--;
      this.items[this.firstIndex] = ele;
    } else {
      for (let i = this.len; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.firstIndex = 0;
      this.items[0] = ele;
      this.len++;
    }
  }
  // 后出队列
  removeEnd() {
    if (this.isEmpty()) return undefined;
    this.len--
    let item = this.items[this.len]
    return item
  }
  // 访问末端元素
  peekEnd() {
    if (this.isEmpty()) return undefined;
    return this.items[this.len - 1];
  }
}


const dq = new DoubleQueue()

dq.insertEnd('1111')
dq.insertEnd('2222')
dq.insertFront('3333')

// console.log(dq.toString())
// console.log(dq.peekFront())
// dq.removeEnd()
// console.log(dq.toString())

/**
 * 应用场景: 对称结构的检查
 * 回文字符串: 回文是正反都能读通的单词、词组、数或一系列字符的序列，例如 madam或 racecar。
 */

function isHuiwenString(str) {
  if (!str) return false

  const dqueue = new DoubleQueue()
  for (let i = 0; i < str.length; i++) {
    const ele = str[i];
    dqueue.insertEnd(ele)
  }
  // 前后双指针
  let front
  let end
  while (dqueue.size() > 1) {
    front = dqueue.removeFront()
    end = dqueue.removeEnd()
    if (front !== end) {
      return false
    }
  }
  
  return true
}

console.log(isHuiwenString('aass'))
console.log(isHuiwenString('asdsa'))
