- 函数的长度就是定义形参的个数。
    实现add函数,让add(a)(b)和add(a,b)两种调用结果相同
    实现1
    function add(a, b) {
        if (b === undefined) {
            return function(x) {
                return a + x
            }
        }

        return a + b
    }
    实现2——柯里化
    function curry(fn, ...args1) {
        if (fn.length == args1.length) {
            return fn(...args1)
        }

        return function(...args2) {
            return curry(fn, ...args1, ...args2)
        }
    }

    function add(a, b) {
        return a + b
    }

    console.log(curry(add, 1)(2)) // 3
    console.log(curry(add, 1, 2)) // 3

- 浅拷贝的实现
  ***简单的引用复制***
    ```
    function shallowClone(copyObj) {
    var obj = {};
    for ( var i in copyObj) {
        obj[i] = copyObj[i];
    }
    return obj;
    }
    var x = {
    a: 1,
    b: { f: { g: 1 } },
    c: [ 1, 2, 3 ]
    };
    var y = shallowClone(x);
    console.log(y.b.f === x.b.f);
    ```
  ***Object.assign()浅拷贝***
    Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。
    Object.assign({},a,b);
    ```
    var x = {
    a: 1,
    b: { f: { g: 1 } },
    c: [ 1, 2, 3 ]
    };
    var y = Object.assign({}, x);
    console.log(y.b.f === x.b.f);     // true
    ```

- 实现对象深拷贝
  **注意：**
  Array的slice和concat方法
    Array的slice和concat方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。**之所以把它放在深拷贝里，是因为它看起来像是深拷贝。而实际上它是浅拷贝**。原数组的元素会按照下述规则拷贝：

    如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
    对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。
    如果向两个数组任一中添加了新元素，则另一个不会受到影响。
  ```
  JSON对象parse方法可以将JSON字符串反序列化成JS对象，stringify方法可以将JS对象序列化成JSON字符串，借助这两个方法，也可以实现对象的深拷贝。
  let o1={
      a:{
          b:1
      }
  }
  let o2=JSON.parse(JSON.stringify(o1))
  ```
  这种方法使用较为简单，可以满足基本的深拷贝需求，而且能够处理JSON格式能表示的所有数据类型，但是对于正则表达式类型、函数类型等无法进行深拷贝(而且会直接丢失相应的值)。还有一点不好的地方是它会抛弃对象的constructor。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object。同时如果对象中存在循环引用的情况也无法正确实现深拷贝。
    1. 如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象；
    2. 如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象
    3. 如果obj里有函数、undefined，则序列化的结果会把函数或 undefined丢失。
    4. 如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null。
    5. JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.    stringify(obj))深拷贝后，会丢弃对象的constructor；
        ```
        function Person(name) {
          this.name = name;
          console.log(name)
        }

        const liai = new Person('liai');

        const test = {
          name: 'a',
          date: liai,
        };
        // debugger
        const copyed = JSON.parse(JSON.stringify(test));
        test.name = 'test'
        console.error('ddd', test, copyed)
        ```

    6. 如果对象中存在循环引用的情况也无法正确实现深拷贝


  **PS:**
   如果请求的Content-Type是 application/x-www-form-urlencoded，则前端这边需要使用qs.stringify(data)来序列化参数再传给后端，否则后端接受不到;如果 Content-Type 为 application/json;charset=UTF-8或者 multipart/form-data 则可以不需要 ）
---
  ***一步步写出合格的深拷贝***
  - 如果是原始类型，无需继续拷贝，直接返回
  - 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上
    ```
    function clone(target){
        if(typeof target==='object'){
            let cloneTarget={};
            for(var key in target){
                cloneTarget[key]=clone(target[key]);
            }
            return cloneTarget;
        }
        else{
            return target;
        }
    }
    ```
    **考虑数组**
    ```
    module.exports = function clone(target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
    };
    ```  
    **考虑循环引用，即对象的属性间接或直接的引用了自身的情况：**
  解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
    这个存储空间，需要可以存储key-value形式的数据，且key可以是一个引用类型，我们可以选择Map这种数据结构：
    检查map中有无克隆过的对象
    有 - 直接返回
    没有 - 将当前对象作为key，克隆对象作为value进行存储
    继续克隆
    ```
    function clone(target, map=new Map()){
        if(typeof target==='object'){
            let cloneTarget=Array.isArray(traget)?[]:{};
            if(map.get(target)){
                return map.get(target);
            }
            map.set(target,cloneTarget);
            for(const key in target){
                cloneTarget[key]=clone(target[key],map);
            }
            return cloneTarget;
        }
        else{
            return target;
        }
    };
    ```
  ---

  weakMap()优化：
  WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
  在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
  我们默认创建一个对象：const obj = {}，就默认创建了一个强引用的对象，我们只有手动将obj = null，它才会被垃圾回收机制进行回收，如果是弱引用对象，垃圾回收机制会自动帮我们回收。
  如果我们使用Map的话，那么对象间是存在强引用关系的：
  let obj = { name : 'ConardLi'}
  const target = new Map();
  target.set(obj,'code秘密花园');
  obj = null;
  复制代码虽然我们手动将obj，进行释放，然是target依然对obj存在强引用关系，所以这部分内存依然无法被释放。
  再来看WeakMap：
  let obj = { name : 'ConardLi'}
  const target = new WeakMap();
  target.set(obj,'code秘密花园');
  obj = null;
  复制代码如果是WeakMap的话，target和obj存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。
  
  **继续优化**
  for、while、for in的执行效率：while、for、 for in
**这部分weakMap()优化不懂没事**
  
  ---

        **tips** 正则表达式
        i：ignorCase忽略大小写
        m：mutiple允许多行匹配
        g：globle进行全局匹配，指匹配到目标串的结尾
**深拷贝的实现，见代码**


