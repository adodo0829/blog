/**
 * 选择排序
 * 原址比较,找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推
 * 比冒泡的效率高点
 * 
 * 交换最小值索引
 */

const { arr, compareFn, swap, Res } = require("./index");

function selectSort(arr, compare = compareFn) {
  const len = arr.length
  let minIndex

  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i; j < len; j++) {
      // 找出本轮最小值的索引, arr[0]和arr[1...n]比较
      if (compare(arr[minIndex], arr[j]) === Res.MORE_THAN) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      // 依次和前置位交换值
      swap(arr, minIndex, i)
    }
  }
  console.log(arr.join())
  return arr
}

selectSort(arr)