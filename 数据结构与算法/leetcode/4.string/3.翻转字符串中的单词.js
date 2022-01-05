/**
给定一个字符串，逐个翻转字符串中的每个单词。

示例 1：
输入: " the sky is blue"
输出: "blue is sky the"
多余的空格需要处理
*/

// 思路1
// 移除多余空格
// 将整个字符串反转
// 将每个单词反转

// ============ 尾部最后一个单词无法处理 =============
// var reverseWords = function (s) {
//   const len = s.length;
//   let arr = [];
//   let temp = "";

//   for (let i = 0; i <= len; i++) {
//     const item = s[i];
//     // 处理开头, 中间, 结尾的多余空格
//     // 最后一个为空时, temp为空, 这种情况兼容不到
//     if (item !== " " || i === len) {
//       if (temp) {
//         arr.unshift(temp);
//         temp = "";
//       }
//     } else {
//       temp += item;
//     }

//     console.log(temp);
//   }

//   return arr.join(" ");
// };

var reverseWords = (s) => {
  // 转化成str array原地操作
  const removeExtraSpace = (arr) => {
    let fastIndex = 0;
    let slowIndex = 0;

    // 遍历条件
    while (fastIndex < arr.length) {
      // 移除多余space, 但是得兼容开始位置
      if (
        arr[fastIndex] === " " &&
        (fastIndex === 0 || arr[fastIndex - 1] === " ")
      ) {
        fastIndex++;
      }
      // 怎么移除呢? 给数组元素重新赋值, 那新的索引呢? 所以这里需要定义一个新指针
      else {
        arr[slowIndex] = arr[fastIndex];
        slowIndex++;
        fastIndex++;
      }
    }

    // 重新划分数组的长度, 相当于把空格移除了
    // 需要处理最后一个空格
    arr.length = arr[slowIndex - 1] === " " ? slowIndex - 1 : slowIndex;
  };

  const reverseStrArr = (arr, start, end) => {
    // 操作数组区间元素
    let left = start;
    let right = end;

    while (left < right) {
      // 交换
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  };

  const strArr = Array.from(s);

  // 去多余space
  removeExtraSpace(strArr);
  // 翻转str数组
  reverseStrArr(strArr, 0, strArr.length - 1);

  // 翻转局部str arr
  let tempIndex = 0;
  for (let i = 0; i <= strArr.length; i++) {
    if (strArr[i] === " " || i === strArr.length) {
      // 注意i-1
      reverseStrArr(strArr, tempIndex, i - 1);
      tempIndex = i + 1;
    }
  }

  return strArr.join("");
};

console.log(reverseWords("   the   sky  is  blue  "));
