/**
 * 快速排序
 * 先找到一个基准点（一般指数组的中部），然后数组被该基准点分为两部分，依次与该基准点数据比较，如果比它小，放左边；反之，放右边。
 * 左右分别用一个空数组去存储比较后的数据。
 * 最后递归执行上述操作，直到数组长度 <= 1;
 */
const { arr } = require("./index");

function quickSort(arr) {
  const len = arr.length;
  if (len <= 1) return arr // 1.递归终止条件

  const midIndex = len >> 1
  // 取中间值
  const midValue = arr.splice(midIndex, 1)[0]
  const left = []
  const right = []
  // 按基准值左右分
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    if (ele < midValue) {
      left.push(ele)
    } else {
      right.push(ele)
    }
  }
  // 一轮循环完毕, 分成两组; 再分
  const result = quickSort(left).concat([midValue], quickSort(right)) // 2.递推公式
  // console.log(result.join())
  return result
}

// quickSort(arr)

module.exports = {
  quickSort
}
