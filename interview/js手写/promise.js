class MyPromise {
  constructor(executor) {
    this.status = 'pending'; // 默认的状态，进行中
    this.value = null; // 成功后返回的值
    this.reason = null; //失败的原因
    this.onFulfilledCallbacks = []; // 存放成功的回调
    this.onRejectedCallbacks = []; // 存放失败的回调

    function resolve(value) {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(item => {
          item(this.value);
        });
      }
    }

    function reject(reason) {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(item => {
          item(this.reason);
        })
      }
    }

    // 将两个方法传入函数执行
    try {
      executor(resolve, reject);
    } catch (e) {
      // 遇到错误时，捕获错误，执行reject函数
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
      // 如果要进行一个链式的then，需要返回一个promise.
      return new MyPromise((resolve, reject) => {
        try {
          let f = onFulfilled(this.value);
          if (f instanceof MyPromise) {
            f.then(resolve, reject);
          } else {
            resolve(f);
          }
        } catch (err) {
          reject(err);
        }
      });
    }
    if (this.status === 'rejected') {
      // 如果要进行一个链式的then，需要返回一个promise.
      return new MyPromise((resolve, reject) => {
        try {
          let j = onRejected(this.reason);
          if (j instanceof MyPromise) {
            j.then(resolve, reject);
          } else {
            resolve(j)
          }
        } catch (err) {
          reject(err)
        }
      });
    }
    if (this.status === 'pending') {
      // 如果要进行一个链式的then，需要返回一个promise.
      return new MyPromise((resolve, reject) => {
        this.onFulfilledCallbacks.push(() => {
          let f = onFulfilled(this.value);
          if (f instanceof MyPromise) {
            f.then(resolve, reject);
          } else {
            resolve(f);
          }
        });
        this.onRejectedCallbacks.push(() => {
          let j = onRejected(self.reason)
          if (j instanceof Promise) {
            j.then(resolve, reject)
          } else {
            resolve(j)
          }
        });
      });
    }
  }

  catch(onRejected) {
    if (this.status === 'rejected') {
      typeof onRejected === 'function' && onRejected(this.reason);
    }
    if (this.status === 'pending') {
      typeof onRejected === 'function' && this.onRejectedCallbacks.push(onRejected);
    }
  }

  static all(promises) {
    if (!Array.isArray(promises)) {
      throw new Error('promises must be an array');
    }
    return new MyPromise((resolve, reject) => {
      let len = promises.length;
      let result = [];
      for (let i = 0; i < len; i++) {
        Promise.resolve(promises[i]).then((value) => {
          result[i] = value;
          if (i === len - 1) {
            resolve(result);
          }
        }, (reason) => {
          reject(reason);
        })
      }
    })
  }

  static race(promises) {
    if (!Array.isArray(promises)) {
      throw new Error('promises must be an Array');
    }
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(value => {
          return resolve(value);
        }, reason => {
          return reject(reason);
        })
      })
    })
  }
}

// 简单版
// class Promise {
//   constructor(executor) {
//     this.state = 'pending';   //默认的状态，进行中
//     this.value = null;    //成功后携带的值
//     this.reason = null;    //失败后携带的原因
//     this.onFulfilledCallbacks = []
//     this.onRejectedCallbacks = []

//     function resolve(value) {
//       if (this.state === 'pending') {
//         this.state = 'fulfilled';
//         this.value = value;
//         this.onFulfilledCallbacks.forEach(item => item(this.value))
//       }
//     };

//     function reject(reason) {
//       if (this.state === 'pending') {
//         this.state = 'rejected';
//         this.reason = reason;
//         this.onRejectedCallbacks.forEach(item => item(this.reason))
//       }
//     };

//     try {
//       executor(resolve, reject);  //构造
//     } catch (err) {
//       reject(err);
//     }
//   }
//   //then函数根据state来进行后续的回调函数操作
//   then(onFulfilled, onRejected) {
//     if (this.state === 'fulfilled') {
//       return new Promise((resolve, reject) => {
//         typeof onFulfilled === 'function' && onFulfilled(this.value)
//       })
//     };
//     if (this.state === 'rejected') {
//       return new Promise((resolve, reject) => {
//         typeof onRejected === 'function' && onRejected(this.reason)
//       })
//     };
//     if (this.state === 'pending') {
//       return new Promise((resolve, reject) => {
//         typeof onFulfilled === 'function' && this.onFulfilledCallbacks.push(onFulfilled)
//         typeof onRejected === 'function' && this.onRejectedCallbacks.push(onRejected)
//       })
//     }
//   }