//100毫秒调度器
function scheduler(fn, ...args) {
  let timer = null;
  this.start = () => {
    timer = setInterval(() => {
      fn(...args)
    }, 100)
  }
  this.stop = () => {
    clearInterval(timer);
  }
}
function test(a, b) {
  console.log((new Date()).getTime(), "", a + b);
}
let scheduler_test = new scheduler(test, 1, 2);
scheduler_test.start();
setTimeout(() => {
  scheduler_test.stop()
}, 1000);