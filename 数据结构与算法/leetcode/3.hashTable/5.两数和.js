/**
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
 */

// 思路
// 使用 set 和 array的局限:
// 数组的大小是受限制的，而且如果元素很少，而哈希值太大会造成内存空间的浪费。
// set是一个集合，里面放的元素只能是一个key
// 而两数之和这道题目，不仅要判断y是否存在而且还要记录y的下标位置，因为要返回x 和 y的下标。所以set 也不能用。
// 这里使用map来储存
// key: 数组值, value: 数组索引
// 我们现在要找 target与数组每一项的差值在不在map里, 找完为止
// 本质上就是查找元素, 在之前的元素中找一个元素与当前值的和为target

var twoSum = function (nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    const prev = target - curr;

    if (map.has(prev)) {
      return [map.get(prev), i];
    }

    map.set(curr, i);
  }

  return [];
};
