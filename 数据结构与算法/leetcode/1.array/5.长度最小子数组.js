/**
 * 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的 长度最小的 连续 子数组，并返回其长度。
 * 如果不存在符合条件的子数组，返回 0。
 *
 * 输入：s = 7, nums = [2,3,1,2,4,3] 输出：2 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 */

// 分析: 条件: 连续元素之和 >= target, 连续元素个数最少

const arr = [7, 3, 1, 2, 4, 3];

var minSubArrayLen = function (target, nums) {
  let sum = 0;
  let subLen = 0;
  let res = +Infinity;

  for (let i = 0; i < nums.length; i++) {
    // 每一轮重置 sum
    sum = 0;

    for (let j = i; j < nums.length; j++) {
      const curr = nums[j];
      sum += curr;

      if (sum >= target) {
        subLen = j - i + 1;
        res = subLen < res ? subLen : res;
        break;
      }
    }
  }
  console.log(res);
  return res === +Infinity ? 0 : res;
};

minSubArrayLen(7, arr);

// 滑动窗口法, 也是双指针
// 不断的调节子序列的起始位置和终止位置，得出我们要想的结果。
/**
 * 窗口内是什么？ 满足其和 ≥ s 的长度最小的 连续 子数组
 * 如何移动窗口的起始位置？ 如果当前窗口的值大于s了，窗口就要向前移动了
 * 如何移动窗口的结束位置？ 窗口的结束位置就是遍历数组的指针，窗口的起始位置设置为数组的起始位置就可以了
 */

// 滑动窗口的精妙之处在于根据当前子序列和大小的情况，不断调节子序列的起始位置
// 转化为代码是
// 循环终止条件是啥?
// 循环内的指针增减

var minSubArrayLen1 = function (target, nums) {
  let sum = 0;   // 窗口内值的和
  let startIndex = 0; // 起点
  let subLen = 0 // 窗口长度
  let res = Infinity // 窗口比较值

  // 左指针移动需要一层遍历
  for (let i = 0; i < nums.length; i++) {
    // 累加和
    sum += nums[i]
    
    while (sum >= target) {
      // 我们需要在窗口内找解
      subLen = i - startIndex + 1
      res = res > subLen ? subLen : res
      // 此时我们需要位移低位指针
      sum -= nums[startIndex++]
    }
  }

  return res === Infinity ? 0 : res

};
