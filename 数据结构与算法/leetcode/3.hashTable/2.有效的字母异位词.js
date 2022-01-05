/**
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 示例 1: 输入: s = "anagram", t = "nagaram" 输出: true
 * 示例 2: 输入: s = "rat", t = "car" 输出: false
 */

// 定义一个数组叫做record用来上记录字符串s里字符出现的次数。
// 需要把字符映射到数组也就是哈希表的索引下表上，因为字符a到字符z的ASCII是26个连续的数值，所以字符a映射为下表0，相应的字符z映射为下表25
// 遍历s和t, 一个增,一个减, 判断最终的hashTable元素的值是否为0

var isAnagram = (s, t) => {
  if (s.length !== t.length) {
    return false;
  }

  const strList = new Array(26).fill(0); // 初始化一个hash表
  const startIndex = "a".charCodeAt();

  for (const val of s) {
    // 索引值 +
    const key = val.charCodeAt() - startIndex;
    strList[key]++;
  }

  for (const val of t) {
    // 索引值 -
    // 如果有的元素不为零
    const key = val.charCodeAt() - startIndex;
    if (strList[key]) {
      strList[val.charCodeAt() - startIndex]--;
    } else {
      return false
    }
  }

  return true
};
