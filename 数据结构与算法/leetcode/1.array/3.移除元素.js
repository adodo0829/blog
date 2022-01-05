/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并原地修改输入数组。
 * 元素的顺序可以改变。
 * 注意: 不需要考虑数组中超出新长度后面的元素. 后面的元素都可以截取掉
 */

let arr = [1, 2, 3, 12, 1, 1, 23, 2];

// 1.遍历数组, 每发现一位, 就位移往前位移一位, 然后修改length属性
var removeElement1 = function (nums, val) {
  let len = nums.length;

  for (let i = 0; i < len; i++) {
    if (val === nums[i]) {
      // 左移元素, 表示删除, 最后一位指向undefined
      // 如何左移? 需要替换每一位元素的索引为前一位
      for (let j = i + 1; j < len; j++) {
        nums[j - 1] = nums[j];
      }
      i-- // 因为下表i以后的数值都向前移动了一位，所以i也向前移动一位
      len-- // 此时需要遍历的长度的大小-1
    }
  }
  console.log(len)
  console.log(nums.slice(0, len))
};


// 2.有没有更好的方法
// 整两个指针, 通过一个快指针和慢指针在一个for循环下完成两个for循环的工作
// 这里指返回数组删除重复元素的新长度

var removeElement = function (nums, val) {
  let prev = 0 // 用指针来标记个数

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != val) {
      nums[prev] = nums[i]
      prev++
    }
  }
  console.log(prev, nums.slice(0, prev))
  return prev
}

removeElement(arr, 1);
