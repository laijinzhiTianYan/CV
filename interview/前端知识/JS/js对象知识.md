- object.create():
new Object() 通过构造函数来创建对象, 添加的属性是在自身实例下。
Object.create() es6创建对象的另一种方式，可以理解为继承一个对象, 添加的属性是在原型下。

**创建对象的几种方法**
1. 字面量 var obj={a:1}
2. 构造函数 function obj(val){
    this.a=val;
   }
3. var obj=Object.create({a:1});


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
