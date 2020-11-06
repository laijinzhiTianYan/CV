- 数组方法
// 1. 改变原数组
arr.push();
arr.pop();
arr.unshift();
arr.shift();
arr.reverse();
arr.slice();
arr.sort();
arr.fill();//用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
arr.copyWithin();//用于从数组的指定位置拷贝元素到数组的另一个指定位置中
  - arr.copyWithin(target, start, end)
// target : 必选，复制到指定位置的索引值
// start : 可选，元素复制的起始索引，缺失则从 0 开始
// end : 可选，元素复制的结束索引，默认值是 arr.length，可取负值，表示倒数
// 用法
var arr = [1, 2, 3, 4, 5, 6, 7]
console.log(arr.copyWithin(3)) // (7)[1, 2, 3, 1, 2, 3, 4]
console.log(arr.copyWithin(3, 1)) // (7)[1, 2, 3, 2, 3, 1, 2]
console.log(arr.copyWithin(3, 2, 5)) // (7)[1, 2, 3, 3, 2, 3, 2]
console.log(arr.copyWithin(3, 4, 8)) // (7)[1, 2, 3, 2, 3, 2, 2]
console.log(arr.copyWithin(3, 4, -2)) // (7)[1, 2, 3, 3, 3, 2, 2]
 
// 2. 不改变原数组
arr.concat();
arr.toString();
arr.slice();
arr.join();
arr.split();
arr.forEach();
arr.map();
arr.filter();
arr.some();
arr.every();
arr.concat();
arr.entries();// 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
arr.findIndex();方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1.
arr.find(); // 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
arr.includes();// 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
arr.indexOf()/lastIndexOf();
arr.flat(); //方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。参数表示深度。

- 遍历数组的方法：
    ```
    const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }];
    // 遍历数组的方法有太多，本文只枚举常用的几种
    // for 循环
    for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    }
    // for...of
    for (let value of arr) {
    console.log(value);
    }
    // for...in
    for (let i in arr) {
    console.log(arr[i]);
    }
    // forEach 循环
    arr.forEach(value => {
    console.log(value);
    });
    // entries（）
    for (let [index, value] of arr.entries()) {
    console.log(value);
    }
    // keys()
    for (let index of arr.keys()) {
    console.log(arr[index]);
    }
    // values()
    for (let value of arr.values()) {
    console.log(value);
    }
    // reduce()
    arr.reduce((pre, cur) => {
    console.log(cur);
    }, []);
    // map()
    arr.map(value => console.log(value));
    ```
- 判断元素的数组的方案
    ```
    const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }];
    arr instanceof Array
    // true
    arr.constructor === Array
    // true
    Object.prototype.toString.call(arr) === '[object Array]'
    // true
    Array.isArray(arr)
    // true
    ```
    **说明**
    - instanceof 操作符是假定只有一种全局环境，如果网页中包含多个框架，多个全局环境，如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。（所以在这种情况下会不准确）

    - typeof 操作符对数组取类型将返回 object

    - 因为 constructor 可以被重写，所以不能确保一定是数组。
        ```
        const str = 'abc';
        str.constructor = Array;
        str.constructor === Array 
        // true
        ```
- 将数组元素展开一层的方案
    ```
    const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }];
    // 扩展运算符 + concat
    [].concat(...arr)
    // [1, 2, 3, 4, 1, 2, 3, [1, 2, 3, [1, 2, 3]], 5, "string", { name: "弹铁蛋同学" }];

    // concat + apply
    [].concat.apply([], arr);
    // [1, 2, 3, 4, 1, 2, 3, [1, 2, 3, [1, 2, 3]], 5, "string", { name: "弹铁蛋同学" }]
   ```
- **实现数组展开**
  **基础版：**
  其中，arguments.callee 在哪一个函数中运行，它就代表哪一个函数。 一般用在匿名函数中。
  在匿名函数中有时会需要自己调用自己，但是由于是匿名函数，没有名，无名可调。这时就可以用arguments.callee来代替匿名的函数
  callee 属性是一个指针，指向拥有这个 arguments 对象的函数
  ```
  function flat(arr){
      let arrResult=[];
      arr.forEach(item=>{
          if(Array.isArray(item)){
              arrResult=arrResult.concat(arguments.callee(item));
              //或者用扩展运算符
              //arrResult.push(...arguments.callee(item));
          }
          else{
              arrResult.push(item);
          }
      });
      return arrResult;
  }
    ```

  **reduce版：**
  ```
  const flat=arr=>{
      return arr.reduce((pre,cur)=>{
          return pre.concat(Array.isArray(cur)?flat(cur):cur);
      },[]);
  };
  ```
  **使用栈的思想实现 flat 函数**
  ```
  function flat(arr){
      const res=[];
      const stack=[].concat(arr);// 将数组元素拷贝至栈，直接赋值会改变原数组
      while(stack.length!==0){
          const val=stack.pop();
          if(Array.isArray(val)){
              stack.push(...val);
              //如果是数组再次入栈，并且展开了一层
          }
          else{
              result.unshift(val);//数组头部添加若干元素
          }
      }
      return result;
  }
    ```
    **通过传入整数参数控制“拉平”层数**
    ```
    function flat(arr,num=1){
        return num>0?arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?flat(cur,num-1):cur),[]):arr.slice();
    }
    ```
    **使用 Generator 实现 flat 函数**
    ```
    function* flat(arr,num){
        if(num===undefined) num=1;
        for(const item of arr){
            if(Array.isArray(item)&&num>0){
                yield* flat(item,num-1);
            }
            else{
                yield item;
            }
        }
    }
    // 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象。
    // 也就是遍历器对象（Iterator Object）。所以我们要用一次扩展运算符得到结果
    [...flat(arr, Infinity)]   
    ```
    **在原型链上重写 flat 函数**
    Array.prototype.fakeFlat=function (num=1){
        if(!Number(num)||Number(num)<0){
            return this;
        }
        let arr=this.concat();// 获得调用 fakeFlat 函数的数组
        while(num>0){
            if(arr.some(x=>Array.isArray(x))){
                arr=[].concat.apply([],arr);
                // apply调用concat，apply会将arr分为一个个的元素传入concat，
                // 即，[].concat(arr[0],arr[1],arr[2]...)，arr[0],arr[1],arr[2]...本身是数组或者是元素，会被concat展开一次/// 合并进空数组。
            }
            else{
                break;
                // 数组中没有数组元素并且不管 num 是否依旧大于 0，停止循环。
            }
            num--;
        }
        return arr;
    };
    arr.fakeFlat(Infinity);
    ```
- 数组去重
    ES6:
    ```
    function unique(array) {
     return Array.from(new Set(array))
    }
    ```

