## Set——`const set = new Set(arr)`
- 属性
  >constructor：构造函数，返回Set
  size：返回实例成员总数
- 方法
  >add()：添加值，返回实例
  delete()：删除值，返回布尔
  has()：检查值，返回布尔
  clear()：清除所有成员
  keys()：返回以属性值为遍历器的对象
  values()：返回以属性值为遍历器的对象
  entries()：返回以属性值和属性值为遍历器的对象
  forEach()：使用回调函数遍历每个成员
- 应用
  去重字符串：[...new Set(str)].join("")
  去重数组：[...new Set(arr)]或Array.from(new Set(arr))
  集合数组：
    - 声明：const a = new Set(arr1)、const b = new Set(arr2)
    - 并集：new Set([...a, ...b])
    - 交集：new Set([...a].filter(v => b.has(v)))
    - 差集：new Set([...a].filter(v => !b.has(v)))
  映射集合：
    - 声明：let set = new Set(arr)
    - 映射：set = new Set([...set].map(v => v * 2))或set = new Set(Array.from(set, v => v * 2)
- 重点:
  - 没有键只有值，可认为键和值两值相等
  - **添加多个NaN时，只会存在一个NaN(结合数组去重去看)**
  - **添加相同的对象时，会认为是不同的对象(结合数组去重去看)**
  - **添加值时不会发生类型转换(5 !== "5")**
  - keys()和values()的行为完全一致，entries()返回的遍历器同时包括键和值且两值相等

- ### WeakSet：和Set结构类似，成员值只能是对象
  constructor：构造函数，返回WeakSet
  add()：添加值，返回实例
  delete()：删除值，返回布尔
  has()：检查值，返回布尔
    - **重点**
      - 成员都是弱引用，垃圾回收机制不考虑WeakSet结构对此成员的引用
      - 成员不适合引用，它会随时消失，因此ES6规定WeakSet结构不可遍历
      - 其他对象不再引用成员时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员是否还存在于WeakSet结构中
    - **应用**
      - 储存DOM节点：DOM节点被移除时自动释放此成员，不用担心这些节点从文档移除时会引发内存泄漏
      - 临时存放一组对象或存放跟对象绑定的信息：只要这些对象在外部消失，它在WeakSet结构中的引用就会消失

----------

## Map:类似于对象的数据结构，成员键是任何类型的值.`const set = new Map(arr)`
- 属性
   >constructor：构造函数，返回Map
   size：返回实例成员总数
- 方法
  >get()：返回键值对
  set()：添加键值对，返回实例
  delete()：删除键值对，返回布尔
  has()：检查键值对，返回布尔
  clear()：清除所有成员
  keys()：返回以键为遍历器的对象
  values()：返回以值为遍历器的对象
  entries()：返回以键和值为遍历器的对象
  forEach()：使用回调函数遍历每个成员
- 重点
  - 对同一个键多次赋值，后面的值将覆盖前面的值
  - 对同一个对象的引用，被视为一个键
  - 对同样值的两个实例，被视为两个键（new String('1'),new String('1')无法去重，/a/与/a/也不行）
  - 键跟内存地址绑定，只要内存地址不一样就视为两个键（同上去重问题）
  - 添加多个以NaN作为键时，只会存在一个以NaN作为键的值（说明可以为NaN去重）
  - Object结构提供字符串—值的对应，Map结构提供值—值的对应

- ### WeakMap：和Map结构类似，成员键只能是对象
    constructor：构造函数，返回WeakMap
    get()：返回键值对
    set()：添加键值对，返回实例
    delete()：删除键值对，返回布尔
    has()：检查键值对，返回布尔
    - 重点
      - <u>成员键都是弱引用，</u>垃圾回收机制不考虑WeakMap结构对此成员键的引用
      - 成员键不适合引用，它会随时消失，因此ES6规定WeakMap结构不可遍历
      - 其他对象不再引用成员键时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员是否还存在于WeakMap结构中
      - 一旦不再需要，成员会自动消失，不用手动删除引用
      - 弱引用的只是键而不是值，值依然是正常引用
      - 即使在外部消除了成员键的引用，内部的成员值依然存在
    - 应用
      - 储存DOM节点：DOM节点被移除时自动释放此成员键，不用担心这些节点从文档移除时会引发内存泄漏
      - 部署私有属性：内部属性是实例的弱引用，删除实例时它们也随之消失，不会造成内存泄漏

---------

## Proxy:修改某些操作的默认行为 `const proxy = new Proxy(target, handler)`
- 入参
    >target：拦截的目标对象
    >handler：定制拦截行为(也是一个对象)
  Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
  ```
  var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
  });
  
  let obj = Object.create(proxy);
  obj.time // 35
  proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截。
  ```
--------
## Reflect

reflect到底是干什么的？？？未来总会搞懂的。

**reflect的13个静态方法与Proxy对象的方法是一一对应的。**
- `Reflect.get(target, name, receiver)`
  Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
  ```
  var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
  };
  
  var myReceiverObject = {
    foo: 4,
    bar: 4,
  };
  Reflect.get(myObject, 'foo') // 1
  Reflect.get(myObject, 'bar') // 2
  Reflect.get(myObject, 'baz') // 3
  Reflect.get(myObject, 'baz', myReceiverObject) // 8,如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
  ```
  ------
- `Reflect.set(target, name, value, receiver)`结果返回true或者false，成功与否。
  reflect.set方法设置target对象的name属性等于value。
  如果name属性设置了赋值函数，则赋值函数的this绑定receiver。

- `Reflect.has(obj, name)`
- `Reflect.deleteProperty(obj, name)`:等同于delete obj[name]，用于删除对象的属性。
- `Reflect.construct(target, args)` :target是函数。Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
  ```
  function Greeting(name) {
  this.name = name;
  }
  
  // new 的写法
  const instance = new Greeting('张三');
  
  // Reflect.construct 的写法
  const instance = Reflect.construct(Greeting, ['张三']);
  ```
- `Reflect.getPrototypeOf(obj)`:Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
  ```
  const myObj = new FancyThing();
  // 旧写法
  Object.getPrototypeOf(myObj) === FancyThing.prototype;
  // 新写法
  Reflect.getPrototypeOf(myObj) === FancyThing.prototype;
  ```
  Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。
- `Reflect.setPrototypeOf(obj, newProto)`设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。
  - 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。
  - 如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。
- `Reflect.apply(func, thisArg, args) `Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
  >一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args).
  ```
  const ages = [11, 33, 12, 54, 18, 96];
  // 旧写法
  const youngest = Math.min.apply(Math, ages);
  const oldest = Math.max.apply(Math, ages);
  const type = Object.prototype.toString.call(youngest);
  
  // 新写法
  const youngest = Reflect.apply(Math.min, Math, ages);
  const oldest = Reflect.apply(Math.max, Math, ages);
  const type = Reflect.apply(Object.prototype.toString, youngest, []);
  ```
