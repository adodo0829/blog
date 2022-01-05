/**
 * 线性, 顺序搜索
 * 迭代线性结构
 */

const str = 'ieqw31231eqw'

function lineSearch(str, s) {
  for (let i = 0; i < str.length; i++) {
    const ele = str[i];
    if (ele === s) {
      return i
    }
  }
  
  return -1
}

console.log(lineSearch(str, 'x'))
