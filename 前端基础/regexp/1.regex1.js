/**
 * 正则: 匹配模式, 要么匹配字符，要么匹配位置
 */

// 模糊匹配

let str = 'd2313 213-322  331a'
let reg = /[a-zA-Z-\s+]/g
let reg1 = /^[A-Za-z]{1}|@|-|——/g

let formatStr = str.replace(reg, '')
console.log(formatStr)
