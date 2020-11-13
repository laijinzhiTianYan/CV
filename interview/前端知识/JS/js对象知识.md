**强烈推荐的几篇文章**
1. [用自己的方式（图）理解 constructor、prototype、proto和原型链](https://juejin.im/post/5cc99fdfe51d453b440236c3)

- object.create():
new Object() 通过构造函数来创建对象, 添加的属性是在自身实例下。
Object.create() es6创建对象的另一种方式，可以理解为继承一个对象, 添加的属性是在原型下。

**创建对象的几种方法**
1. 字面量 var obj={a:1}
2. 构造函数 function obj(val){
    this.a=val;
   }
3. var obj=Object.create({a:1});
------
**在Vue和Vuex的源码中，作者都使用了Object.create(null)来初始化一个新对象。为什么不用更简洁的{}呢？**
Object.create(proto,[propertiesObject])
- proto:新创建对象的原型对象
- propertiesObject:可选。要添加到新对象的可枚举（新添加的属性是其自身的属性，而不是其原型链上的属性）的属性

Object.create(null)=>{}
{}=>{}以及__proto__
- 理由一：使用create创建的对象，没有任何属性，显示No properties，我们可以把它当作一个非常纯净的map来使用，我们可以自己定义hasOwnProperty、toString方法，不管是有意还是不小心，我们完全不必担心会将原型链上的同名方法覆盖掉。
- 理由二：使用for..in循环的时候会遍历对象原型链上的属性，使用create(null)就不必再对属性进行检查了，当然，我们也可以直接使用Object.keys[]。
---

- 箭头函数和普通函数有什么区别
函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象，用call apply bind也不能改变this指向
不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
箭头函数没有原型对象prototype

---
- typeof运算符的返回类型为字符串：
   1. 'undefined'        ---未定义的变量或值
   2. 'boolean'          ---布尔类型的变量或值
   3. 'string'           ---字符串类型的变量或值
   4. 'symbol'           ---let s=Symbol() ,typeOf s;
      - Symbol()生成一个原始类型的值而不是对象，因此Symbol()前不能使用new命令
      - Symbol()参数表示对当前Symbol值的描述，相同参数的Symbol()返回值不相等
   5. 'number'           ---数字类型的变量或值, typeof NaN 结果是'number'
   6. 'object'           ---对象类型的变量或值，或者null(这个是js历史遗留问题，将null作为object类型处理)
   7. 'function'         ---函数类型的变量或值
  如果我们想判断一个对象的正确类型，这时候可以考虑使用 instanceof，其内部机制是通过原型链来判断的。
  例如：p1 instanceof person... 当然，对于原始类型来说，直接通过 instanceof来判断类型是不行的。
   ```
   var str = 'hello world'
   str instanceof String // false
   
   var str1 = new String('hello world')
   str1 instanceof String // true
   ```
-----
- new 运算到底干了什么？
  步骤：
  1. 创建一个全新的对象
  2. 这个新对象被执行 [[原型]] 连接
  3. 执行构造函数方法，属性和方法被添加到this引用的对象中
  4. 如果构造函数中没有返回其它对象，那么返回this，即创建的这个的新对象，否则，返回构造函数中返回的对象。
  ① 有一个构造函数
  function Person(identity){
    this.identity=identity||'Person';
  }
  ② 有个对象
  var obj={}
  ③ 让obj承认自己的构造函数（爹）就是Person函数
  obj.__proto__=Person.prototype;
  ④ 让Person函数承认这个对象就是它自己的实例（子）.
  怎样才算是Person的实例呢？obj必须有Person的属性。
  所以，才让obj调用Person，拥有Person给孩子们设置的属性/方法
  Person.apply(obj,['son'])或者Person.call(obj,'son');
  ⑤ 完成，验证 
  console.log(obj.constructor) // 输出结果：[Function: Person]
  console.log(obj.identity) // 输出结果：son

-------

- js可迭代对象，有迭代器的
  Array.prototype[Symbol.iterator]
  TypedArray.prototype[Symbol.iterator]
  String.prototype[Symbol.iterator]
  Map.prototype[Symbol.iterator]
  Set.prototype[Symbol.iterator]
  NodeList.protopype[Symbol.iterator]
  arguments[Symbol.iterator]

- ES2018对对象的扩展：转换对象为用逗号分隔的参数序列{...obj}
  - 应用
    克隆对象：const obj = { __proto__: Object.getPrototypeOf(obj1), ...obj1 }
    合并对象：const obj = { ...obj1, ...obj2 }
    转换字符串为对象：{ ..."hello" }
    转换数组为对象：{ ...[1, 2] }
    与对象解构赋值结合：const { x, ...rest/spread } = { x: 1, y: 2, z: 3 }(不能复制继承自原型对象的属性)
    修改现有对象部分属性：const obj = { x: 1, ...{ x: 2 } }
- ES2019:Object.fromEntries()：返回以键和值组成的对象(Object.entries()的逆操作)
- ES2020：
  - 链判断操作符(?.)：是否存在对象属性(不存在返回undefined且不再往下执行)
    对象属性：obj?.prop、obj?.[expr]
    函数调用：func?.(...args)
  - 空判断操作符(??)：是否值为undefined或null，是则使用默认值













