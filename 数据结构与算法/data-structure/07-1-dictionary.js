/**
 * 字典:
 * 集合Set以[值，值]的形式存储元素，
 * 字典则是以[键，值]的形式来存储元素。字典也称作映射、符号表或关联数组
 * 类似ES6中的 Map 结构
 */
const { defaultToString } = require("./utils");

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`; // 要保存原始的 key value
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.table = {};
    this.toStrFn = toStrFn; // 键: 字符串化
  }

  set(key, value) {
    // 入参检测
    if (key != null && value != null) {
      const tkey = this.toStrFn(key)
      this.table[tkey] = new ValuePair(key, value)
    }
    return false
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  get(key) {
    if (this.hasKey(key)) return this.table[this.toStrFn(key)].value
    return null
  }

  keys() {
    return this.keyValues.map(item => item.key)
  }
  values() {
    return this.keyValues.map(item => item.value)
  }
  keyValues() {
    return Object.values(this.table)
  }
  forEach(cb) {
    const kvArr = this.keyValues()
    for (let i = 0; i < kvArr.length; i++) {
      const res = cb(kvArr[i].key, kvArr[i].value)
      if (res === false) {
        break
      }
    }
  }
  clear() {
    this.table = {}
  }
  size() {
    return this.keyValues.length
  }
  isEmpty() {
    return this.size() === 0
  }
}

module.exports = {
  Dictionary
}