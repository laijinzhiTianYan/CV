## Iterator，var iter=arr[Symbol.iterator]();iter.next;...直到done。
- 定义：为各种不同的数据结构提供统一的访问机制
- 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。
- 原理：创建一个指针指向首个成员，按照次序使用next()指向下一个成员，直接到结束位置(数据结构只要部署Iterator接口就可完成遍历操作)
- 遍历器对象
  next()：下一步操作，返回{ done, value }(必须部署)
  return()：for-of提前退出调用，返回{ done: true }
  throw()：不使用，配合Generator函数使用
- ForOf循环
  遍历字符串：for-in获取索引，for-of获取值(可识别32位UTF-16字符)
  遍历数组：for-in获取索引，for-of获取值
  遍历对象：for-in获取键，for-of需自行部署(一种解决方法是，使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组。另一个方法是使用 Generator 函数将对象重新包装一下。)
  遍历Set：for-of获取值 => for (const v of set)
  遍历Map：for-of获取键值对 =>  for (const [k, v] of map)
  遍历类数组：包含length的对象、Arguments对象、NodeList对象(**无Iterator接口的类数组可用Array.from()转换**)
  for-of：entries()，keys()，values()这三个方法调用后生成的遍历器对象，所遍历的都是计算生成的数据结构。
- 应用场景
  - 改写具有Iterator接口的数据结构的Symbol.iterator
  - 解构赋值：对Set进行解构，会默认调用Symbol.iterator方法。
    ```
    let set = new Set().add('a').add('b').add('c');
    let [x,y] = set;
    // x='a'; y='b'
    let [first, ...rest] = set;
    // first='a'; rest=['b','c'];
    ```
  - 扩展运算符：将部署Iterator接口的数据结构使用扩展运算符转为数组
    ```
    // 例一
    var str = 'hello';
    [...str] //  ['h','e','l','l','o']

    // 例二
    let arr = ['b', 'c'];
    ['a', ...arr, 'd']
    // ['a', 'b', 'c', 'd']
    ```
  - yield*：yield*后跟一个可遍历的数据结构，会调用其遍历器接口
    ```
    let generator = function* () {
      yield 1;
      yield* [2,3,4];
      yield 5;
    };   
    var iterator = generator();

    iterator.next() // { value: 1, done: false }
    iterator.next() // { value: 2, done: false }
    iterator.next() // { value: 3, done: false }
    iterator.next() // { value: 4, done: false }
    iterator.next() // { value: 5, done: false }
    iterator.next() // { value: undefined, done: true }
    ```
  - 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口：for-of、Array.from()、new Set()、new WeakSet()、new Map()、new WeakMap()、Promise.all()、Promise.race()
- 与其他遍历语法的比较 
  1. 无法中途跳出forEach循环，break命令或return命令都不能奏效。
  2. for...in循环主要是为遍历对象而设计的,所以
     >数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
     for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
     某些情况下，for...in循环会以任意顺序遍历键名
  3. 不同于forEach方法，for-of可以与break、continue和return配合使用。
     有着同for...in一样的简洁语法，但是没有for...in那些缺点。

## Promise:包含异步操作结果的对象.`new Promise((resolve, reject) => {})`
- 状态
  >进行中：pending
  >已成功：resolved
  >已失败：rejected
  resolve：将状态从未完成变为成功，在异步操作成功时调用，并将异步操作的结果作为参数传递出去
  reject：将状态从未完成变为失败，在异步操作失败时调用，并将异步操作的错误作为参数传递出去
