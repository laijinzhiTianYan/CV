class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    let callbacks = this.events[event] || [];
    callbacks.push(callback);
    this.events[event] = callbacks;
    return this;
  } a
  off(event, callback) {
    let callbacks = this.events[event];
    // 如果callback不存在，this.events[event]=[];注册事件全部清除
    this.events[event] = callbacks && callbacks.filter(fn => {
      return fn !== callback;
    })
    return this;
  }
  emit(event, ...args) {
    let callbacks = this.events[event];
    callbacks.forEach(fn => {
      fn(...args);
    });
    return this;
  }
  once(event, callback) {
    let wrapFun = (...args) => {
      callback(...args);
      this.off(event, wrapFun);
    };
    this.on(event, wrapFun);
    return this;
  }
}


let s1 = new EventEmitter();
function f(x) {
  console.log(x);
}
s1.on('event1', f);
s1.on('event1', (x) => {
  console.log('怎么办' + x);
})
s1.emit('event1', 'ttttt');
s1.off('event1', f);
s1.emit('event1', 'ooooo');