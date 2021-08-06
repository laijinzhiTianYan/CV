function randomSort1(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
}
// （2）随机从原数组抽取一个元素，加入到新数组
function randomSort2(arr) {
  let res = [];
  while (arr.length > 0) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    res.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  return res;
}
// （3）随机交换数组内的元素
function randomSort3(arr) {
  let index, randomIndex, len = arr.length;
  if (!Array.isArray(arr) || length <= 1) return;
  for (index = 0; index < len; index++) {
    randomIndex = Math.floor(Math.random() * (len - index)) + index;
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
  }
}
