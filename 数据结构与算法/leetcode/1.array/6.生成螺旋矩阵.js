/**
 * 给定一个正整数 n，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
 * 示例:
 * 输入: 3 输出:
 * [
 *  [ 1, 2, 3 ],
 *  [ 8, 9, 4 ],
 *  [ 7, 6, 5 ]
 * ]
 * 填充上行从左到右
 * 填充右列从上到下
 * 填充下行从右到左
 * 填充左列从下到上
 */

// n为奇数, 循环画4条边 + 中间点
// n为偶数, 循环画4条边
// 循环的起点位置, 循环次数;
// 每轮边循环的起始点
// 相当于给n阶矩阵填空
var generateMatrix = function (n) {
  // 生成一个n阶矩阵
  const res = Array.from({ length: n }).map(() => new Array(n));
  // 矩阵单元格初始值
  let value = 1;
  // 需要循环的次数
  const loopCount = n >> 1;
  // n为奇数时的中间点
  const midIndex = n >> 1;
  // 每轮边循环长度偏移量
  let offset = 1;
  // 起始点坐标
  let x = 0;
  let y = 0;
  // 位置指针
  let i, j;
  while (loopCount > 0) {
    i = x;
    j = y;

    // 开始画边, 填充元素, 左闭右开
    // 填充上行从左到右
    for (j = y; j < y + n - offset; j++) {
      res[x][j] = value++;
    }

    // 填充右列从上到下
    for (i = x; i < x + n - offset; i++) {
      res[i][j] = value++;
    }

    // 填充下行从右到左
    for (; j > y; j--) {
      res[i][j] = value++;
    }

    // 填充左列从下到上
    for (; i > x; i--) {
      res[i][j] = value++;
    }

    // 第一圈完毕, 开始第二圈, 此时起始点坐标为(1,1)
    x++;
    y++;
    // 边长度遍历次数-2, 即offset +2
    offset += 2;
  }

  // 当n为奇数时,循环完成后直接赋值最大值
  if (n % 2 !== 0) {
    res[midIndex][midIndex] = value;
  }

  return res;
};

console.log(generateMatrix(3));

const gM = (n) => {
  const res = Array.from({ length: n }).map(() => new Array(n));
  // 定义遍历起始点 t, r, b, l
  let l = 0
  let r = n - 1
  let t = 0
  let b = n - 1
  let curr = 1
  let max = n * n
  
  while (curr <= max) {
    // t向: l => r
    for (let i = l; i <= r; i++) {
      res[t][i] = curr++
    }
    t++

    // r向: t->b
    for (let i = t; i <= b; i++) {
      res[i][r] = curr++
    }
    r--

    // b: r -> l
    for (let i = r; i >= l; i--) {
      res[b][i] = curr++
    }
    b--

    // l: b -> t
    for (let i = b; i >= t; i--) {
      res[i][l] = curr++
    }
    l++
  }

  return res
};


console.log(gM(5))