- 方法
  - then()：分别指定resolved状态和rejected状态的回调函数
  - catch()：指定发生错误时的回调函数
  - Promise.all()：将多个实例包装成一个新实例，返回全部实例状态变更后的结果数组(齐变更再返回)
    - 入参：具有Iterator接口的数据结构
    - 成功：只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
    - 失败：只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
  - Promise.race()
    - 入参：具有Iterator接口的数据结构
    - 成功失败：哪个实例率先改变状态，就返回哪个实例的状态就传递给回调函数。
  - Promise.resolve('a')：将对象转为Promise对象(等价于new Promise(resolve => resolve('a')))
    - 参数是Promise实例：原封不动地返回入参
    - 参数是Thenable对象：将此对象转为Promise对象并返回(Thenable为包含then()的对象，执行then()相当于执行此对象的then())
    - 参数是不具有then()的对象，或根本就不是对象：将此对象转为Promise对象并返回，状态为resolved
      ```
      const p = Promise.resolve('Hello');
      p.then(function (s) {
        console.log(s)
      });
      // Hello
      ```
      由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve()方法的参数，会同时传给回调函数。
    - 不带参数：返回Promise对象，状态为resolved

  - Promise.reject()：将对象转为状态为rejected的Promise对象(等价于new Promise((resolve, reject) => reject()))
  - Promise.finally()：指定不管最后状态如何都会执行的回调函数
  - 2020扩展：Promise.allSettled()：将多个实例包装成一个新实例，返回全部实例状态变更后的状态数组(齐变更再返回)
    入参：具有Iterator接口的数据结构
    成功：成员包含status和value，status为fulfilled，value为返回值
    失败：成员包含status和reason，status为rejected，value为错误原因
    >有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，Promise.allSettled()方法就很有用。
    ```
    const promises = [ fetch('index.html'), fetch('https://does-not-exist/') ];
    const results = await Promise.allSettled(promises);    
    // 过滤出成功的请求
    const successfulPromises = results.filter(p => p.status === 'fulfilled');    
    // 过滤出失败的请求，并输出原因
    const errors = results
      .filter(p => p.status === 'rejected')
      .map(p => p.reason);
    ```

  - Promise.any():该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
    ```
    var resolved = Promise.resolve(42);
    var rejected = Promise.reject(-1);
    var alsoRejected = Promise.reject(Infinity);

    Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
      console.log(result); // 42
    });

    Promise.any([rejected, alsoRejected]).catch(function (results) {
      console.log(results); // [-1, Infinity]
    });
    ```
  - 
- 应用举例 ：加载图片；AJAX转Promise对象
  ```
  将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化
  const preloadImage=function (path){
    return new Promise(function(resolve,reject){
      const image=new Image();
      image.onload=resolve;
      image.onerror=reject;
      image.src=path;
    })
  }
  ```
  
- **重点**
  >只有异步操作的结果可决定当前状态是哪一种，其他操作都无法改变这个状态
  状态改变只有两种可能：从pending变为resolved、从pending变为rejected
  <u>一旦新建Promise对象就会立即执行，无法中途取消</u>
  不设置回调函数，内部抛错不会反应到外部
  当处于pending时，无法得知目前进展到哪一个阶段
  <u>实例状态变为resolved或rejected时，会触发then()绑定的回调函数</u>
  resolve()和reject()的执行总是晚于本轮循环的同步任务
  <u>then()运行中抛出错误会被catch()捕获</u>
  reject()的作用等同于抛出错误
  实例状态已变成resolved时，再抛出错误是无效的，不会被捕获，等于没有抛出
  不要在then()里定义rejected状态的回调函数(不使用其第二参数)
  建议使用catch()捕获错误，不要使用then()第二个参数捕获
  没有使用catch()捕获错误，实例抛错不会传递到外层代码，即不会有任何反应
  作为参数的实例定义了catch()，一旦被rejected并不会触发Promise.all()的catch()
  Promise.reject()的参数会原封不动地作为rejected的理由，变成后续方法的参数

## Generator:封装多个内部状态的异步编程解决方案
>形式上,Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）

- 形式：调用Generator函数(该函数不执行)返回指向内部状态的指针对象(不是运行结果),这个指针对象就是Iterator。声明：`function* Func() {}`
- 方法
  next()：使指针移向下一个状态，返回{ done, value }(入参会被当作上一个yield命令表达式的返回值)
          每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
  return()：返回指定值且终结遍历Generator函数，返回{ done: true, value: 入参 }
  throw()：在Generator函数体外抛出错误，在Generator函数体内捕获错误，返回自定义的new Errow()
    - 相同点：next()、throw()、return()本质上是同一件事，作用都是让函数恢复执行且使用不同的语句替换yield命令
    - 不同点:
      next()：将yield命令替换成一个值
      return()：将yield命令替换成一个return语句
      throw()：将yield命令替换成一个throw语句

