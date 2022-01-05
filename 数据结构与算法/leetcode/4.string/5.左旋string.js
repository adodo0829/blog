/**
 * 字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

示例 1：
输入: s = "abcdefg", k = 2
输出: "cdefgab"
 */

// 局部反转+整体反转 达到左旋转的目的。

// 具体步骤为：

// 反转区间为前n的子串
// 反转区间为n到末尾的子串
// 反转整个字符串

var reverseLeftWords = function (s, n) {
  // let s1 = s.slice(0, n);
  // let s2 = s.slice(n);

  // return s2 + s1;

  const len = s.length;
  let i = 0;

  // 索引n后的字符往前追加, 总共移动len - n
  while (i < len - n) {
    // 最后一位依次往前加
    s = s[len - 1] + s;
    i++;
  }

  return s.slice(0, len);
};
