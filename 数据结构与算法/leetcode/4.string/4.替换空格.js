/**
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
示例 1： 输入：s = "We are happy."
输出："We%20are%20happy."
 */

// 其实很多数组填充类的问题，都可以先预先给数组扩容带填充后的大小，然后在从后向前进行操作。
// 这么做有两个好处：
// 不用申请新数组。
// 从后向前填充元素，避免了从前先后填充元素要来的 每次添加元素都要将添加元素之后的所有元素向后移动。

// var replaceSpace = (s) => {
//   return s.replaceAll(/(\s)/g, '%20')
// }
var replaceSpace = (s) => {
  const strArr = Array.from(s);

  let spaceCount = 0;
  for (const v of strArr) {
    if (v === " ") {
      spaceCount++;
    }
  }

  // 从后往前填值, 得预先给数组扩容
  let leftIndex = strArr.length - 1;
  // %20: 一个空格 = 多增加两个字符
  let rightIndex = leftIndex + spaceCount * 2;

  // 开始填充
  while (leftIndex >= 0) {
    if (strArr[leftIndex] !== " ") {
      strArr[rightIndex--] = strArr[leftIndex--];
    } else {
      strArr[rightIndex--] = "0";
      strArr[rightIndex--] = "2";
      strArr[rightIndex--] = "%";
      leftIndex--;
    }
  }

  return strArr.join("");
};
