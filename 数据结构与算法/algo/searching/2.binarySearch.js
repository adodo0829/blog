/**
 * 二分搜索
 * 二分搜索算法的原理和猜数字类似,要求被搜索的数据结构已排序.
 * 
 * 实现:
 * (1) 选择数组的中间值。
 * (2) 如果选中值是待搜索值，那么算法执行完毕（值找到了）。
 * (3) 如果待搜索值比选中值要小，则返回步骤 1 并在选中值左边的子数组中寻找（较小）。
 * (4) 如果待搜索值比选中值要大，则返回步骤 1 并在选种值右边的子数组中寻找（较大）。
 */

const { quickSort } = require('../sorting/5.quickSort')
const { arr } = require("../sorting/index");

function binarySearch(arr, v) {
  const sortedArr = quickSort(arr)
  console.log(sortedArr)
  let lowIndex = 0
  let highIndex = sortedArr.length - 1
  let midIndex, midValue
  // 两个指针往中间夹逼
  while (lowIndex <= highIndex) {
    midIndex = Math.floor((lowIndex + highIndex) / 2)
    midValue = sortedArr[midIndex]

    if (v < midValue) {
      highIndex = midIndex - 1
    } else if (v > midValue) {
      lowIndex = midIndex + 1
    } else {
      return midIndex
    }
  }
  return -1
}

console.log(binarySearch(arr, 3))