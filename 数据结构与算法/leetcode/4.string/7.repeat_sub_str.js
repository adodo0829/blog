/**
* 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
示例 1:
输入: "abab"
输出: True
解释: 可由子字符串 "ab" 重复两次构成。

示例 2:
输入: "aba"
输出: False
*/

// 找子串
var repeatedSubstringPattern = function (s) {
  function isRepeat(s, sub) {
    const sLen = s.length;
    const subLen = sub.length;
    // 对比字符
    for (let j = 0; j < sLen; j++) {
      if (s[j] !== sub[j % subLen]) {
        return false;
      }
    }
    return true;
  }

  const len = s.length;
  if (len === 1) return false;
  for (let i = 1; i < len / 2 + 1; i++) {
    if (len % i === 0) {
      // 整除, 然后判断某个子串
      let sub = s.substr(0, i);
      if (isRepeat(s, sub)) {
        return true;
      }
    }
  }

  return false;
};
