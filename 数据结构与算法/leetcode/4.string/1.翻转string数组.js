/**
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。
示例 1：
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
 */

// var reverseString = function (s) {
//   let l = 0;
//   let r = s.length - 1;

//   while (l < s.length / 2 ) {
//     [s[l], s[r]] = [s[r], s[l]];
//     l++
//     r--
//   }

//   return s;
// };

var swap = function (arr, i1, i2) {
  let temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
};

var reverseString = function (s) {
  const leng = s.length;
  for (let i = 0, j = leng - 1; i < leng / 2; i++, j--) {
    swap(s, i, j);
  }

  return s;
};
