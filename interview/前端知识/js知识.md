- object.create():
new Object() 通过构造函数来创建对象, 添加的属性是在自身实例下。
Object.create() es6创建对象的另一种方式，可以理解为继承一个对象, 添加的属性是在原型下。

**创建对象的几种方法**
1. 字面量 var obj={a:1}
2. 构造函数 function obj(val){
    this.a=val;
   }
3. var obj=Object.create({a:1});




- 箭头函数和普通函数有什么区别
函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象，用call apply bind也不能改变this指向
不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
箭头函数没有原型对象prototype