- yield命令：声明内部状态的值(return声明结束返回的值)
  - 遇到yield命令就暂停执行后面的操作，并将其后表达式的值作为返回对象的value
  - 下次调用next()时，再继续往下执行直到遇到下一个yield命令
  - 没有再遇到yield命令就一直运行到Generator函数结束，直到遇到return语句为止并将其后表达式的值作为返回对象的value
  - Generator函数没有return语句则返回对象的value为undefined
- yield*命令：在一个Generator函数里执行另一个Generator函数(后随具有Iterator接口的数据结构)
- 作为对象属性
  - 全写：const obj = { method: function*() {} }
  - 简写：const obj = { * method() {} }
- 上下文：执行产生的上下文环境一旦遇到yield命令就会暂时退出堆栈(但并不消失)，所有变量和对象会冻结在当前状态，等到对它执行next()   时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行

- 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。
  由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。
  ```
  var myIterable = {};
  myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };
  
    [...myIterable] // [1, 2, 3]
  ```
- for-of循环
  ```
  function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6; // done===true
  }
  
  for (let v of foo()) {
    console.log(v);
  }
  // 1 2 3 4 5
  这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。
  ```
- 作为对象属性的 Generator 函数 
  ```
  let obj = {
  * myGeneratorMethod() {
    ···
    }
  };
  等价于
  let obj = {
    myGeneratorMethod: function* () {
      // ···
    }
  };
  ```

- Generator与协程
  1. 可以理解成“协作的线程”或“协作的函数”。协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。
  2. 
   - 2.1 传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。
   - 2.2 从实现上看，在内存中，子例程只使用一个栈（stack），而协程是同时存在多个栈，但只有一个栈是在运行状态，也就是说，协程是以多占用内存为代价，实现多任务的并行。
  3. 普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。Generator 函数被称为“半协程”（semi-coroutine），意思是只有 Generator 函数的调用者，才能将程序的执行权还给 Generator 函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。


- Generator 与上下文
  - 它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
  - 普通函数的执行上下文堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

- 应用场景
  异步操作同步化表达
  控制流管理
  为对象部署Iterator接口：把Generator函数赋值给对象的Symbol.iterator，从而使该对象具有Iterator接口
  作为具有Iterator接口的数据结构

- **重点**
  **每次调用next()，指针就从函数头部或上次停下的位置开始执行，直到遇到下一个yield命令或return语句为止**
  函数内部可不用yield命令，但会变成单纯的暂缓执行函数(还是需要next()触发)
  **yield命令是暂停执行的标记，next()是恢复执行的操作**
  yield命令用在另一个表达式中必须放在圆括号里
  ```
  function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
  }
  ```
  yield命令用作函数参数或放在赋值表达式的右边，可不加圆括号
  yield命令本身没有返回值，可认为是返回undefined
  yield命令表达式为惰性求值，等next()执行到此才求值
  函数调用后生成遍历器对象，此对象的Symbol.iterator是此对象本身
  在函数运行的不同阶段，通过next()从外部向内部注入不同的值，从而调整函数行为
  首个next()用来启动遍历器对象，后续才可传递参数
  想首次调用next()时就能输入值，可在函数外面再包一层
  一旦next()返回对象的done为true，for-of遍历会中止且不包含该返回对象
  函数内部部署try-finally且正在执行try，那么return()会导致立刻进入finally，执行完finally以后整个函数才会结束
  函数内部没有部署try-catch，throw()抛错将被外部try-catch捕获
  throw()抛错要被内部捕获，前提是必须至少执行过一次next()
  throw()被捕获以后，会附带执行下一条yield命令
  函数还未开始执行，这时throw()抛错只可能抛出在函数外部
  
  >首次next()可传值
  function Wrapper(func){
    return function(...args){
      const generator=func(...args);
      generator.next();
      return generator;
    }
  }
  const print=Wrapper(function*(){
    console.log(`Frist Input:${yield}`);
    return "done";
  });
  print().next("hello");

