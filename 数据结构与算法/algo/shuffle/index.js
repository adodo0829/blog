/**
 * 将一个数组中的值进行随机排列
 */

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

// 从最后一位开始并将当前位置和一个随机位置进行交换。这个随机位置比当前位置小, 不会重复洗牌
function shuffle(arr) {
  const len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    swap(arr, random, i);
  }
  console.log(arr);
}

let a = [1, 2, 42, 321, 21, 22, 11, 6, 77, 5534, 3, 5];
shuffle(a);
