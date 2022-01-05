const genPrefixList = (s) => {
  const prefix = []
  let pos = -1 // (子串0-i) 对应的相等前后缀个数, 基数是-1

  prefix.push(pos) // 位置1

  for (let i = 1; i < s.length; i++) {
    // 当后面不存在相等子串时, pos减少; 前提是已经至少有相等子串了
    // i 和 pos + 1 比较
    while (pos >= 0 && s[i] !== s[pos + 1]) {
      pos = prefix[pos]
    }

    if (s[i] === s[pos + 1]) {
      // 两字符相同, 存在相同前后缀
      pos++
    }

    // s.substr(0, i) 到位置i子串对应的相等前后缀个数
    prefix[i] = pos
  }

  return prefix
}

let a = 'aabaaf'
console.log(genPrefixList(a))