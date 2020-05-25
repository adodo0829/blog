/**
 * 数据结构: 数组 Array
 * 数组是一个有序列表集合, 按顺序存放各个元素
 */

// 1.创建数组
let arr = []
let arr2 = new Array()

// 2.数组属性
console.log(arr.length)
arr.length = 3 // 数组长度动态变化的

// 3.数组方法
arr.push(1)    // 尾插: arr[arr.length] = 1
arr.unshift(2) // 头插: 遍历,元素后移一位
arr.shift()    // 头删: 移除数组first位, 创建新arr, 重新赋值
arr.pop()      // 尾删: 移除数组last位, 创建新arr, 重新赋值
arr.splice(0, 0, 1) //startIndex deleteCount insertItem 任意位置操作
// 还有下列方法:
// concat 连接 2 个或更多数组，并返回结果
// every 对数组中的每个元素运行给定函数，如果该函数对每个元素都返回 true，则返回 true
// filter 对数组中的每个元素运行给定函数，返回该函数会返回 true 的元素组成的数组
// forEach 对数组中的每个元素运行给定函数。这个方法没有返回值
// join 将所有的数组元素连接成一个字符串
// indexOf 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1
// lastIndexOf 返回在数组中搜索到的与给定参数相等的元素的索引里最大的值
// map 对数组中的每个元素运行给定函数，返回每次函数调用的结果组成的数组
// reverse 颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成了现在
// 的第一个
// slice 传入索引值，将数组里对应索引范围内的元素作为新数组返回
// some 对数组中的每个元素运行给定函数，如果任一元素返回 true，则返回 true
// sort 按照字母顺序对数组排序，支持传入指定排序方法的函数作为参数
// toString 将数组作为字符串返回
// valueOf 和 toString 类似，将数组作为字符串返回

// es6+
// @@iterator 返回一个包含数组键值对的迭代器对象，可以通过同步调用得到数组元素的键值对
// copyWithin 复制数组中一系列元素到同一数组指定的起始位置
// entries 返回包含数组所有键值对的@@iterator
// includes 如果数组中存在某个元素则返回 true，否则返回 false。E2016 新增
// find 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素
// findIndex 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素在数组中的索引
// fill 用静态值填充数组
// from 根据已有数组创建一个新数组
// keys 返回包含数组所有索引的@@iterator
// of 根据传入的参数创建一个新数组
// values 返回包含数组中所有值的@@iterator