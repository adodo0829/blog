// js: 动态语言
// 变量不用事先定义数据类型, 可变性高, 过于灵活, 类型可变

let hasValue = 'man'
hasValue = 1
hasValue = [1, 2, 3]
// 我们并不关注hasValue这个是什么类型, 有值就行

// 面向对象编程
/**
 * 1.封装
 * 目的: 隐藏信息，包括封装数据、实现、类型和变化
 * 怎么做: 
 *      数据封装: js的变量作用域来模拟公共和私有属性
 *      行为封装: 对象暴露出API的方式
 * 
 */

const Model = (function () {
  // 私有数据
  const name = 'apple'

  return {
    getName: () => name // 对外通过API暴露
  }
})()

console.log(Model.getName())

/**
 * 2.多态
 * 目的: 把“做什么”和“谁去做”分离开; 去除条件分支; 消除类型间的耦合关系
 * 怎么做: 分离去耦合
 *        
 */