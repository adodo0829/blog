/**
 * 实现 strStr()
 * 在一个串中查找是否出现过另一个串，这是KMP典型实践
 *
 * 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
 * 示例 1: 输入: haystack = "hello", needle = "ll" 输出: 2
 */

// KMP解法,当出现字符串不匹配时，可以知道一部分之前已经匹配的文本内容，可以利用这些信息避免从头再去做匹配
// 原始文本串    目标模式串

// 对模式串求前缀表
// 前缀表用来回退的，它记录了模式串与主串(文本串)不匹配的时候，模式串应该从哪里开始重新匹配
// 前缀表: 记录下标i之前（包括i）的字符串中，有多大长度的相同前缀后缀, aaafa =》 01201

var strStr1 = function (haystack, needle) {
  if (needle.length === 0) {
    return 0;
  }

  // 模式串的前缀表
  const genNextList = (s) => {
    let next = Array.from(s.length).fill(-1);
    let pos = -1; // 前缀个数

    for (let i = 0; i < s.length; i++) {
      // 前缀是否回退
      while (pos >= 0 && s[i] !== s[pos + 1]) {
        pos = next[pos];
      }

      if (s[i] === s[pos + 1]) {
        pos++;
      }

      next[i] = pos;
    }

    return next;
  };

  const nextList = genNextList(needle);
  console.log(nextList);

  let temp = -1; // next数组里记录的起始位置为-1
  for (let i = 0; i < haystack.length; ++i) {
    // 匹配不上的case, 需要 move back temp
    while (temp >= 0 && haystack[i] !== needle[temp + 1]) {
      temp = nextList[temp];
    }

    if (haystack[i] === needle[temp + 1]) {
      temp++;
    }

    if (temp === needle.length - 1) {
      return i - (needle.length - 1);
    }
  }

  return -1;
};

let o = "aabaabaafewq";
let m = "aabaaf";

const strStr = (haystack, needle) => {
  let m = needle.length;
  if (m === 0) {
    return 0;
  }
  let n = haystack.length;
  if (n < m) {
    return -1;
  }

  let i = 0;
  let j = 0;
  // 窗口大小
  while (i < n - m + 1) {
    // 找到首字母相等
    while (i < n && haystack[i] !== needle[j]) {
      i++;
    }
    if (i == n) {
      // 没有首字母相等的
      return -1;
    }

    // 遍历后续字符，判断是否相等
    i++;
    j++;
    while (i < n && j < m && haystack[i] === needle[j]) {
      i++;
      j++;
    }
    if (j == m) {
      // 找到
      return i - j;
    } else {
      // 未找到
      i -= j - 1;
      j = 0;
    }
  }
  return -1;
};
