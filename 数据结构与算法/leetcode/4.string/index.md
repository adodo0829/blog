# string

string 和数组一样, 也是顺序表结构, 是连续存储的

也是通过索引下标来访问

常用切割 substr(0, i)

## 常用方法

- 双指针降低时间复杂度
  左右left 和 right: 一左一右 用于比较
  快慢slow 和 fast: 一前一后 用于元素替换

- 半区间
  length / 2 + 1

- 需要位置对换的, 一般转化为数组,处理
  Array.from(str)
  原地处理完arr后, join('')转化
