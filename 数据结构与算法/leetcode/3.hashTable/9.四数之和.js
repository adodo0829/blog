/**
 * 题意：给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
 * 注意：
 * 答案中不可以包含重复的四元组。
 * 示例： 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。 满足要求的四元组集合为： [ [-1, 0, 0, 1], [-2, -1, 1, 2], [-2, 0, 0, 2] ]
 */

// 双指针, 多加一层遍历
// 跳过排序中重复的元素

var fourSum = (nums, target) => {
  if (nums.length < 4) return [];
  const res = [];
  const sortArr = nums.sort((a, b) => a - b);

  for (let i = 0; i < sortArr.length - 3; i++) {
    // 去重 i, 遍历次数 len - 3, 后边有三个待定数
    if (i > 0 && sortArr[i] === sortArr[i - 1]) {
      continue;
    }

    for (let j = i + 1; j < sortArr.length - 2; j++) {
      // 去重 j, 遍历次数 len - 3, 后边有俩个待定数
      if (j > i + 1 && sortArr[j] === sortArr[j - 1]) {
        continue;
      }

      // 定义指针的起始点
      let left = j + 1; // 第三个数
      let right = sortArr.length - 1; // 第四个数
      while (left < right) {
        const temp = sortArr[i] + sortArr[j] + sortArr[left] + sortArr[right];
        if (temp > target) {
          right--;
          continue;
        }

        if (temp < target) {
          left++;
          continue;
        }

        if (temp === target) {
          res.push([sortArr[i], sortArr[j], sortArr[left], sortArr[right]]);
          // 指针元素去重
          while (left < right && sortArr[left] === sortArr[left + 1]) {
            left++;
          }
          while (left < right && sortArr[right] === sortArr[right - 1]) {
            right--;
          }
          left++;
          right--;
        }
      }
    }
  }

  return res;
};
