- for...in 语句用于遍历数组或者对象的属性（对数组或者对象的属性进行循环操作）。
  for in得到对象的key或数组,字符串的下标
  ```
  var obj = {a:1, b:2, c:3};
      
  for (var prop in obj) {
    console.log("obj." + prop + " = " + obj[prop]);
  }

  // 输出:
  // "obj.a = 1"
  // "obj.b = 2"
  // "obj.c = 3"
  ```
- for of和forEach一样,是直接得到值
  - 循环一个数组(Array)
  - 循环一个字符串
  - for of不能对象用
  - 循环一个类型化的数组(TypedArray)：
let iterable = new Uint8Array([0x00, 0xff]);

for (let value of iterable) {
  console.log(value);
}
// 0
// 255

循环一个Map:
let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);

for (let [key, value] of iterable) {
  console.log(value);
}
// 1
// 2
// 3

for (let entry of iterable) {
  console.log(entry);
}
// [a, 1]
// [b, 2]
// [c, 3]

循环一个 Set:
let iterable = new Set([1, 1, 2, 2, 3, 3]);

for (let value of iterable) {
  console.log(value);
}
// 1
// 2
// 3

循环一个 DOM collection:

// Note: This will only work in platforms that have
// implemented NodeList.prototype[Symbol.iterator]
let articleParagraphs = document.querySelectorAll("article > p");

for (let paragraph of articleParagraphs) {
  paragraph.classList.add("read");
}

循环一个拥有enumerable属性的对象
**for–of循环并不能直接使用在普通的对象上**，但如果我们按对象所拥有的属性进行循环，可使用内置的Object.keys()方法：

for (var key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}

循环一个生成器(generators)

function* fibonacci() { // a generator function
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  console.log(n);
  // truncate the sequence at 1000
  if (n >= 1000) {
    break;
  }
}
