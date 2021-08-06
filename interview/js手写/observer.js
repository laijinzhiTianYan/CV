class Subject {
  constructor(name) {
    this.name = name;
    // 观察者列表
    this.observers = [];
  }
  //添加
  add(observer) {
    this.observers.push(observer);
  }
  // 删除
  remove(observer) {
    let idx = this.observers.findIndex(item => item === observer);
    idx > -1 && this.observers.splice(idx, 1);
    // 或者直接用filter
    // this.observers.filter(item=>item!==observer)
  }
  // 通知
  notify() {
    for (let observer of this.observers) {
      observer.update();
    }
  }
}
class Observer {
  constructor() {
    this.name = name;
  }
  update() {
    console.log(`被观察者通知我更新了，我是：${this.name}`);
  }
}
// 实例化被观察者
let subject = new Subjet();
// 实例化俩个观察者
let obs1 = new Observer('observer1');
let obs2 = new Observer('observer2');
subject.add(obs1);
subject.add(obs2);
// 被观察者通知观察者更新
subject.notify()