/**
 * 学习过程中的工具函数
 */

// 1.判断是否是对象
function isObject(val) {
  return val === Object(val)
} 
// 2.判断对象是否为空
function isEmptyObject(obj) {
  return !Object.keys(obj).length
}