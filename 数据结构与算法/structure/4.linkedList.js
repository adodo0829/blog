/**
 * 链表: 动态的数据成员: 一个嵌套对象, 对象之间通过指针层层引用
 * 特性: 
 * 数组,栈,队列我们称为顺序表,成员的索引都是连续不间断的, 按索引寻址, 经常涉及到遍历操作
 * 链表的成员我们称之为节点, 成员可以是不连续的, 分散的, 任意插入和剔除
 * 节点: 包含元素的真实值和指针
 */

/**
 * Node类
 * 用来创建 node 实例对象
 */
class Node {
  constructor(item) {
    this.item = item   // 节点元素, 真实值
    this.next = null // 节点指针, 用来寻址, 指向下一个节点
  }
}

/**
 * LinkedList: 链表
 * 对象作为容器实现: 对象中存放 node 对象, 嵌套对象结构
 * node 之间通过地址引用
 */
class LinkedList {
  constructor() {
    this.equalFn = (arg1, arg2) => arg1 === arg2 // 辅助函数
    this.head = null; // 初始指针
    this.count = 0      // 元素总数
  }

  // ************ 一些方法的实现 *************
  // push: 链表尾部添加成员
  push(ele) {
    // 创建节点实例
    const node = new Node(ele)
    // 需要判空: 空链表时 head 默认指向 null
    if (this.head == null) {
      this.head = node
    } else {
      // 非空时, 尾部node对象的 next属性 指向该 新node
      // 此时需要找到 next, 我们要沿着 node的 next 链去找咯, 这个链的开端是 head 对象
      let tempNode = this.head
      while (tempNode.next != null) {
        // 找到最后一个节点, 因为最后一个 node 的 next 为 null
        // 循环赋值
        tempNode = tempNode.next
      }
      tempNode.next = node
    }
    this.count++
  }
  // insert: 指定位置插入元素(前插法)
  insertBefore(ele, index) {
    // 边界判断
    if (index < 0 && index > this.count) return false; // 插入失败

    // 创建节点
    const node = new Node(ele)
    // 添加(链接)节点
    if (index === 0) {
      // 首位添加
      const firstItem = this.head // const声明不允许修改指向
      node.next = firstItem
      this.head = node
    } else {
      // 找到节点前后位置, 进行链接
      const prev = this.getEleByIndex(index - 1) // 上一个节点
      const curr = prev.next
      node.next = curr
      prev.next = node
    }

    this.count++
    return true // 前插成功
  }
  // getEle: 获取指定位置的元素
  getEleByIndex(index) {
    // 越界检查
    if (index < 0 || index >= this.count) return void 0;

    let tempNode = this.head // 首位元素
    for (let i = 0; i < index; i++) {
      tempNode = tempNode.next
    }
    return tempNode
  }
  // indexOf: 获取指定元素索引
  indexOf(ele) {
    // 从第一位开始遍历
    let curr = this.head
    for (let i = 0; i < this.count; i++) {
      // compare ele && node.item
      if (curr && this.equalFn(ele, curr.item)) {
        return i
      }
      curr = curr.next
    }
    return -1
  }
  // remove: 移除元素
  remove(ele) {
    // 找到元素的位置index, 通过index 移除
    const index = this.indexOf(ele)
    return this.removeByIndex(index)
  }
  // removeByIndex: 移除指定位置的元素
  removeByIndex(index) {
    // 越界检查
    if (index < 0 || index >= this.count) return void 0;

    let curr = this.head // 第一位元素的引用curr

    if (index === 0) {
      // 移除首个元素, 修改头指针指向首个元素的 next 指针
      this.head = this.head.next
    } else {
      // 移除其他位置的元素, 需要遍历链表节点
      // 怎么去遍历, 我们需要一个基础值, 还是头结点 head
      // let curr = this.head // 当前元素引用curr, 提出去
      let prev             // 上一个元素引用prev
      for (let i = 0; i < index; i++) {
        // 循环一次, 后移一位
        prev = curr
        curr = curr.next
      }
      // 循环完毕, curr 就是当前要移除的元素, 释放它的引用即可
      prev.next = curr.next
    }

    this.count--
    // 返回被移除的元素, 因为放在 else 的作用域里,访问不到, 所以要提出来
    return curr.item
  }
  // isEmpty: 判空
  isEmpty() {
    return this.count === 0
  }
  // size: 链表长度, 元素的个数
  size() {
    return this.count
  }
  // getFirst: 获取首个节点
  getFirst() {
    return this.head
  }
  // clear
  clear() {
    this.count = 0
    this.head = null
  }
  // toString: 返回链表字符串
  toString() {
    if (this.isEmpty()) return '';

    let objString = `${this.head.item}`
    let curr = this.head.next
    // curr 为 null 表示没有节点了
    for (let i = 0; i < this.size() && curr; i++) {
      // 拼接 curr.item
      objString = `${objString},${curr.item}`
      curr = curr.next
    }
    return objString
  }
}

const linklist = new LinkedList()

linklist.push('html')
linklist.push('css')
linklist.push('js')

