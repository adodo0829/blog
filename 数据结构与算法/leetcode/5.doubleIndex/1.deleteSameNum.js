/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 $O(1)$ 额外空间并原地修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
示例 1: 给定 nums = [3,2,2,3], val = 3, 函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。 
你不需要考虑数组中超出新长度后面的元素。
 */

// 要知道数组的元素在内存地址中是连续的，不能单独删除数组中的某个元素，只能覆盖。

// var removeElement = function (nums, val) {
//   let len = nums.length;

//   // 遍历操作一轮, 当nums[i] === val, 将后面的元素往前移
//   for (let i = 0; i < len; i++) {
//     const ele = nums[i];
//     if (ele === val) {
//       // 将后面的元素往前移
//       for (let j = i + 1; j < len; j++) {
//         nums[j - 1] = nums[j];
//       }
//       // 元素前移, i也要前移一位
//       i--;
//       len--;
//     }
//   }

//   return len;
// };

// 快慢指针
var removeElement = function (nums, val) {
  // 快指针负责移动和比较
  let fast = 0;
  // 慢指针负责标记,改变元素
  let slow = 0;

  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
};
