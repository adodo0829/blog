// import { quickSort } from './1.sort.js'

function quickSort(arr) {
  if (arr.length <= 1) return arr; // 终止条件

  let left = []
  let right = []
  // 这个基准值随意取  这里取中间元素, 一定程度决定排序的速度
  let pivotIndex = Math.round(arr.length / 2) // 中间值索引
  let pivotValue = arr.splice(pivotIndex, 1)[0] // 中间值

  // 遍历,进行分区
  for (let i = 0; i < arr.length; i++) {
    arr[i] < pivotValue ? left.push(arr[i]) : right.push(arr[i])
  }
  return [...quickSort(left), pivotValue, ...quickSort(right)]
}
/**
 * 1.顺序搜索(线性搜索)
 * 遍历,比较
 */
const DOES_NOT_EXIST = -1;
function defaultEquals(a, b) {
  return a === b
}
function seqSearch(array, value, equalsFn = defaultEquals) {
  for (let i = 0; i < array.length; i++) {
    // 遍历, 逐项比对
    if (equalsFn(value, array[i])) {
      return i
    }
  }
  return DOES_NOT_EXIST;
}

/**
 * 2.二分查找
 * 分治法, 必须基于有序表
 * 应用时, 需要先将原始数据进行排序
 */
function binarySearch(arr, value) {
  arr = quickSort(arr)
  console.log(arr)
  let l = 0              // 前指针
  let r = arr.length - 1 // 后指针
  // 遍历数组
  while (l <= r) {
    let mid = (l + r) >> 1 // 位操作符取中位数
    //判断中间值
    if (arr[mid] < value) {
      l = mid + 1;
    } else if (arr[mid] > value) {
      r = mid - 1;
    } else {
      // 确保查到位置的是序列中第一个元素
      if (arr[mid - 1] === value) return mid - 1
      return mid
    }
  }
  //目标不在数组中  
  return DOES_NOT_EXIST;
}

console.log(binarySearch([5, 2, 5, 5, 6, 6, 8, 0, 3, 2, 3], 6))