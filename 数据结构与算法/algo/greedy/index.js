/**
 * 贪心算法
 * 遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优选择（当前最好的解），从而达到全局的最优（全局最优解）。
 */

// 从最大面额的硬币开始，拿尽可能多的这种硬币找零。当无法再拿更多这种价值的硬币时，开始拿第二大价值的硬币
function getMinCoinsGroup(coins, amount) {
  let min = [];
  // 从最大面额开始组合
  let current = 0;

  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];
    while (current + coin <= amount) {
      // 当无法再拿更多这种价值的硬币时，开始拿第二大价值的硬币
      current += coin;
      min.push(coin);
    }
  }
  console.log(min)
  return min;
}

getMinCoinsGroup([1,5,10,25], 36)