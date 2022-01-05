/**
给定一个字符串 s 和一个整数 k，你需要对从字符串开头算起的每隔 2k 个字符的前 k 个字符进行反转。
如果剩余字符少于 k 个，则将剩余字符全部反转。
如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
示例:
输入: s = "abcdefg", k = 2
输出: "bacdfeg"
*/

// 题意解析:
// 1.字符串s长度为len, 每隔2k (i自增2k)做一次处理,  将当前i到i+k的区间字符串翻转;
// 2.s遍历完的最后一个区间长度进行判断, 小于k个全部翻转, 大于等于k翻转前k个, 怎么判断这个条件

// 原地交换
var reverseStr = function (s, k) {
  const len = s.length;
  let arr = s.split("");

  for (let i = 0; i < len; i += 2 * k) {
    let l = i;
    let r = len - i < k ? len - 1 : i + k - 1;
    while (l < r) {
      [arr[l], arr[r]] = [arr[r], arr[l]];
      l++;
      r--;
    }
  }
  return arr.join("");
};
