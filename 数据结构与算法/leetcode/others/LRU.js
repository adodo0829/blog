// LRU: 最近 最少 使用
// 如果数据最近被访问过，那么将来被访问的几率也更高, 越常被使用的数据权重越高。当需要清理数据时，总是清理最不常使用的数据

// js MAP特性, Map 内的 key 有序储存, 每次新增都是往后排列
// map的迭代器方法keys().next() 返回的都是首位元素

// 首位: 访问次数最少
// 末尾: 只要使用了, 就往后移; 只要是新来的就往后放, 超出max就把第一位删掉

class LRU {
  constructor(max = 2) {
    this.cache = new Map();
    this.max = max;
  }

  /**
   * 存值, 将最少使用的放到首位
   */
  set(k) {
    if (this.length() >= this.max) {
      let tempK = this.cache.keys().next().value;
      this.cache.delete(tempK);
      this.cache.set(k, k);
    }

    this.cache.set(k, k);
  }

  /**
   * 取值, 将最近使用的值放到最后,删除后
   */
  getValue(k) {
    if (this.hasKey(k)) {
      this.cache.delete(k);
      this.cache.set(k, k);
      return this.cache.get(k);
    }

    return null;
  }

  hasKey(k) {
    return this.cache.has(k);
  }

  length() {
    return this.cache.size;
  }
}

let l = new LRU(2);

l.set(1);
l.set(2);
l.set(3);
console.log("111", l);
// l.getValue(2);
l.getValue(2);
l.set(4);
console.log(l);
