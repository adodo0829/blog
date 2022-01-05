/**
 * recursion: 递归,方法或函数调用自身的方式称为递归调用，调用称为递，返回称为归.
 * 是一种解决问题的方法，它从解决问题的各个小部分开始，直到解决最初的大问题。递归通常涉及函数调用自身。
 * 特点:
 * 1.基线条件，即一个不再递归调用的条件（停止点），以防止无限递归。
 * 2.自身调用
 *
 * 所有的递归问题都可以用递推公式来表示
 * f(n) = f(n-1) + 1
 */

/**
 * 一个问题只要同时满足以下 3 个条件，就可以用递归来解决。
 * 1.问题的解可以分解为几个子问题的解。何为子问题 ？就是数据规模更小的问题。
 * 2.问题与子问题，除了数据规模不同，求解思路完全一样
 * 3.存在递归终止条件
 *
 * 递归常见问题
 * 警惕堆栈溢出：可以声明一个全局变量来控制递归的深度，从而避免堆栈溢出。
 * 警惕重复计算：通过某种数据结构来保存已经求解过的值，从而避免重复计算。
 */

/**
 * 1. 递归代码编写
 * 写递归代码的关键就是找到如何将大问题分解为小问题的规律，并且基于此写出递推公式，然后再推敲终止条件，最后将递推公式和终止条件翻译成代码。
 *
 * 2. 递归代码理解
 * 对于递归代码，若试图想清楚整个递和归的过程，实际上是进入了一个思维误区。
 * 那该如何理解递归代码呢 ？
 * 如果一个问题 A 可以分解为若干个子问题 B、C、D，你可以假设子问题 B、C、D 已经解决。
 * 而且，你只需要思考问题 A 与子问题 B、C、D 两层之间的关系即可，不需要一层层往下思考子问题与子子问题，子子问题与子子子问题之间的关系。
 * 屏蔽掉递归细节，这样子理解起来就简单多了。
 * 因此，理解递归代码，就把它抽象成一个递推公式，不用想一层层的调用关系，不要试图用人脑去分解递归的每个步骤。
 */
function fibo(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;

  return fibo(n - 1) + fibo(n - 2);
}

// console.log(fibo(20));

/**
 * 分治法
 * (1) 分解原问题为多个子问题（原问题的多个小实例）。
 * (2) 解决子问题，用返回解决子问题的方式的递归算法。递归算法的基本情形可以用来解决子问题。
 * (3) 组合这些子问题的解决方式，得到原问题的解。
 */

// demo, 二分搜索
//  分解：计算 mid 并搜索数组较小或较大的一半。
//  解决：在较小或较大的一半中搜索值。
//  合并：这步不需要，因为我们直接返回了索引值。
const { quickSort } = require("../sorting/5.quickSort");
const arr = [2, 1, 4, 5, 62, 13, 41, 6, 7, 8];


function binarySearch(array, v) {
  const sortedArr = quickSort(arr);
  let low = 0;
  let high = sortedArr.length - 1;
  return binarySearchResursive(sortedArr, v, low, high);
}

function binarySearchResursive(arr, v, low, high) {
  // 递归终止条件
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midValue = arr[mid];

    if (v < midValue) {
      return binarySearchResursive(arr, v, low, mid - 1);
    } else if (v > midValue) {
      return binarySearchResursive(arr, v, mid + 1, high);
    } else {
      return mid;
    }
  }
  return -1;
}

console.log(binarySearch(arr, 1));