- Async和Await：使异步函数以同步函数的形式书写(Generator函数语法糖)
  - **形式：将Generator函数的*替换成async，将yield替换成await**
  - 声明
    >具名函数：async function Func() {}
    >函数表达式：const func = async function() {}
    >箭头函数：const func = async() => {}
    >对象方法：const obj = { async func() {} }
    >类方法：class Cla { async Func() {} }
    await命令：等待当前Promise对象状态变更完毕
    正常情况：后面是Promise对象则返回其结果，否则返回对应的值
    后随Thenable对象：将其等同于Promise对象返回其结果

  - async对generator函数的改进
    1. 内置执行器。不像generator函数那样需要next或者co执行器。
    2. 更好的语义。
    3. 更广的适用性。co模块约定，yield命令后面只能是 Thunk（自动执行generator函数的一种方法） 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
    4. 返回值是 Promise。
   
   ----------------------
  - Async函数返回Promise对象，可使用then()添加回调函数
    ```
    async function getStockPriceByName(name) {
      const symbol = await getStockSymbol(name);
      const stockPrice = await getStockPrice(symbol);
      return stockPrice;
    }

    getStockPriceByName('goog').then(function (result) {
      console.log(result);
    });
    调用该函数时，会立即返回一个Promise对象。
    ```
  - Async函数的多种使用形式
    ```
    // 函数声明
    async function foo() {}
    
    // 函数表达式
    const foo = async function () {};
    
    // 对象的方法
    let obj = { async foo() {} };
    obj.foo().then(...)
    
    // Class 的方法
    class Storage {
      constructor() {
        this.cachePromise = caches.open('avatars');
      }
    
      async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }
    
    const storage = new Storage();
    storage.getAvatar('jake').then(…);
    
    // 箭头函数
    const foo = async () => {};
    ```
  ---------------------------------

  - 语法
    1. async函数返回一个 Promise 对象。async函数内部return语句返回的值，会成为then方法回调函数的参数。
       ```
       async function f() {
        return 'hello world';
      }

      f().then(v => console.log(v))
      // "hello world"
       ```
       async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
    2. async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。
      ```
      async function getTitle(url) {
        let response = await fetch(url);
        let html = await response.text();
        return html.match(/<title>([\s\S]+)<\/title>/i)[1];
      }
      getTitle('https://tc39.github.io/ecma262/').then(console.log)
      // "ECMAScript 2017 Language Specification"

      函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行then方法里面的console.log。
      ```
    3. - await命令：后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
       - 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
          ```
          async function f() {
            await Promise.reject('出错了');
            await Promise.resolve('hello world'); // 不会执行
          }
          ```
        - 我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
          ```
          async function f() {
            try {
              await Promise.reject('出错了');
            } catch(e) {
            }
            return await Promise.resolve('hello world');
          }

          f()
          .then(v => console.log(v))
          // hello world

          async function f() {
            await Promise.reject('出错了')
              .catch(e => console.log(e));
            return await Promise.resolve('hello world');
          }

          f()
          .then(v => console.log(v))
          // 出错了
          // hello world
          ```
        - await命令只能用在async函数之中，如果用在普通函数，就会报错。
        - 如果确实希望多个请求并发执行，可以使用Promise.all方法。
          ```
          async function dbFuc(db) {
            let docs = [{}, {}, {}];
            let promises = docs.map((doc) => db.post(doc));

            let results = await Promise.all(promises);
            console.log(results);
          }
          多个异步操作同时触发，这样就会缩短程序的执行时间。
          ```
        - async 函数可以保留运行堆栈。
          ```
          const a = async () => {
             await b();
             c();
           };
          b()运行的时候，a()是暂停执行，上下文环境都保存着。一旦b()或c()报错，错误堆栈将包括a()。
          ```



  --------------------------------
  - **重点**
    >Async函数返回Promise对象，可使用then()添加回调函数
    内部return返回值会成为后续then()的出参
    内部抛出错误会导致返回的Promise对象变为rejected状态，被catch()接收到
    返回的Promise对象必须等到内部所有await命令Promise对象执行完才会发生状态改变，除非遇到return语句或抛出错误
    任何一个await命令Promise对象变为rejected状态，整个Async函数都会中断执行
    希望即使前一个异步操作失败也不要中断后面的异步操作
    将await命令Promise对象放到try-catch中
    await命令Promise对象跟一个catch()
    await命令Promise对象可能变为rejected状态，最好把其放到try-catch中
    多个await命令Promise对象若不存在继发关系，最好让它们同时触发
    await命令只能用在Async函数之中，否则会报错
    数组使用forEach()执行async/await会失效，可使用for-of和Promise.all()代替
    可保留运行堆栈，函数上下文随着Async函数的执行而存在，执行完成就消失









