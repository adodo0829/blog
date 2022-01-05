/**
 * js原生数据结构, 线性结构
 */

// 1.创建
let arr = [1, 2, 3, 4, 5, 6, 7];

// 2.元素访问和迭代

// 3.新增元素, 数组是一个可以修改的对象。如果添加元素，它就会动态增长
// 尾部插入: push
// 按索引赋值给尾部空位元素
arr[arr.length] = 8;
// 头部插入: unshift
// 移动所有元素, 腾出空位
Array.prototype.insertFirstPosition = function (value) {
  for (let i = this.length; i >= 0; i--) {
    this[i] = this[i - 1];
  }
  this[0] = value;
};

// 4.删除元素
// 头部删除: shift
// 尾部删除: pop

// 5.在任意位置添加或删除元素 splice

// ======= 二维和多维数组 =========
// day 1
let averageTemp = []
averageTemp[0] = [];
averageTemp[0][0] = 72;
averageTemp[0][1] = 75;
// day 2
averageTemp[1] = [];
averageTemp[1][0] = 81;
averageTemp[1][1] = 79;
// 迭代二维数组
function printMatrix(myMatrix) {
  for (let i = 0; i < myMatrix.length; i++) {
    for (let j = 0; j < myMatrix[i].length; j++) {
      console.log(myMatrix[i][j]);
    }
  }
}

console.table(averageTemp)

// ====== 迭代器方法 =======
for (const iterator of arr.keys()) {
  console.log(iterator)
}

// 类型数组: 用于存储单一类型的数据
// let myArray = new Float32Array()
