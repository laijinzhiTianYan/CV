// instance
function myInstanceOf(left, right) {
  let prototype = right.prototype;
  left = left.proto;
  while (true) {
    if (!left) {
      return false;
    }
    if (left === prototype) {
      return true;
    }
    left = left.proto;
  }
}
//JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个
class Scheduler {
  constructor() {
    this.queue = [];
    this.another = [];
  }
  // promiseCreator是一个异步函数，返回promise
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      promiseCreator.resolve = resolve;
      if (this.queue.length < 2) {
        this.run(promiseCreator);
      }
      else {
        this.another.push(promiseCreator);
      }
    })
  }

  run(promiseCreator) {
    this.queue.push(promiseCreator);
    promiseCreator().then(() => {
      /**
       * 给promiseCreator绑定add中的resolve，就可以实现执行顺序的问题，
       * 首先执行promiseCreator，这个时候会根据不同的时间返回promise对象，
       * 然后执行then的回调，这个时候执行add中的函数，为的是返回add的promise，
       * 这样add返回的promise对象就可以调用then方法去做回调函数里面的事情。
       * 由于run函数自身的递归保证了永远会有两个任务在并发执行，
       * 所以这个时候哪个promiseCreator先执行完，就会被删掉加进下一个promiseCreator
       */
      promiseCreator.resolve();
      this.remove(promiseCreator);
      if (this.another.length > 0) {
        /**
         * 这里实现并发执行，在执行第一个promiseCreator的时候，
         * 会自动执行run函数，并且后面执行的每一个promiseCreatoe都会如此，
         * 保证了永远是有两个任务在并发执行，每跑完一个就加一个进去直到another为空
         */
        this.run(this.another.shift())
      }
    })
  }
  remove(promiseCreator) {
    let index = this.queue.findIndex(promiseCreator);
    this.queue.splice(index, 1);
  }
}
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})
const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4

// 手写一个new操作符
function _new(func) {
  var newObj = Object.create(func.prototype);
  var returnObj = func.apply(newObj, Array.prototype.slice.call(arguments, 1));
  if ((typeof returnObj === "object" || typeof returnObj === "function")) {
    return returnObj;
  }
  return newObj;
}
function New(func) {
  var res = {};
  if (func.prototype !== null) {
    res.__proto__ = func.prototype;
  }
  var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
  if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
    return ret;
  }
  return res;
}