## Iterator
- 定义：为各种不同的数据结构提供统一的访问机制
- 原理：创建一个指针指向首个成员，按照次序使用next()指向下一个成员，直接到结束位置(数据结构只要部署Iterator接口就可完成遍历操作)
- 遍历器对象
  next()：下一步操作，返回{ done, value }(必须部署)
  return()：for-of提前退出调用，返回{ done: true }
  throw()：不使用，配合Generator函数使用
- ForOf循环
  遍历字符串：for-in获取索引，for-of获取值(可识别32位UTF-16字符)
  遍历数组：for-in获取索引，for-of获取值
  遍历对象：for-in获取键，for-of需自行部署
  遍历Set：for-of获取值 => for (const v of set)
  遍历Map：for-of获取键值对 =>  for (const [k, v] of map)
  遍历类数组：包含length的对象、Arguments对象、NodeList对象(无Iterator接口的类数组可用Array.from()转换)
- 应用场景
  - 改写具有Iterator接口的数据结构的Symbol.iterator
  - 解构赋值：对Set进行结构
  - 扩展运算符：将部署Iterator接口的数据结构转为数组
  - yield*：yield*后跟一个可遍历的数据结构，会调用其遍历器接口
  - 接受数组作为参数的函数：for-of、Array.from()、new Set()、new WeakSet()、new Map()、new WeakMap()、Promise.all()、Promise.race()
  
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
    - 成功：只有全部实例状态变成fulfilled，最终状态才会变成fulfilled
    - 失败：其中一个实例状态变成rejected，最终状态就会变成rejected
  - Promise.race()
    - 入参：具有Iterator接口的数据结构
    - 成功失败：哪个实例率先改变状态就返回哪个实例的状态
  - Promise.resolve()：将对象转为Promise对象(等价于new Promise(resolve => resolve()))
    - Promise实例：原封不动地返回入参
    - Thenable对象：将此对象转为Promise对象并返回(Thenable为包含then()的对象，执行then()相当于执行此对象的then())
    - 不具有then()的对象：将此对象转为Promise对象并返回，状态为resolved
    - 不带参数：返回Promise对象，状态为resolved

  - Promise.reject()：将对象转为状态为rejected的Promise对象(等价于new Promise((resolve, reject) => reject()))
  - Promise.finally()：指定不管最后状态如何都会执行的回调函数
  - 2020扩展：Promise.allSettled()：将多个实例包装成一个新实例，返回全部实例状态变更后的状态数组(齐变更再返回)
    入参：具有Iterator接口的数据结构
    成功：成员包含status和value，status为fulfilled，value为返回值
    失败：成员包含status和reason，status为rejected，value为错误原因


- 应用举例 ：加载图片；AJAX转Promise对象
  
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
- 形式：调用Generator函数(该函数不执行)返回指向内部状态的指针对象(不是运行结果)。声明：`function* Func() {}`
- 方法
  next()：使指针移向下一个状态，返回{ done, value }(入参会被当作上一个yield命令表达式的返回值)
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









