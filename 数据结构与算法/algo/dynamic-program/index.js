/**
 * 动态规划思想
 * 是一种将复杂问题分解成更小的子问题来解决的优化技术。
 *
 * 用动态规划解决问题时，要遵循三个重要步骤：
 * (1) 定义子问题；
 * (2) 实现要反复执行来解决子问题的部分（这一步要参考前一节讨论的递归的步骤）；
 * (3) 识别并求解出基线条件。
 * 一般多个解, 用矩阵存放(多维数组)
 */

// 最少硬币找零问题
// 给出要找零的钱数，以及可用的硬币面额 d1, …, dn及其数量，找到所需的最少的硬币个数
// 36 ==》 [1, 5, 10, 25] ==》 [1, 10, 25]
// 找解, 用数组中最少的数拼出36

function getMinCoinsGroup(coins, amount) {
  const cache = [];

  const makeChange = (total) => {
    if (total < 0) return [];

    if (cache[total]) {
      return cache[total];
    }

    let min = []; // 解
    let newTotal; // 每一次分解的总量
    let minCoins; // 临时存储

    for (let i = 0; i < coins.length; i++) {
      // 对每一种银币类型情况, 去递归所有组合的可能性
      const coin = coins[i];
      newTotal = total - coin;

      if (newTotal >= 0) {
        minCoins = makeChange(newTotal);
      }
      // 还得比较, 取最优解
      if (
        newTotal >= 0 &&
        (minCoins.length - 1 < min.length - 1 || !min.length) &&
        (minCoins.length || !newTotal)
      ) {
        min = [coin].concat(minCoins);
      }
    }
    console.log(cache);
    return (cache[total] = min);
  };
  return makeChange(amount);
}

console.log(getMinCoinsGroup([1, 5, 10, 25], 36));
