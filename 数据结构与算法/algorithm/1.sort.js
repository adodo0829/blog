/**
 * 1.冒泡排序
 * 遍历数据结构中每一项, 并去比较相邻两项, 判断大小, 交换位置
 * o(n^2)
 */
let testArr = [8, 2, 3, 5, 4, 1, 7, 6]

function compareFn(a, b) {
  // a,b 互换规则
  return a < b ? 'less' : 'large'
}

function bubbleSort(arr, compare = compareFn) {
  const { length } = arr
  for (let i = 0; i < length; i++) {
    // 数组每一个元素需经过一轮比对过程
    for (let j = 0; j < length - 1; j++) {
      // 比较当前元素和下一个元素大小并排序
      if (compare(arr[j], arr[j + 1]) === 'large') {
        // 位置互换
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  console.log('bubble', arr)
  return arr
}
bubbleSort(testArr)

// 冒泡优化: 已排序的元素不需要在进行比较了
function bubbleSort1(arr, compare = compareFn) {
  const { length } = arr
  for (let i = 0; i < length; i++) {
    // 数组每一个元素arr[i]需经过一轮比对过程
    // 每一轮比对完成, 已经确定了其位置, 可以去掉和已排序元素的比较流程
    for (let j = 0; j < length - 1 - i; j++) {
      // 比较当前元素和下一个元素大小并排序
      if (compare(arr[j], arr[j + 1]) === 'less') {
        // 位置互换
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  console.log('bubble1:', arr)
  return arr
}
bubbleSort1(testArr)

/**
 * 2.选择排序
 * 思想: 遍历找到数据结构中的最小值并将其放置在第一位,
 * 接着找到第二小的值并将其放在第二位,以此类推, 当前值与剩余值比对
 * 这需要记录最小值的索引位置
 * o(n^2)
 */
function selectSort(arr, compare = compareFn) {
  const { length } = arr
  let minIndex

  for (let i = 0; i < length - 1; i++) {
    minIndex = i // 开始和第一个比
    for (let j = i; j < length; j++) {
      // 这里优化一下, j = i, 只需要去与剩下的比
      if (compare(arr[minIndex], arr[j]) === 'large') {
        minIndex = j
      }
    }
    // 一轮比对完, 找到最小的, 互换位置, 如果已是最小,就不用换了
    if (i !== minIndex) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  console.log('select:', arr)
  return arr
}
selectSort(testArr)

/**
 * 3.插入排序
 * 思想: 假设左侧项已经排序了, 取出右侧左端数字与左侧比较
 * 将该项插入到左侧项
 * 相对冒泡和选择, 好一点
 */
function insertSort(arr, compare = compareFn) {
  const { length } = arr
  let item

  for (let i = 1; i < length; i++) {
    item = arr[i]
    let j = i

    // 右侧当前item 与左侧元素比较, 谁大谁就占住这个位置
    while (j > 0 && compare(arr[j - 1], item) === 'large') {
      arr[j] = arr[j - 1]
      j--
    }
    // 经过上面我们找到了当前 item 该在的位置
    arr[j] = item
  }
  console.log('insert:', arr);
  return arr
}
insertSort(testArr)

/**
 * 4.归并排序
 * 将原始数组切分成较小的数组, 直到每个小数组只有一个位置;
 * 接着将小数组归并成较大的数组,直到最后只有一个排序完毕的大数组
 * 分治思想 + 递归
 * O(nlog(n))
 */
function mergeSort(arr) {
  const { length } = arr
  if (length === 1) return arr
  // 拆分
  let mid = Math.floor(length / 2)
  // 左侧小数组
  let leftArr = mergeSort(arr.slice(0, mid))
  // 右侧小数组
  let rightArr = mergeSort(arr.slice(mid))
  // 拆分完毕 -> 再将这些数组进行排序合并
  return merge(leftArr, rightArr)
}
function merge(left, right, compare = compareFn) {
  let tempArr = [] // 存放合并数组
  let i = 0          // 已排序left数组的指针
  let j = 0          // 已排序right数组的指针
  while (i < left.length && j < right.length) {
    // 比较两个指针所指向的元素,选择相对小/较大的元素放入到合并数组,并移动指针到下一位置
    // compare指定排序规则
    if (left[i] < right[j]) {
      tempArr.push(left[i++])
    } else {
      tempArr.push(right[j++])
    }
  }
  // 将另一序列剩下的所有元素直接复制到合并序列尾
  while (i < left.length) {
    tempArr.push(left[i++])
  }
  while (j < right.length) {
    tempArr.push(right[j++])
  }
  return tempArr
}

console.log('mergeSort:', mergeSort(testArr));

/**
 * 5.快速排序(也是分治法)
 * 1.从数列中挑出一个元素, 称为 “基准”（pivot）;
 * 2.所有小于"基准"的元素,都移到"基准"的左边;所有大于"基准"的元素,都移到"基准"的右边
 * 3.对"基准"左边和右边的两个子集,不断重复第一步和第二步,直到所有子集只剩下一个元素为止。
 */
export function quickSort(arr) {
  if (arr.length <= 1) return arr; // 终止条件

  let left = []
  let right = []
  // 这个基准值随意取  这里取中间元素, 一定程度决定排序的速度
  let pivotIndex = Math.round(arr.length / 2) // 中间值索引
  let pivotValue = arr.splice(pivotIndex, 1)[0] // 中间值

  // 遍历,进行分区
  for (let i = 0; i < arr.length; i++) {
    arr[i] < pivotValue ? left.push(arr[i]) : right.push(arr[i])
  }
  return [...quickSort(left), pivotValue, ...quickSort(right)]
}

console.log('quickSort:', quickSort(testArr));

// in-place实现
/**
 * 1.设置基准值 pivot
 * 2.创建两个指针（引用),左边一个指向数组第一个值,右边一个指向数组最后一个值
 *   移动左指针直到我们找到一个比主元大的值,接着,移动右指针直到找到一个比主元小的值,
 *   然后交换它们,重复这个过程,直到左指针超过了右指针, 这样便以 pivot 划分了左小右大两部分数组
 * 3.再对划分后的数组重复之前的两个步骤,直至数组已完全排序
 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function quickSort1(arr) {
  // 分区
  function partition(arr, left, right) {
    // 基准值选择中间
    let pIndex = Math.floor((left + right) / 2)
    let pivot = arr[pIndex]
    // 创建左右指针
    let l = left
    let r = right
    // 遍历数组进行划分, 终止条件是遍历结束, 左右重合
    while (l <= r) {
      // 左边进行逐项比较
      while (arr[l] < pivot) {
        l++
      }
      // 右边也是
      while (arr[r] > pivot) {
        r--
      }
      // 当左值比 pivot 大, 或者 右值比 pivot 小 就交换位置, 也就是上面俩循环终止
      // 此时 l <= r
      if (l <= r) {
        swap(arr, l, r)
        // 记录此时指针位置, 继续比较
        l++
        r--
      }
    }
    return l
  }

  // 对数组进行排序调用
  function sort(arr, left, right) {
    let tempIndex
    if (arr.length > 1) {
      // 首次划分
      tempIndex = partition(arr, left, right)
      // 再次划分
      if (left < tempIndex - 1) {
        sort(arr, left. tempIndex-1)
      }
      if (right > tempIndex) {
        sort(arr, tempIndex, right)
      }
    }
    return arr
  }

  // 入口
  return sort(arr, 0, arr.length - 1)
}

console.log('in-place: quickSort:', quickSort1(testArr));
