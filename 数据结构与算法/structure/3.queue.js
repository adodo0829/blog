/**
 * 队列结构: 一组成员的集合
 * 特性: 先进先出, 按顺序排队
 * 应用: 处理一些排队任务, 如 js 任务队列
 */

// 这里使用对象来实现队列
class Queue {
  constructor() {
    this.flag = 0 // 队列标识位
    this.count = 0 // 队列大小
    this.list = Object.create(null) // 队列容器
  }

  // enter: 入队列
  enter(item) {
    this.list[this.count] = item
    this.count++
  }

  // leave: 出队列,并返回该成员
  leave() {
    // let item = this.list[0]
    // this.count--
    // delete this.list[0]
    // return item
    // 以上只针对首次出队列有效, 一个 count 不足以实现;
    // 所以我们需要新增一个标志位 flag 来表示队列成员的位置
    if (this.isEmpty()) return void 0;
    let leaveItem = this.list[this.flag]
    // console.log(leaveItem);
    delete this.list[this.flag]
    this.flag++ // 删除一位就后移一位
    return leaveItem
  }

  // peek: 获取队列首个标志位的元素
  peek() {
    if (this.isEmpty()) return void 0;
    return this.list[this.flag]
  }

  // isEmpty: 判空
  isEmpty() {
    return this.count - this.flag === 0
  }

  // size: 返回队列大小
  size() {
    return this.count - this.flag
  }

  // clear: 清空队列成员
  clear() {
    this.list = Object.create(null)
    this.count = 0
    this.flag = 0
  }
}

const q1 = new Queue()

q1.enter('html')
q1.enter('js')
q1.enter('css')

// console.log(q1.peek());
// console.log(q1.leave());
// console.log(q1);
// console.log(q1.leave());

/**
 * 双端队列结构: 队列和栈的结合, 同样也是一组成员的集合
 * 特性: 既遵守先进先出(queue), 也遵循先进后出(stack)
 * 应用: 存储撤销操作, 队列循环操作
 */

class Dequeue {
  constructor() {
    this.list = Object.create(null)
    // 需要双指针
    this.count = 0 // 尾指针
    this.flag = 0  // 头指针
  }

  // *** 通用方法 ***
  isEmpty() {
    return this.count === 0
  }
  size() {
    return this.count
  }
  clear() {
    this.list = Object.create(null)
    this.count = 0 
    this.flag = 0 
  }

  // addHead: 队列头部添加
  addHead(item) {
    // 头部添加新成员需要考虑到原始数据的结构
    /**
     * 1.原结构为空
     * 2.原结构完整, 头节点 key 为 0
     * 3.原结构不完整,  头结点 key 不为 0
     */
    if (this.isEmpty()) {
      this.addEnd(item)
    } else if (this.flag > 0) {
      // 在 flag 指针前一位插入
      this.list[--this.flag] = item
    } else {
      // 顺位右移: 重新赋值
      // obj[i] = obj[i - 1]
      for (let i = this.count; i > 0; i--) {
        this.list[i] = this.list[i - 1]
      }
      // 添加新成员
      this.list[0] = item
      this.count++
      this.flag = 0
    }
  }
  // addEnd: 队列末端添加
  addEnd(item) {
    // 尾部添加时, 按顺序递增就好
    this.list[this.count++] = item
  }
  // removeHead: 队列头部移除并返回
  removeHead() {
    if (this.isEmpty()) return void 0;
    const headItem = this.list[this.flag]
    console.log('headItem:', headItem);
    delete this.list[this.flag]
    this.flag++
    this.count--
    return headItem
  }
  // removeEnd: 队列尾部移除并返回
  removeEnd() {
    if (this.isEmpty()) return void 0;
    // 指针要与长度保持一致
    const endItem = this.list[this.flag + this.count - 1]
    console.log('end: ', endItem);
    delete this.list[this.flag + this.count - 1]
    this.count--
    return endItem
  }
  // peekHead: 获取队列头部元素
  peekHead() {
    if (this.isEmpty()) return void 0;
    return this.list[this.flag]
  }
  // peekEnd: 获取队列尾部元素
  peekEnd() {
    if (this.isEmpty()) return void 0;
    return this.list[this.count + this.flag - 1]
  }
}

// const dq = new Dequeue()

// dq.addEnd('end1')
// dq.addEnd('end2')
// dq.addEnd('end3')
// console.log(dq)
// dq.addHead('h1')
// dq.addHead('h2')
// console.log(dq)
// console.log(dq.removeHead())
// console.log(dq.removeEnd())
// console.log(dq)
// console.log(dq.removeEnd())

// console.log(dq.peekEnd());
// console.log(dq.peekHead());ß

/**
 * 应用实例: 循环队列
 * @param {Array} manList 
 * @param {number} round  轮次
 */
function getChampion(manList, round) {
  const queue = new Queue()
  const loserList = []

  // 队列存储
  for (let i = 0; i < manList.length; i++) {
    queue.enter(manList[i])
  }

  // 队列操作: 将队列成员移除到只有一位
  while (queue.size() > 1) {
    // 经过一定轮次后, 筛除一位成员
    for (let i = 0; i < round; i++) {
      // 循环队列
      queue.enter(queue.leave())
    }
    // 移除队列成员
    loserList.push(queue.leave())
  }

  return {
    loserList,
    champion: queue.peek()
  }
}

let people = ['js', 'html', 'css', 'vue', 'react', 'angular']

const { champion, loserList } = getChampion(people, 3)
// console.log('champion:', champion);
// console.log('loserList:', loserList);


/**
 * 回文检查器
 * 回文: 正反都能读通的单词、词组、数或一系列字符的序列: 如level, llvvll
 * @param {String} str 
 */
function isPlalindrome(str) {
  // 利用双端队列判断: 回文特性: 对称性
  if (str.length <= 1) return true;
  const dq = new Dequeue()
  const formatStr = str.toLowerCase()

  for (let i = 0; i < str.length; i++) {
    dq.addEnd(str.charAt(i))
  }
  console.log(dq);
  // 进入队列循环,成员数大于1, 总数为奇数或偶数不影响判断
  let fisrtItem, lastItem
  let flag = true // 中断循环标志位
  while (dq.size() > 1 && flag) {
    // 取出队列&头尾成员进行比较
    fisrtItem = dq.removeHead()
    console.log(dq);
    // debugger
    lastItem = dq.removeEnd()
    // console.log(fisrtItem, lastItem);
    if (fisrtItem !== lastItem) {
      flag = false
    }
  }
  return flag
}

console.log(isPlalindrome('l'))
console.log(isPlalindrome('ll'))
console.log(isPlalindrome('lele'))
console.log(isPlalindrome('lllvlll'))

