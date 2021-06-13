/* 1.Promise 状态和值
Promise 对象存在以下三种状态：
Pending(进行中)
Fulfilled(已成功)
Rejected(已失败)
状态只能由 Pending 变为 Fulfilled 或由 Pending 变为 Rejected ，且状态改变之后不会在发生变化，会一直保持这个状态。

Promise的值是指状态改变时传递给回调函数的值
handle函数包含 resolve 和 reject 两个参数，它们是两个函数，可以用于改变 Promise 的状态和传入 Promise 的值

resolve 和 reject:
resolve : 将Promise对象的状态从 Pending(进行中) 变为 Fulfilled(已成功)
reject : 将Promise对象的状态从 Pending(进行中) 变为 Rejected(已失败)
resolve 和 reject 都可以传入任意类型的值作为实参，表示 Promise 对象成功（Fulfilled）和失败（Rejected）的值

Promise 对象的 then 方法接受两个参数：promise.then(onFulfilled, onRejected)
onFulfilled 和 onRejected 都是可选参数。如果 onFulfilled 或 onRejected 不是函数，其必须被忽略
onFulfilled 特性:如果 onFulfilled 是函数,
当 promise 状态变为成功时必须被调用，其第一个参数为 promise 成功状态传入的值（ resolve 执行时传入的值）
在 promise 状态改变前其不可被调用
其调用次数不可超过一次
onRejected 特性:如果 onRejected 是函数,
当 promise 状态变为失败时必须被调用，其第一个参数为 promise 失败状态传入的值（ reject 执行时传入的值）
在 promise 状态改变前其不可被调用
其调用次数不可超过一次

then 方法必须返回一个新的 promise 对象:promise1.then(onFulfilled1, onRejected1).then(onFulfilled2, onRejected2);
*/

// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise {
  constructor(handler) {
    if (typeof handler !== "function") {
      throw new Error('MyPromise must accept a function as a parameter')
    }
    // 添加状态
    this._status = PENDING;
    this._value = undefined;
    //添加成功回调函数队列
    this._fulfilledQueues = [];
    //添加失败回调函数队列
    this._rejectedQueues = []
    //执行handler
    try {
      handler(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err)
    }
  }
  _resolve(val) {
    if (this._status !== PENDING) return;
    this._status = FULFILLED
    // 依次执行成功队列中的函数，并清空队列
    const runFulfilled = (value) => {
      let cb;
      while (cb = this._fulfilledQueues.shift()) {
        cb(value)
      }
    }
    // 依次执行失败队列中的函数，并清空队列
    const runRejected = (error) => {
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(error)
      }
    }
    /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
      当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
    */
    if (val instanceof MyPromise) {
      val.then(value => {
        this._value = value
        runFulfilled(value)
      }, err => {
        this._value = err
        runRejected(err)
      })
    } else {
      this._value = val
      runFulfilled(val)
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(() => run(), 0)
  }
  _reject(err) {
    if (this._status !== PENDING) return;
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }
  //添加then方法，返回一个新的promise对象，并且需要将回调函数加入到执行队列中
  then(onFulfilled, onRejected) {
    const { _value, _status } = this;
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      let fulfilled = value => {
        try {
          if (typeof onFulfilled !== "function") {
            onFulfilledNext(value);
          } else {
            let res = onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      // 封装一个失败时执行的函数
      let rejected = error => {
        try {
          if (typeof onRejected !== "function") {
            onRejectedNext(value);
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(onFulfilled);
          this._rejectedQueues.push(onRejected)
          break;
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          onFulfilled(_value);
          break;
        case REJECTED:
          onRejected(-_value);
      }
    })
  }
  // 添加catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  // 添加静态resolve方法
  static resolve(value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
  // 添加静态reject方法
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value))
  }
  // 添加静态all方法
  static all(list) {
    return new MyPromise((resolve, reject) => {
      let values = [];
      let count = 0;
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res;
          count++;
          if (count === list.length) resolve(values)
        }, err => {
          reject(err)
        })
      }
    })
  }
  //添加静态race方法
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
  finally(cb) {
    return this.then(
      value => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    )
  }
}

// 简易版

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function myPromise(fn) {
  const that = this;
  that.value = null;
  that.status = PENDING; //默认状态
  that.fulfilledCallbacks = [];
  that.rejectedCallbacks = [];
  function resolve(value) {
    if (that.status === PENDING) {
      that.status = FULFILLED;
      that.value = value;
      //执行回调方法
      that.fulfilledCallbacks.forEach(myFn => myFn(that.value))
    }
  }
  function reject(value) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.value = value;
      //执行回调方法
      that.rejectedCallbacks.forEach(myFn => myFn(that.value))
    }
  }

  // 执行回调函数
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e);
  }
}
myPromise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  //等待状态，则添加回调函数到栈中
  if (self.status === PENDING) {
    self.fulfilledCallbacks.push(() => {
      onFulfilled(self.value);
    });
    self.rejectedCallbacks.push(() => {
      onRejected(self.value);
    })
  }
  if (self.status === FULFILLED) {
    onFulfilled(self.value);
  }

  if (self.status === REJECTED) {
    onRejected(self.value)
  }
}