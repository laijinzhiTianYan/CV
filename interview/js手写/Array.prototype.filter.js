// array.filter(function(arr[key],key ,arr),thisValue)
Array.prototype.filter = function (fn, content) {
  if (typeof fn != 'function') {
    throw 'fn不是个函数'
  }
  let arr = this;
  let news = [];
  for (let keys in arr) {
    let item = fn.call(content, arr[keys], keys, arr);
    if (item) {
      news.push(arr[keys])
    }
  }
  return news;
}