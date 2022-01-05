/**
 * 链表
 * 链表存储`有序的元素集合`，但不同于数组，链表中的元素在内存中并不是连续放置的。
 * 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。
 * 特性:
 * - 由于元素内存地址不连续, 插入和移动效率高
 * - 但访问链表中间的一个元素，则需要从起点（表头）开始迭代链表
 * - 尾部节点引用指向null
 * - 头部节点head为第一个元素
 */

const { Node, defaultEquals } = require("./utils");

class LinkList {
  constructor(equalsFn = defaultEquals) {
    this.len = 0;
    this.head = null; // 头部节点引用
    this.equalsFn = equalsFn;
  }
  isEmpty() {
    return this.len === 0;
  }
  // 尾部添加元素
  push(ele) {
    const node = new Node(ele);

    if (this.head === null) {
      this.head = node;
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }

    this.len++;
  }
  // 任意位置插入元素
  insertAt(ele, index) {
    // 越界检查
    if (index < 0 || index > this.len) return false;

    const node = new Node(ele);
    if (index === 0) {
      let curr = this.head;
      node.next = curr;
      this.head = node;
    } else {
      let prev = this.getEleAt(index - 1);
      let curr = prev.next;
      prev.next = node;
      node.next = curr;
    }

    this.len++;
    return true;
  }
  // 获取元素
  getEleAt(index) {
    if (index >= this.len || index < 0) return null;
    let currNode = this.head;
    for (let i = 1; i <= index && currNode !== null; i++) {
      currNode = currNode.next;
    }
    return currNode;
  }
  // 获取 节点元素值 索引
  indexOf(ele) {
    let currNode = this.head;

    for (let i = 0; i < this.len && currNode !== null; i++) {
      if (this.equalsFn(ele, currNode.element)) {
        return i;
      }
      currNode = currNode.next;
    }
    return -1;
  }
  // 移除元素
  remove(ele) {
    let currIndex = this.indexOf(ele);
    if (currIndex === -1) return;
    this.removeAt(currIndex);
  }
  // 指定位置删除
  removeAt(index) {
    // 越界检查
    if (index >= this.len || index < 0) return;

    let currNode = this.head;
    // 移除的元素: 头节点和其他节点
    if (index === 0) {
      this.head = currNode.next;
    } else {
      let prevNode = this.getEleAt(index - 1);
      currNode = prevNode.next;
      prevNode.next = currNode.next;
    }
    this.len--;
    return currNode.element;
  }
  size() {
    return this.len;
  }
  getHead() {
    return this.head;
  }
  toString() {
    if (this.isEmpty()) return "";

    let str = `${this.head.element}`;
    let currNode = this.head.next;
    
    for (let i = 1; i < this.len && currNode !== null; i++) {
      str = `${str},${currNode.element}`;
      currNode = currNode.next;
    }

    return str
  }
}

const ll = new LinkList();
ll.push("aaaa");
ll.push("bbbb");
ll.push("cccc");
// console.log(ll);
// console.log(ll.getEleAt(0))
// console.log(ll.getEleAt(1))
// console.log(ll.getEleAt(2))
// console.log(ll.getEleAt(3))
// console.log(ll.removeAt(3));
console.log(ll);
console.log(ll.toString());


module.exports = {
  LinkList
}