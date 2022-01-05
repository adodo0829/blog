/**
 * 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
 * 示例 2： 输入：nums = [-7,-3,2,3,11] 输出：[4,9,9,49,121]
 */

let arr = [-9, -7, -3, 2, 3, 11];
// 解析:
// 1.先平方每个元素, 再排序
var sortedSquares1 = function (nums) {
  let a = [...nums]
  for (let i = 0; i < a.length; i++) {
    a[i] *= a[i];
  }
  console.log(a);
  
  function quickSort(arr) {
    if (arr.length <= 1) return arr;

    const midIndex = Math.floor((arr.length) / 2)
    const midValue = arr.splice(midIndex, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
      let curr = arr[i]
      if (curr < midValue) {
        left.push(curr)
      } else {
        right.push(curr)
      }
    }

    return quickSort(left).concat([midValue], quickSort(right))
  }

  quickSort(a);
};

// sortedSquares1(arr);

// 2.双指针法
// 数据结构的特性是, 数组是有序的, 负数最小值和正数最大值在两头, 我依次存放到一个新数组里
// 两个比较指针
// 一个位置索引
// 绝对值的概念

var sortedSquares = function (nums) {
  let res = []
  let i = 0
  let j = k = nums.length - 1

  while (i <= j) {
    const left = nums[i] * nums[i]
    const right = nums[j] * nums[j]

    // 从大往小排, 给res每个位置放一个值
    if (left < right) {
      res[k] = right
      k--
      j--
    } else {
      res[k] = left
      k--
      i++
    }
  }

  console.log(res)
  return res
}

sortedSquares(arr)