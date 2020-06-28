/**
 * 发布订阅方式
 * 维护一个事件中心进行通信
 */

const event = {
  // 事件中心
  eventList: [],

  // 订阅事件, 添加一个回调逻辑
  on(type, fn) {
    if (!this.eventList[type]) {
      this.eventList[type] = [];
    }
    this.eventList[type].push(fn);
  },

  // 发布事件, 遍历事件列表，去执行所有事件
  emit(type, ...args) {
    const cbList = this.eventList[type];
    if (!cbList || cbList.length === 0) return;

    cbList.forEach((cb) => {
      cb.apply(event, args);
    });
  },
};

let data = {};

// 我们可以订阅多个事件, 并且相比回调, 订阅结合发布完全接耦了, 两者并有关联性
event.on("change", (data) => {
  // 订阅者1的逻辑
  console.log("订阅者1: data obj change", data);
});

event.on("change", (data) => {
  // 订阅者2的逻辑
  if (Object.keys(data).length === 2) {
    console.log('订阅者2: data数据有两个了', data)
  }
});


// 发布事件: 我们可以等待数据状态发生变化或者 异步执行完去发布
setTimeout(() => {
  data.name = 'huhua'
  // 发布者, 我想在哪发就在哪发
  event.emit('change', data)
}, 1000);

setTimeout(() => {
  data.age = '26'
  event.emit('change', data)
}, 2000);