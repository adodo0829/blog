/**
 * 有序链表
 * 特点
 * 元素有序
 */

const { Compare, defaultCompare, defaultEquals } = require("./utils.js");
const { LinkList } = require("./05-1-link-list");

class SortLinkList extends LinkList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn)
    this.equalsFn = equalsFn
    this.compareFn = compareFn
  }

  push(ele) {
    if (this.isEmpty()) {
      super.push(ele)
    } else {
      // 找到排序的位置插入
      const index = this.getIndexNextSortedElement(ele)
      super.insertAt(ele, index)
    }
  }

  insertAt(ele, index = 0) {
    if (this.isEmpty()) {
      return super.insertAt(ele, index === 0 ? index : 0)
    }
    const pos = this.getIndexNextSortedElement(ele)
    return super.insertAt(ele, pos)
  }

  getIndexNextSortedElement(ele) {
    let currNode = this.head
    let i = 0
    for (; i < this.size() && currNode; i++) {
      const res = this.compareFn(ele, currNode.element)
      if (res === Compare.LESS_THAN) {
        return i
      }
      currNode = currNode.next
    }
    return i
  }

}