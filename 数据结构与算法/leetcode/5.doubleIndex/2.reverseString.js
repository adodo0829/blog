/**
 * 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
 * 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 $O(1)$ 的额外空间解决这一问题。
 */

var reverseString = (arr) => {
  // 中间位置对换
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    [arr[i], [arr[j]]] = [arr[j], arr[i]];
    i++;
    r--;
  }

  return arr;
};
