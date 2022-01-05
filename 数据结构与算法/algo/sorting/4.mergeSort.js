/**
 * 归并排序是一种分而治之算法(递归)。
 * 其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
 *
 * 先拆成小数组, 在合并
 */
const { arr } = require("./index");

// 归并排序将一个大数组转化为多个小数组直到其中只有一个项。由于算法是递归的，我们需要一个停止条件，在这里此条件是判断数组的长度是否为 1
function mergeSort(arr) {
  // 怎么拆, 怎么合
  const len = arr.length;
  if (len <= 1) return arr;

  // 先一分为二
  // x >> 1 是位运算中的右移运算，表示右移一位，等同于 x 除以 2 再取整，即 x >> 1 === Math.floor(x / 2) 。
  // let mid = Math.floor(len / 2);
  let mid = len >> 1;
  const leftArr = mergeSort(arr.slice(0, mid));
  const rightArr = mergeSort(arr.slice(mid, len));
  // 再合并两个数组, 排序两个值
  return merge(leftArr, rightArr);
}

function merge(left, right) {
  const resultArr = [];
  // 遍历, 比较左右数组中项, 加入到新数组
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      resultArr.push(left.shift());
    } else {
      resultArr.push(right.shift());
    }
  }
  while (left.length) resultArr.push(left.shift());
  while (right.length) resultArr.push(right.shift());
  console.log(resultArr.join())
  return resultArr;
}

console.time('time')
mergeSort(arr);
console.timeEnd('time')