- `Reflect.defineProperty(target, propertyKey, attributes) `:基本等同于Object.defineProperty(逐渐被废)。
  ```
  Reflect.defineProperty(MyDate, 'now', {
    value: () => Date.now()
  });
  var a={c:1};
  const p=new Proxy(a,{
    defineProperty(target,prop,descriptor){
      console.log(descriptor);
      return Reflect.defineProperty(target,prop,descriptor)
    }
  });

  p.foo = 'bar';
  // {value: "bar", writable: true, enumerable: true, configurable: true}
  
  p.foo // "bar"
  a.foo // "bar"
  ```
  **Proxy.defineProperty对属性赋值设置了拦截，然后使用Reflect.defineProperty完成了赋值。**

- `Reflect.getOwnPropertyDescriptor(target, propertyKey)`:基本等同于Object.getOwnPropertyDescriptor,用于得到指定属性的描述对象
  ```
  var myObject = {};
  Object.defineProperty(myObject, 'hidden', {
    value: true,
    enumerable: false,
  });
  
  // 旧写法
  var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');
  
  // 新写法
  var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
  ```

- `Reflect.isExtensible (target)`对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
  ```
  const myObject = {};
  // 旧写法
  Object.isExtensible(myObject) // true  
  // 新写法
  Reflect.isExtensible(myObject) // true
  ```

- `Reflect.preventExtensions(target) `对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
  ```
  var myObject = {};
  // 旧写法
  Object.preventExtensions(myObject) // Object {}  
  // 新写法
  Reflect.preventExtensions(myObject) // true
  ```
- `Reflect.ownKeys (target)`返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。

- 使用 Proxy 写一个观察者模式的最简单实现。
  ```
  const queuedObservers=new Set();
  const observe=fn=>queueObservers.add(fn);
  const observable=obj=>new Proxy(obj,{set});
  function set(target,key,value,reveiver){
    const result=Reflect.set(target,key ,value,receiver);
    queuedObeservers.forEach(observer=>observer());
    return result;
  }
  ```
  先定义了一个Set集合，所有观察者函数都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值操作。拦截函数set之中，会自动执行所有观察者。

-------

