/**
 * 排序算法: 按顺序组织数据
 */

const Res = {
  LESS_THAN: -1,
  EQUAL: 0,
  MORE_THAN: 1
}

const compareFn = (a, b) => {
  if (a === b) return Res.EQUAL
  return a < b ? Res.LESS_THAN : Res.MORE_THAN 
}

const swap = (arr, indexA, indexB) => {
  const temp = arr[indexA]
  arr[indexA] = arr[indexB]
  arr[indexB] = temp
}

const arr = [10,4,7,2,1,3,5,9,6,8]

module.exports = {
  compareFn,
  swap,
  arr,
  Res
}