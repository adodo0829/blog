/**
 * 实现事件监听
 */

const EVENT = {};

Function.prototype.on = function (eventName, cb) {
  EVENT[eventName] = cb;
};

Function.prototype.trigger = function (eventName) {
  EVENT[eventName]();
};

function f1() {
  setTimeout(() => {
    console.log("f1 start");
    // 触发事件
    f1.trigger('done')
  }, 1000);
}

function f2() {
  console.log("f2");
}

f1.on("done", f2);
f1()
