/**
 * 给定一个匹配字符串是 s1 , 和一个查找字符串 s2
 * 在是 s1 中找出 s2出现的第一个位置 (从0开始)。
 * 如果不存在，则返回 -1
 */
// 其实就是实现 String.prototype.indexOf

function isString(str) {
  return typeof str === 'string'
}

function strStr(originString, str) {
  if (!isString(originString) && !isString(str)) {
    throw new Error('arguments must be string type')
  }
  // 需要对入参分情况处理: 只有 str 的长度小于 原字符串的长度才进行检索

  // 大于
  if (str.length > originString.length) return -1;
  // 长度为0
  if (str.length === 0) return 0
  // 相等
  if (str.length === originString.length) {
    return str === originString ? 0 : -1
  }
  // 小于: 怎么去查找位置, 一个个字符比对?
  // 每次取一个长度的 string 与 str 比较
  let temp
  for (let i = 0; i < originString.length - str.length; i++) {
    temp = originString.substr(i, str.length + i)

    // 这里还可以内部优化下, i 进位后可以先比较 i位的字符 与 str的首位是否一致
    if (originString[i] === str[0]) {
      if (temp === str) {
        return i
      }
    } else {
      // 不一致, 往后推
      continue
    }
  }
  return -1
}

let os = 'wdasdadwqeqwedas'
let s = 'wedsda'

console.log(strStr(os, s))