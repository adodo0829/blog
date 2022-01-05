/**
 * 给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
 */

// 原地操作数组, 需要操作数据元素的位置
// 怎么操作: 交换位置 =》 如果逐一交换位置, 貌似没有规律可循....

/**
 * 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],
  ==》 先对角线交换(可以理解成90度反转)
[
  [1,4,7],
  [2,5,8], 
  [3,6,9]
],
  ==》然后将每一行倒序排列
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
 */

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const rotateMatrix = (m) => {
  const n = m.length;
  const lastIndex = n - 1;

  for (let i = 0; i < n; i++) {
    // i, j 分别对应横纵轴索引, (0,0) 到 (n-1,n-1)
    // 对角线反转
    for (let j = 0; j < i; j++) {
      swap(m, [i, j], [j, i]);
    }
  }

  // 每行反转
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      // 固定值, 中线左右反转 n / 2
      swap(m, [i, j], [i, lastIndex - j]);
    }
  }

  function swap(m, [x, y], [x1, y1]) {
    let temp = m[x][y];
    m[x][y] = m[x1][y1];
    m[x1][y1] = temp;
  }

  console.log(m)
};


rotateMatrix(matrix)