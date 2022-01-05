/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 * 注意： 答案中不可以包含重复的三元组。
 * 示例：
 * 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 * 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
 */

// 找数, 只是找不同的数组成的集合,
// 一层循环可以确定一个数, 两层可以确定两个, 用哈希法来确定 0-(a+b) 是否在 数组里出现过,
// 但是如何保证不重复呢, 元素不能重复, 可以先将原数组排序, 这样减少重复处理

// 双指针法, 也可以使用
// 元素1
// 元素left: 数组头部
// 元素right: 数组尾部
// 两个指针往中间夹, 相遇即遍历完所有情况

var threeSum = function (nums) {
  // 先将数组排序, 可以筛出一些不满足条件的元素
  const sortArr = nums.sort((a, b) => a - b);
  // 可以用set来存储 元素集合, 然后去重
  const set = new Set();

  // 从最小的开始
  for (let i = 0; i < sortArr.length; i++) {
    if (sortArr[i] > 0) return [];
    // 找剩下两元素,
    let left = i + 1;
    let right = sortArr.length - 1;
    while (right > left) {
      const sum = sortArr[i] + sortArr[left] + sortArr[right];
      if (sum > 0) {
        // 左移rigth
        right--;
        continue;
      }

      if (sum < 0) {
        left++;
        continue;
      }
      set.add(`${sortArr[i]},${sortArr[left]},${sortArr[right]}`);
      left++;
      right--;
    }
  }

  return Array.from(set).map((item) => item.split(","));
};
