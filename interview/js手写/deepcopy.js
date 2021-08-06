// 最简单的深拷贝
function deepcopy(object) {
  if (!object || typeof object !== "object") return object;
  let newObject = Array.isArray(object) ? [] : {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = deepcopy(object[key]);
    }
  }
  return newObject;
}
// 稍微复杂的深拷贝
function deepClone(object, stack = new WeakMap()) {
  if (!object && typeof object !== 'object') {
    return object; //函数也直接返回
  }
  let res = Array.isArray(object) ? [] : {}
  //处理循环引用
  if (stack.has(object)) {
    return stack.get(object);
  }
  stack.set(object, res);
  // 这里没有处理key是Symbol的情况
  // for in 不会枚举Symbol的key
  // 可以通过Object.getOwnPropertySymbols获取所有Symbol的key
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      res[key] = deepClone(object[key], stack);
    }
  }
  return res;
}