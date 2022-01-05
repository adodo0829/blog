/**
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 * 输入: nums = [-1,0,3,5,9,12], target = 9
 * 输出: 4
 * 解释: 9 出现在 nums 中并且下标为 4
 */

// 解析: 数组为有序数组，同时题目还强调数组中无重复元素，因为一旦有重复元素，使用二分查找法返回的元素下标可能不是唯一的，这些都是使用二分法的前提条件
// 写二分法，区间的定义一般为两种，左闭右闭即[left, right]，或者左闭右开即[left, right)。

// 1.[left, right], while(left <= right), <= 有效, 边界值都要取到
var search = function (nums, target) {
  let l = 0;
  let r = nums.length - 1;
  let m = (l + r) >> 1;
  if (target === nums[m]) {
    return m;
  } else if (target < nums[m]) {
    r = m - 1;
  } else if (target > nums[m]) {
    l = m + 1;
  }

  return -1;
};

// 2.[left, right) 怎么取边界值, 边界判断 left < right;
// 这里right应该为length, 需要包含整个区间数据, 那么left===right无意义
// target小于nums[mid]时,  right更新为mid, 因为nums[mid]不等于target, 所以下次遍历不会比较mid
var search = function (nums, target) {
  let l = 0;
  let r = nums.length;

  while (l < r) {
    let m = (l + r) >> 1;
    if (target === nums[m]) {
      return m;
    } else if (target < nums[m]) {
      r = m;
    } else if (target > nums[m]) {
      l = m + 1;
    }
  }

  return -1;
};
