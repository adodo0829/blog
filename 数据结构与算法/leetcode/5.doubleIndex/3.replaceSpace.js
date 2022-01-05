// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

// 1.字符串转数组处理, 给数组扩容
// 空格数量 spaceCount

// 2.从后往前填值, 得预先给数组扩容
let leftIndex = strArr.length - 1;
// %20: 一个空格 = 多增加两个字符
let rightIndex = leftIndex + spaceCount * 2;