console.log(linklist.count, linklist.getEleByIndex(2));
linklist.insertBefore('vue', 2)
console.log(linklist.getEleByIndex(3))
console.log(linklist.indexOf('vue'));
// console.log(linklist.remove('js'));
// console.log(linklist.remove('vue'));
console.log(linklist.toString())
console.log(linklist.size());
console.log(linklist.getFirst());
linklist.clear()
console.log(linklist, 1111);


/**
 * 双向链表: 一个节点有两个指针, 用来寻址, 链接前后节点关系
 * 每个节点都通过 next 和 prev 属性进行链接
 * 我们基于 上面的来实现
 * 指针: 对 Node 节点的引用
 * 应用: 适当降低单链表的遍历操作次数
 */

class DoubleNode extends Node {
  constructor(item, next, prev) {
    super(item, next)
    this.prev = prev // 前指针: 指向上一个节点
  }
}


class DoubleLinkedList extends LinkedList {
  constructor() {
    // this.equalFn = (arg1, arg2) => arg1 === arg2 // 辅助函数
    // this.head = null; // 初始指针,指向节点
    // this.count = 0      // 元素总数
    super()
    // 1. super 在 constructor 中作为函数调用
    // 必须在 this 之前调用
    // 相当于 => LinkedList.prototype.constructor.call(this, ...args)
    // LinkedList.call(this, ...args)
    this.tail = null //  尾指针,指向节点
  }
  // 2.super 作为成员使用
  // super.parentFn(), 此时 super 就是 LinkedList.prototype
  // 等价于 == > LinkedList.prototype.parentFn.call(this)

  // ************** 一些成员方法实现, 其他默认继承 ************
  // 前插法
  insertBefore(ele, index) {
    if (index >= 0 && index <= this.count) {
      // 创建节点, 遍历, 链接节点(首位,中位,末尾情况)
      const node = new DoubleNode(ele)
      let curr = this.head // 当前节点元素
      // 1.首位
      if (index === 0) {
        // 若为空链表
        if (curr == null) {
          this.head = node
          this.tail = node
        } else {
          // 非空
          node.next = curr
          this.head = node
          curr.prev = node
        }
      } else if (index === this.count) {
        // 2.末尾插入
        curr = this.tail
        curr.next = node
        node.prev = curr
        this.tail = node
      } else {
        // 3.中间插入, 先找到前节点
        const prevNode = this.getEleByIndex(index - 1)
        // 衔接
        curr = prevNode.next
        curr.prev = node
        node.next = curr
        node.prev = prevNode
        prevNode.next = node
      }
      this.count++
      return true
    }

    return false
  }
  // 移除
  removeByIndex(index) {
    // 越界处理
    if (index >= 0 && index < this.count) {
      let curr = this.head
      // 同样要分情况: 首位, 末尾, 中间位
      if (index === 0) {
        if (this.count === 1) {
          // 只有一位元素
          this.tail = null
        } else {
          curr.prev = null
        }
      } else if (index === this.count - 1) {
        curr = this.tail
        this.tail = curr.prev
        this.tail.next = null
      } else {
        // 释放当前节点的引用
        curr = this.getEleByIndex(index)
        const prevNode = curr.prev
        prevNode.next = curr.next
        curr.next.prev = prevNode
      }
      this.count--
      return curr.item
    }

    return void 0;
  }
}

/**
 * 循环链表: 最后一个元素指向第一个元素head
 */

class CircleLinkedList extends LinkedList {
  constructor() {
    super()
  }

  // ******* 重写插入和移除方法 ***********
  insertBefore(ele, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(ele)
      let curr = this.head
      // 头插 || 中间插入
      if (index === 0) {
        if (this.head == null) {
          // 空循环链表
          this.head = node
          // 末尾节点指向头结点
          node.next = this.head
        } else {
          node.next = curr
          curr = this.getEleByIndex(this.size()) // 末尾节点
          this.head = node
          curr.next = this.head
        }
      } else {
        const prevNode = this.getEleByIndex(index - 1)
        node.next = prevNode.next
        prevNode.next = node
      }
      this.count++
      return true
    }
    return false
  }

  removeByIndex(index) {
    if (index >= 0 && index < this.count) {
      let curr = this.head

      // 移除头部
      if (index === 0) {
        if (this.size() === 1) {
          this.head = null
        } else {
          const removeNode = this.head // 将要移除的 node
          curr = this.getEleByIndex(this.size())
          this.head = this.head.next
          curr.next = this.head
          curr = removeNode
        }
      } else {
        const prevNode = this.getEleByIndex(index - 1)
        curr = prevNode.next
        prevNode.next = curr.next
      }

      this.count--
      return curr.item
    }
    return void 0;
  } 
}

// 链表结构实现栈
class LinkStack {
  constructor() {
    this.list = new DoubleLinkedList()
  }

  // push: 入栈
  push(item) {
    this.list.push(item)
  }

  // pop: 出栈
  pop() {
    if (this.isEmpty()) return void 0;
    return this.list.removeByIndex(this.size() - 1).item
  }

  // peek: 获取栈顶元素
  peek() {
    if (this.isEmpty()) return void 0;
    return this.list.getFirst().item
  }

  // isEmpty: 判空
  isEmpty() {
    return this.list.isEmpty()
  }

  size() {
    return this.list.size()
  }

  clear() {
    this.list.clear()
  }

  toString() {
    return this.list.toString()
  }
}