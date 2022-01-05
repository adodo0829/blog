/**
 * 双向链表
 * 特点:
 * 一个节点有两个指针: prev和next
 * 头,尾节点指针, 可以理解为一个占位符, 可以双向遍历: head和tail
 * 双向 增删改查
 */
const { Node, defaultEquals } = require('./utils')
const { LinkList } = require('./05-1-link-list')

class DoubleNode extends Node {
  constructor(ele, next, prev) {
    super(ele, next)
    this.prev = prev
  }
}

class DoubleLinkList extends LinkList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
    this.tail = null // 尾节点
  }

  push(ele) {
    const node = new DoubleNode(ele)
    if (this.head == null) {
      this.head = node
      this.tail = node
    } else {
      // 拼在尾节点上
      this.tail.next = node
      node.prev = this.tail
      // 更改尾部指针
      this.tail = node
    }
    this.len++
  }

  insertAt(ele, index) {
    if (index >= 0 && index <= this.len) {
      const node = new DoubleNode(ele)
      let curr = this.head
      // 头部插入
      if (index === 0) {
        // 空链表
        if (this.head == null) {
          this.head = node
          this.tail = node
        } else {
          // 非空
          node.next = this.head
          this.head.prev = node
          this.head = node
        }
      } else if (index === this.len) {
        // 尾部插入, 同上
        curr = this.tail
        curr.next = node
        node.prev = curr
        this.tail = node
      } else {
        const prevNode = this.getEleAt(index - 1)
        curr = prevNode.next
        node.next = curr
        prevNode.next = node
        curr.prev = node
        node.prev = prevNode
      }
      this.len++
      return true
    }
    return false
  }

  removeAt(index) {
    if (index >= 0 && index < this.len) {
      let curr = this.head
      // 删头
      if (index === 0) {
        this.head = curr.next
        // 如果只存在一个节点, 尾节点怎么处理
        if (this.len === 1) {
          this.tail = null
        } else {
          this.head.prev = null
        }
      } else if(index === this.len - 1) {
        curr = this.tail
        this.tail = curr.prev
        this.tail.next = null
      } else {
        curr = this.getEleAt(index)
        const prevNode = curr.prev
        prevNode.next = curr.next
        curr.next.prev = prevNode
      }
      this.len--
      return curr.element
    }
    return null
  }

  indexOf(ele) {
    let curr = this.head
    let index = 0
    while (curr != null) {
      if (this.equalsFn(ele, curr.element)) {
        return index
      }
      index++
      curr = curr.next
    }
    return -1
  }

  getHead() {
    return this.head
  }

  getTail() {
    return this.tail
  }

  toString() {
    let curr = this.head
    if (curr == null) return ''

    let str = `${curr.element}`
    while (curr.next != null) {
      str = `${str},${curr.element}`
      curr = curr.next
    }
    return str
  }

  inverseToString() {
    if (this.tail == null) return ''

    let str = `${this.tail.element}`
    let prevNode = this.tail.prev
    while (prevNode != null) {
      str = `${str},${curr.element}`
      prevNode = prevNode.prev
    }
    return str
  }
}


module.exports = {
  DoubleLinkList
}