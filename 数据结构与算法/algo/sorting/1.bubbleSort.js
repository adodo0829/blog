/**
 * 冒泡排序:
 * 相邻的两个项，如果第一个比第二个大，则交换它们。
 * 对同一份内存空间进行位移操作
 */

const { arr, compareFn, swap, Res } = require("./index");

function bubbleSort(array, compare = compareFn) {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    // 外循环控制比较轮次: 每一位都需要和其他位进行比较
    for (let j = 0; j < length - 1 - i; j++) {
      // 内循环控制, 当前位位和下一位进行比较的次数; 如果已经排过了, 可以减少比较的次数
      let a = array[j];
      let b = array[j+1];
      if (compare(a, b) === Res.MORE_THAN) {
        swap(array, j, j+1);
      }
    }
  }
  console.log(array.join())
  return array
}

bubbleSort(arr)
