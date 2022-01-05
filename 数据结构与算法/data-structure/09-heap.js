/**
 * 二叉堆
 * 特性:
 * 结构特性: 完全二叉树,且最后一层的叶节点尽可能都是左侧子节点
 * 堆特性: 二叉堆不是最小堆就是最大堆。最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值
 */

const { defaultCompare, Compare } = require('./utils')

// heap = [1,2,3,4,5,6,7,8,9]
function swap(array, a, b) {
  const temp = array[a]
  array[a] = array[b]
  array[b] = temp
}

class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    // 数组实现, index索引
    // 对象实现, 动态指针
    this.heap = []
  }

  // 获取节点索引, 我们用索引来定位节点位置
  getParentIndex(index) {
    if (index === 0) return null
    return Math.floor((index - 1) / 2)
  }
  getLeftIndex(index) {
    return index * 2 + 1
  }
  getRightIndex(index) {
    return index * 2 + 2
  }

  // 向堆中插入值: 指将值插入堆的底部叶节点, 
  // 再将这个值和它的父节点进行交换，直到父节点小于这个插入的值(称为上移操作)
  insert(val) {
    if (val == null) return false
    this.heap.push(val)
    this.siftUp(this.heap.length - 1)
    return true
  }
  // 上移操作, 移动位置, 直到父节点小于这个插入的值
  siftUp(index) {
    let parent = this.getParentIndex(index)
    while (index > 0 && this.compareFn(this.heap[index], parent) === Compare.BIGGER_THAN) {
      // 交换位置
      swap(this.heap, parent, index)
      // 获取下一个父节点
      index = parent
      parent = this.getParentIndex(index)
    }
  }
  
  // 导出最值: 移除最小值（最小堆）或最大值（最大堆）表示移除数组中的第一个元素（堆的根节点）。
  // 在移除后，我们将堆的最后一个元素移动至根部并执行 siftDown 函数，表示我们将交换元素直到堆的结构正常
  extract() {
    if (this.isEmpty) return null
    if (this.size() === 1) return this.heap.shift()
    const removed = this.heap.shift()
    // 下移
    this.siftDown(0)
    return removed
  }
  siftDown(index) {
    let temp = index
    const left = this.getLeftIndex(index)
    const right = this.getRightIndex(index)
    const size = this.size()

    if (left < size && this.compareFn(this.heap[index], this.heap[left]) === Compare.BIGGER_THAN) {
      temp = left
    }
    if (right < size && this.compareFn(this.heap[index], this.heap[right]) === Compare.BIGGER_THAN) {
      temp = right
    }
    if (index != temp) {
      swap(this.heap, temp, index)
      this.siftDown(temp)
    }
  }
  //返回最值
  findMinimum() {
    return this.isEmpty() ? null : this.heap[0]
  }
  size() {
    return this.heap.length
  }
  isEmpty() {
    return this.size() === 0
  }
}

function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a);
 }

// 最大堆, 升序排布
class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = reverseCompare(compareFn)
  }
}
