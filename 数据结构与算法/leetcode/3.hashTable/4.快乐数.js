/**
编写一个算法来判断一个数 n 是不是快乐数。
「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果 可以变为  1，那么这个数就是快乐数。
如果 n 是快乐数就返回 True ；不是，则返回 False 。
示例：

输入：19
输出：true
解释：
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
 */

// 解读: 无限循环 =》 那么也就是说求和的过程中，sum会重复出现
// 终止条件: sum = 1
// 判断出现过没有 =》 哈希法
// 对数值各个位上的单数操作: 循环 n%10

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  // 用set存储出现过的sum || 或者map储存
  const set = new Set();
  const ONE = 1;

  const calcSum = (num) => {
    let sum = 0;
    while (num) {
      sum += (num % 10) ** 2;
      // next number
      num = Math.floor(num / 10);
    }
    return sum;
  };

  let total = calcSum(n);
  
  // 如果在循环中某个值重复出现，说明此时陷入死循环，也就说明这个值不是快乐数
  while (total !== ONE && !set.has(total)) {
    set.add(total);
    total = calcSum(total);
  }

  return total === ONE;
};
