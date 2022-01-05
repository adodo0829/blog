/**
 * 集合
 * 特性:
 * 无序且内部元素不重复的
 */

class MySet {
  constructor() {
    this.items = {};
  }

  add(ele) {
    if (this.has(ele)) return false;

    this.items[ele] = ele;
    return true;
  }
  delete(ele) {
    if (!this.has(ele)) return false;

    delete this.items[ele];
    return true;
  }
  has(ele) {
    // in运算符可以遍历属性 原型链上继承 + 自己的
    // hasOwnProperty只判断 特定的自身属性
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }
  clear() {
    this.items = {};
  }
  size() {
    return Object.keys(this.items).length;
  }
  values() {
    return Object.values(this.items);
  }
  /**
   * 集合运算
   * 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
   * 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合
   * 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
   * 子集：验证一个给定集合是否是另一集合的子集
   */

  // 并集
  union(otherSet) {
    const resultRet = new MySet();
    this.values.forEach((item) => resultRet.add(item));
    otherSet.values.forEach((item) => resultRet.add(item));
    return resultRet
  }

  // 交集
  intersection(otherSet) {
    const resultSet = new MySet()
    const items = this.values()
    // 优化, 遍历更小的set
    for (let i = 0; i < items.length; i++) {
      const item = array[i];
      if (otherSet.has(item)) {
        resultSet.add(item)
      }
    }
    return resultSet
  }

  // 差集
  diff(otherSet) {
    const resultSet = new MySet()
    this.values().forEach(item => {
      if (!otherSet.has(item)) {
        resultSet.add(item)
      }
    })
    return resultSet
  }

  // 子集
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) return false;
    let isSubSet = true
    let items = this.values()

    for (let i = 0; i < items.length; i++) {
      if (!otherSet.has(item)) {
        isSubSet = false
        break
      }
    }
    return isSubSet
  }
}

// ES6 Set
const set = new Set()
set.add(111)
let a = {a: 1}
set.add(a)
set.add({a: 1})
console.log(set.values())