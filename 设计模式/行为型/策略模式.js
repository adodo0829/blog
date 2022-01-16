// 策略模式

/**
 * 策略模式指的是定义一系列的算法，把它们一个个封装起来, 并且使它们可以互相替换。
 * 将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来.
 *
 * 可以理解为定义一系列的算法，把它们各自封装成策略类，算法被封装在策略类内部的方法里。
 * 在客户对Context发起请求的时候，Context总是把请求委托给这些策略对象中间的某一个进行计算
 *
 * // 策略类 各种策略分类算法
 * // 需求类 Context 委托策略类内部方法来执行
 */

// demo
// <form id = "registerForm" method="post" action="http://xxxx.com/api/register">
//     用户名：<input type="text" name="userName">
//     密码：<input type="text" name="password">
//     手机号码：<input type="text" name="phoneNumber">
//     <button type="submit">提交</button>
// </form>

// 策略对象
const strategies = {
  isNoEmpty: function (value, errorMsg) {
    if (value === "") {
      return errorMsg;
    }
  },
  isNoSpace: function (value, errorMsg) {
    if (value.trim() === "") {
      return errorMsg;
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.trim().length < length) {
      return errorMsg;
    }
  },
  maxLength: function (value, length, errorMsg) {
    if (value.length > length) {
      return errorMsg;
    }
  },
  isMobile: function (value, errorMsg) {
    if (
      !/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[7]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
        value
      )
    ) {
      return errorMsg;
    }
  },
};

// 验证类
class Validator {
  constructor() {
    this.cache = [];
  }
  add(dom, rules) {
    for (let i = 0, rule; (rule = rules[i++]); ) {
      let strategyAry = rule.strategy.split(":");
      let errorMsg = rule.errorMsg;
      this.cache.push(() => {
        let strategy = strategyAry.shift();
        strategyAry.unshift(dom.value);
        strategyAry.push(errorMsg);
        return strategies[strategy].apply(dom, strategyAry);
      });
    }
  }
  start() {
    for (let i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
      let errorMsg = validatorFunc();
      if (errorMsg) {
        return errorMsg;
      }
    }
  }
}

// 调用代码
let registerForm = document.getElementById("registerForm");

let validataFunc = function () {
  let validator = new Validator();
  validator.add(registerForm.userName, [
    {
      strategy: "isNoEmpty",
      errorMsg: "用户名不可为空",
    },
    {
      strategy: "isNoSpace",
      errorMsg: "不允许以空白字符命名",
    },
    {
      strategy: "minLength:2",
      errorMsg: "用户名长度不能小于2位",
    },
  ]);
  validator.add(registerForm.password, [
    {
      strategy: "minLength:6",
      errorMsg: "密码长度不能小于6位",
    },
  ]);
  validator.add(registerForm.phoneNumber, [
    {
      strategy: "isMobile",
      errorMsg: "请输入正确的手机号码格式",
    },
  ]);
  return validator.start();
};

registerForm.onsubmit = function () {
  let errorMsg = validataFunc();
  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
};

// 使用场景
// 如果在一个系统里面有许多类，它们之间的区别仅在于它们的'行为'，那么使用策略模式可以动态地让一个对象在许多行为中选择一种行为。
// 一个系统需要动态地在几种算法中选择一种。
// 表单验证

// 优点
// 利用组合、委托、多态等技术和思想，可以有效的避免多重条件选择语句
// 提供了对开放-封闭原则的完美支持，将算法封装在独立的strategy中，使得它们易于切换，理解，易于扩展
// 利用组合和委托来让Context拥有执行算法的能力，这也是继承的一种更轻便的代替方案

// 缺点
// 会在程序中增加许多策略类或者策略对象
// 要使用策略模式，必须了解所有的strategy，必须了解各个strategy之间的不同点，这样才能选择一个合适的strategy
