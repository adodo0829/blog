/**
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：
  左括号必须用相同类型的右括号闭合。
  左括号必须以正确的顺序闭合。
  注意空字符串可被认为是有效字符串。
 */

var isValid = function (s) {
  const stack = [];

  // 遍历字符串, 将左括号对应的括号入栈
  // 分析不满足条件的情况
  // 1.左括号多余, =》 栈不为空
  // 2.右括号多余, =》 栈为空, 字符串多余
  // 3.括号不多余, 但是不对称, =》 字符与栈元素不匹配

  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    switch (item) {
      case "(":
        stack.push(")");
        break;
      case "{":
        stack.push("}");
        break;
      case "[":
        stack.push("]");
        break;
      default:
        // 此时是右括号, 判断是否按顺序匹配
        if (item !== stack.pop()) {
          return false;
        }
    }
  }

  return stack.length === 0;
};

var isValid1 = function (s) {
  const stack = [],
    map = {
      "(": ")",
      "{": "}",
      "[": "]",
    };
  for (const x of s) {
    if (x in map) {
      stack.push(x);
      continue;
    }
    if (map[stack.pop()] !== x) return false;
  }
  return !stack.length;
};
