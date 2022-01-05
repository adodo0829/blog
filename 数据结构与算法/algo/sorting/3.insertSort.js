/**
 * 插入排序
 * 假定第一项已经排序了。接着，它和第二项进行比较——第二项是应该待在原位还是插到第一项之前呢？
 * 这样，头两项就已正确排序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢），以此类推
 *
 * 就是把前面的先排好, 后面的数 往前面排好的序列里插入, 找到自己合适的位置, 直到迭代完整个数组
 * 往前插值, 构造新数组, 这种方式, 前面的已经排好, 内循环需要遍历前面部分, 每次和当前位比较, 谁大谁就是这个值
 * 
 * 排序小型数组时，此算法比选择排序和冒泡排序性能要好
 */

const { arr, compareFn, swap, Res } = require("./index");

function insertSort(arr, compare = compareFn) {
  const len = arr.length;
  let temp;

  for (let i = 1; i < len; i++) {
    temp = arr[i];
    let j = i;
    while (j > 0) {
      if (compare(arr[j - 1], temp) === Res.MORE_THAN) {
        arr[j] = arr[j - 1]; // 等价于数组右移操作 -->
        j--;
      } else {
        break;
      }
    }
    arr[j] = temp;
  }
  console.log(arr.join());
}

insertSort(arr);
