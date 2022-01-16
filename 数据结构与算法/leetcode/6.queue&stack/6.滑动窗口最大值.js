/**
 * 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。
 * 你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
 * 返回滑动窗口中的最大值。
 */

// 超时
// var maxSlidingWindow = function (nums, k) {
//   const len = nums.length;
//   const res = [];

//   for (let i = 0; i < len - k; i++) {
//     // 窗口移动次数
//     const subArr = nums.slice(i, k + i);
//     const max = Math.max(...subArr)
//     res.push(max)
//   }

//   return res
// };

// 思路错误, 不能保证上一个窗口的最大值在下一个窗口里
// var maxSlidingWindow = function (nums, k) {
//   const len = nums.length;

//   // 只判断第一个窗口的最大值
//   const subArr = nums.slice(0, k);
//   const max = Math.max(...subArr);
//   const res = [max];

//   for (let i = k; i < len; i++) {
//     const item = nums[i];
//     const temp = res[res.length - 1];
//     item > temp ? res.push(item) : res.push(temp);
//   }

//   return res;
// };

class SortQueue {
  constructor() {
    this.items = [];
  }
  push(v) {
    if (this.isEmpty()) {
      this.items.push(v);
    } else {
      while (!this.isEmpty() && v > this.rail()) {
        this.items.pop();
      }
      this.items.push(v);
    }
  }
  pop(v) {
    if (!this.isEmpty() && v === this.peek()) {
      this.items.shift();
    }
  }
  peek() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }
  rail() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

// var maxSlidingWindow = function (nums, k) {
//   const sq = new SortQueue(); // 单调队列保存可能成为窗口内的最大值部分
//   const res = [];

//   for (let i = 0; i < k; i++) {
//     sq.push(nums[i]);
//   }
//   // 先放第一个窗口的值
//   res.push(sq.peek()); 

//   for (let i = k; i < nums.length; i++) {
//     // 滑动窗口移除最前面元素
//     sq.pop(nums[i - k]);
//     // 滑动窗口前加入最后面的元素
//     sq.push(nums[i]);
//     // 放入res
//     res.push(sq.peek())
//   }

//   return res
// };
// var maxSlidingWindow = function (nums, k) {
//   const queue = [] // 元素队列
//   const res = []

//   for (let i = 0; i < nums.length; i++) {
//     const item = nums[i];
//     // 移除队尾元素
//     while (queue.length && item >= queue[queue.length - 1]) {
//       queue.pop()
//     }

//     queue.push(item)
//     // 判断当前最大值（即队头元素）是否在窗口中，若不在便将其出队
//     // 0 - k - 1时先入队列, 当i到达k进入窗口移动阶段, 开始添加结果值
//     const isOutput = i >= k - 1
//     if (isOutput) {
//       res.push(queue[0])
//     }
//   }

//   return res
// }

class monoQueue {
  constructor() {
    this.list = []
  }

  push(item) {
    // 保证进入队列内元素是递减的
    while (!this.isEmpty() && item > this.peek()) {
      this.list.pop()
    }
    this.list.push(item)
  }

  pop(item) {
    // 最大值出队列
    if (!this.isEmpty() && item === this.head()) {
      this.list.shift()
    }
  }

  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.list[this.list.length - 1]
  }

  head() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.list[0]
  }

  isEmpty() {
    return this.list.length === 0
  }

}

var maxSlidingWindow = function (nums, k) {
  const res = [];
  const queue = new monoQueue()

  for (let i = 0; i < k; i++) {
    queue.push(nums[i])
  }
  // 此时有一个结果值了
  res.push(queue.head())

  for (let i = k; i < nums.length; i++) {
    // 操作队列头尾
    const left = nums[i - k]
    const right = nums[i]
    // 从前往后扫...
    queue.pop(left)
    queue.push(right)
    res.push(queue.head())
  }
  return res;
};

