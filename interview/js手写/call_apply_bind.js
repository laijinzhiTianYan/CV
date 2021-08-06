// call()
Function.prototype.call = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new Error('type error');
  }
  // 获取参数
  let args = [...arguments].slice(1);
  let result = null;
  // 判断context是否传入，如果未传入则设置为window
  context = context || window;
  // 将调用函数设置为对象的方法,this代表函数
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
}

// apply()
Function.prototype.apply = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new Error('type error');
  }
  let result = null;
  // 判断context是否传入，如果未传入则设置为window
  context = context || window;
  // 将调用函数设置为对象的方法
  context.fn = this;
  // 调用函数
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
}

// bind()
Function.prototype.bind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new Error('type error');
  }
  // 获取参数
  let args = [...arguments].slice(1);
  let fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(this instanceof Fn ? this : (context || window), args.concat(...arguments));
  }
}