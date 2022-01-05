/**
给定一个赎金信 (ransom) 字符串和一个杂志(magazine)字符串，
判断第一个字符串 ransom 能不能由第二个字符串 magazines 里面的字符构成。如果可以构成，返回 true ；否则返回 false。
(题目说明：为了不暴露赎金信字迹，要从杂志上搜索各个需要的字母，组成单词来表达意思。杂志字符串中的每个字符只能在赎金信字符串中使用一次。)
注意：
你可以假设两个字符串均只含有小写字母。
canConstruct("a", "b") -> false
canConstruct("aa", "ab") -> false
canConstruct("aa", "aab") -> true
 */

// 判断第一个字符串ransom能不能由第二个字符串magazines里面的字符构成
// 都是小写字母组成
// 这种找字母的类型题都可以使用hashArray来做
// 字母集 是固定的 26位 hash表, 每一位用来储存字符出现的次数

var isString1InString2 = (str1, str2) => {
  if (str1.length > str2.length) return false;

  const hashArray = new Array(26).fill(0);
  const baseIndex = "a".charCodeAt(0);

  // 字符全集
  for (const v of str2) {
    const currIndex = v.charCodeAt(0) - baseIndex;
    hashArray[currIndex]++;
  }

  // 目标字符
  for (const v of str1) {
    const currIndex = v.charCodeAt(0) - baseIndex;
    // 消费一个全集中的字符
    hashArray[currIndex]--;
    if(hashArray[currIndex] < 0) {
      return false
    }
  }

  return true;
};
