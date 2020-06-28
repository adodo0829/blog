/**
 * 观察者模式的简易实现
 * 观察者对象:   需要在被观察者状态变化时触发更新逻辑
 * 被观察者对象: 需要收集所有的对自己进行观测的观察者对象
 */

// 被观察者
// 对于一个被观察的人来说: 我要知道是哪些人在观察我, 我的状态怎么样
class Sub {
  constructor(name) {
    this.name = name;
    this.state = "pending";
    this.observer = []; // 存放所有观察者的集合
  }

  // 添加观察者
  add(ob) {
    this.observer.push(ob);
  }
  // 更改状态
  setState(newState) {
    this.state = newState;
    // 状态改了不得告诉所有观察者啊, 其实就是执行观察者对象的更新函数
    this.notify();
  }
  // 通知
  notify() {
    this.observer.forEach((ob) => ob && ob.update(this));
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }

  update(sub) {
    console.log(
      `观察者${this.name} 已收到被观察者${sub.name}状态改变了: ${sub.state}`
    );
  }
}

let sub = new Sub('学生小麦')

let ob1 = new Observer('语文老师')
let ob2 = new Observer('数学老师')
let ob3 = new Observer('英语老师')

// 与发布订阅不同的是, 这里被观察者需要添加所有的观察者对象, 以便在自己状态改变时去执行观察者的更新逻辑
// 二者有关联关系, 我要知道我被谁观察

// 发布订阅中, 发布者和订阅者之间没有关联关系, 通过事件中心来管理
// 订阅不需要知道谁去发布
sub.add(ob1)
sub.add(ob2)
sub.add(ob3)

sub.setState('fulfilled')
// 观察者语文老师 已收到被观察者学生小麦状态改变了: fulfilled
// 观察者数学老师 已收到被观察者学生小麦状态改变了: fulfilled
// 观察者英语老师 已收到被观察者学生小麦状态改变了: fulfilled

sub.setState('rejected')
// 观察者语文老师 已收到被观察者学生小麦状态改变了: rejected
// 观察者数学老师 已收到被观察者学生小麦状态改变了: rejected
// 观察者英语老师 已收到被观察者学生小麦状态改变了: rejected