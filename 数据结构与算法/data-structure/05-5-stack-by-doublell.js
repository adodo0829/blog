/**
 * 双向链表实现栈
 */

const { DoubleLinkList } = require('./05-2-double-link-list')

class Stack {
  constructor() {
    this.items = new DoubleLinkList()
  }

  push(item) {
    this.items.push(item)
  }

  pop() {
    if(this.isEmpty()) return null
    return this.items.removeAt(this.size() - 1)
  }

  peek() {
    if(this.isEmpty()) return null
    return this.items.getEleAt(this.size() - 1).element
  }

  isEmpty() {
    return this.items.isEmpty()
  }

  size() {
    return this.items.size()
  }

  clear() {
    this.items.clear()
  }
}

const ss = new Stack()

ss.push('a111')
ss.push('b222')
ss.push('c333')

console.log(ss)
console.log(ss.pop())