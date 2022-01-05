/**
给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。
为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -2^28 到 2^28 - 1 之间，最终结果不会超过 2^31 - 1 。
例如:
输入: A = [ 1, 2] B = [-2,-1] C = [-1, 2] D = [ 0, 2] 
输出: 2 
解释: 两个元组如下:
(0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
(1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
*/

// 找解的个数, 返回总数即可
// 四个独立的数组，只要找到A[i] + B[j] + C[k] + D[l] = 0就可以，不用考虑有重复的四个元素相加等于0的情况
// 两数之和的升级版, 分成两组来做
// map来存储A,B的和和出现次数
// 遍历C,D, 判断 target0 与 map中的差值是否在map里出现, 满足则个数+1
// 一个数的维度就遍历一层

var fourSumCount = (arr1, arr2, arr3, arr4) => {
  const map = new Map();
  let count = 0;
  const TOTAL = 0;

  // 存储A,B的和和出现次数
  for (let i = 0; i < arr1.length; i++) {
    const a1 = arr1[i];
    for (let j = 0; j < arr2.length; j++) {
      const a2 = arr2[j];
      const sum1 = a1 + a2;
      map.set(sum1, (map.get(sum1) || 0) + 1);
    }
  }

  for (let j = 0; j < arr3.length; j++) {
    const a3 = arr3[j];
    for (let k = 0; k < arr4.length; k++) {
      const a4 = arr4[k];
      const gap = TOTAL - a3 - a4;
      if (map.has(gap)) {
        const times = map.get(gap);
        count += times;
      }
    }
  }

  return count;
};