## Class
- 类的基本用法
    ```
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。
      toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }
    }
    ```
    >typeof Point // "function"
    Point === Point.prototype.constructor // true
    **类的数据类型就是函数，类本身就指向构造函数。**
  - Object.assign方法可以很方便地一次向类添加多个方法。
    ```
    Object.assign(Point.prototype, {
      toString(){},
      toValue(){}
    });
    ```
  - 类的内部所有定义的方法，都是不可枚举的.
    ```
    Object.keys(Point.prototype)
    // []
    Object.getOwnPropertyNames(Point.prototype)
    // ["constructor","toString"]
    ```
    *但是采用 ES5 的写法，toString方法就是可枚举的。*

  - constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
    ```
    class Foo {
      constructor() {
        return Object.create(null);
      }
    }
    
    new Foo() instanceof Foo
    // false
    ```
- 类的实例
  与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
  ```
    //定义类
  class Point {
  
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  
  }
  
  var point = new Point(2, 3);
  
  point.toString() // (2, 3)
  
  point.hasOwnProperty('x') // true
  point.hasOwnProperty('y') // true
  point.hasOwnProperty('toString') // false
  point.__proto__.hasOwnProperty('toString') // true
  ```
- **注意点**
  1. 严格模式
  2. 类不存在变量提升（hoist）
  3. 类有函数的许多特性，Point.name;
  4. 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
    ```
     class Foo {
        constructor(...args) {
          this.args = args;
        }
        * [Symbol.iterator]() {
          for (let arg of this.args) {
            yield arg;
          }
        }
      }
      
      for (let x of new Foo('hello', 'world')) {
        console.log(x);
      }
      // hello
      // world
      Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。
    ```
  5. 箭头函数：
     > 
      ```
      class Obj {
        constructor() {
          this.getThis = () => this;
        }
      }
      
      const myObj = new Obj();
      myObj.getThis() === myObj // true
      **箭头函数内部的this总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象。**
      ```
---------

- 静态方法：
  - 如果静态方法包含this关键字，这个this指的是类，而不是实例。
  - 父类的静态方法，可以被子类继承。
  - 静态方法也是可以从super对象上调用的。
- 实例属性的新写法，在类顶层，不在constructor中。
  ```
  class foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
  }
  ```
- 静态属性
- 私有方法和私有属性 

-------
- 类的继承
>ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
>ES6 的继承机制则不同，实质是先将父类实例对象的属性和方法加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。
- Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
  - （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
  - （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
    B.__proto__ === A // true
    B.prototype.__proto__ === A.prototype // true
  
  >作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。
  ```
  B.prototype = Object.create(A.prototype);
  // 等同于
  B.prototype.__proto__ = A.prototype;
  ```
  - 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性.子类的原型的原型，是父类的原型。
    p2.__proto__.__proto__ === p1.__proto__ // true
  - 原生构造函数的继承 :指语言内置的构造函数，通常用来生成数据结构。
    >Boolean()
     Number()
     String()
     Array()
     Date()
     Function()
     RegExp()
     Error()
     Object()

    - es5中原生构造函数是无法继承的，而es6可以。
      - ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。
      - ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。
-------
## Module
  >CommonJS：用于服务器(动态化依赖)
  AMD：用于浏览器(动态化依赖)
  CMD：用于浏览器(动态化依赖)
  UMD：用于浏览器和服务器(动态化依赖)
  ESM：用于浏览器和服务器(静态化依赖)
  
  - 运行时加载
  定义：整体加载模块生成一个对象，再从对象上获取需要的属性和方法进行加载(全部加载)
  影响：只有运行时才能得到这个对象，导致无法在编译时做静态优化
  - 编译时加载
  定义：直接从模块中获取需要的属性和方法进行加载(按需加载)
  影响：在编译时就完成模块加载，效率比其他方案高，但无法引用模块本身(本身不是对象)，可拓展JS高级语法(宏和类型校验)
  
  - 传统加载：通过<script>进行同步或异步加载脚本 
    - 同步加载：<script src=""></script>
    - Defer异步加载：<script src="" defer></script>(顺序加载，渲染完再执行)
    - Async异步加载：<script src="" async></script>(乱序加载，下载完就执行)
  - 模块加载：<script type="module" src=""></script>(默认是Defer异步加载)

  -  ES6 模块与 CommonJS 模块的差异
     >1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
        - CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
        - ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块
     >2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
        -运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
        编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。
      >>因为CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
     >3. CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

  - ***ES6模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。***
  - ***CommonJS 模块的顶层this指向当前模块***

