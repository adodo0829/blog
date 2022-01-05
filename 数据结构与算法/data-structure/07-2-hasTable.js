/**
 * 散列表
 * 散列算法的作用是尽可能快地在数据结构中找到一个值,
 * 散列函数的作用是给定一个键值，然后返回值在ASSII表中的地址
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

class HashTable {
  constructor(toStrFn = defaultToString) {
    this.table = {};
    this.toStrFn = toStrFn;
  }

  // 返回一个特殊键, 组成 key 的每个字符的 ASCII 码值的和得到一个数
  loseloseHashCode(key) {
    if (typeof key === "number") {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  // 新增和更新值
  put(key, value) {
    if (key == null || value == null) return false;

    const hashKey = this.hashCode(key);
    this.table[hashKey] = new ValuePair(key, value);
    return true;
  }
  
  remove(key) {
    const hashKey = this.hashCode(key)
    const valuePair = this.table[hashKey]
    if (valuePair != null) {
      delete this.table[hashKey]
      return true
    }
    return false
  }
  
  get(key) {
    const value = this.table[this.hashCode(key)];
    return value == null ? null : value.value;
  }
}

const hashtable = new HashTable()

hashtable.put('hello', {'b': 111})
hashtable.put('world', {'a': 222})

console.log(hashtable)
console.log(hashtable.get('hello'))
// 数字索引
// '14': ValuePair { key: 'hello', value: [Object] },
// '34': ValuePair { key: 'world', value: [Object] }