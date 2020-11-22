**this 就是一个指针，指向调用函数的对象**
this的绑定规则：
默认绑定
隐式绑定
硬绑定
new绑定

**1. 如何准确判断this指向的是什么？**

     函数是否在new中调用(new绑定)，如果是，那么this绑定的是新创建的对象。
     函数是否通过call,apply调用，或者使用了bind(即硬绑定)，如果是，那么this绑定的就是指定的对象。
     函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.foo()
     如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到undefined，否则绑定到全局对象。
     如果把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。
     如果是箭头函数，箭头函数的this继承的是外层代码块的this。

1. 默认绑定：在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。
   ```
   function sayHi(){
    console.log('Hello,', this.name);
   }
   var name = 'YvetteLau';
   sayHi();
   ```
   this指向全局对象（非严格模式下），严格模式下，this指向undefined.
    如果在浏览器环境中运行，那么结果就是 Hello,YvetteLau.
    但是如果在node环境中运行，结果就是 Hello,undefined.这是因为node中name并不是挂在全局对象上的。
------    
2. 隐式绑定：函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的形式为 XXX.fun().
   ```
   function sayHi(){
    console.log('Hello,', this.name);
   }
   var person = {
       name: 'YvetteLau',
       sayHi: sayHi
   }
   var name = 'Wiliam';
   person.sayHi();
   ```
    调用sayHi时,调用位置会使用person的上下文来引用函数，隐式绑定会把函数调用中的this(即此例sayHi函数中的this)绑定到这个上下文对象（即此例中的person）
   **需要注意的是：对象属性链中只有最后一层会影响到调用位置。**
    ```
    function sayHi(){
     console.log('Hello,', this.name);
    }
    var person2 = {
        name: 'Christina',
        sayHi: sayHi
    }
    var person1 = {
        name: 'YvetteLau',
        friend: person2
    }
    person1.friend.sayHi();
    结果是：Hello, Christina.
    ```
    **隐式绑定有一个大陷阱，绑定很容易丢失**
    ```
    function sayHi(){
      console.log('Hello,', this.name);
    }
    var person = {
        name: 'YvetteLau',
        sayHi: sayHi
    }
    var name = 'Wiliam';
    var Hi = person.sayHi;
    Hi();
    结果是: Hello,Wiliam.
    Hi直接指向了sayHi的引用，在调用的时候，跟person没有半毛钱的关系
    ```
    -----
    ```
    function sayHi(){
      console.log('Hello,', this.name);
    }
    var person1 = {
        name: 'YvetteLau',
        sayHi: function(){
            setTimeout(function(){
                console.log('Hello,',this.name);
            })
        }
    }
    var person2 = {
        name: 'Christina',
        sayHi: sayHi
    }
    var name='Wiliam';
    person1.sayHi();
    setTimeout(person2.sayHi,100);
    setTimeout(function(){
        person2.sayHi();
    },200);
    结果：
    Hello, Wiliam
    Hello, Wiliam
    Hello, Christina
    第一条输出很容易理解，setTimeout的回调函数中，this使用的是默认绑定，非严格模式下，执行的是全局对象
    第二条输出可以这样理解: setTimeout(fn,delay){ fn(); },相当于是将person2.sayHi赋值给了一个变量，最后执行了变量，这个时候，sayHi中的this显然和person2就没有关系了
    第三条虽然也是在setTimeout的回调中，但是我们可以看出，这是执行的是person2.sayHi()使用的是隐式绑定，因此这是this指向的是person2，跟当前的作用域没有任何关系
    ```

------
3. 显示绑定(硬绑定)：通过call,apply,bind的方式，显式的指定this所指向的对象。
   call,apply和bind的第一个参数，就是对应函数的this所指向的对象。call和apply的作用一样，只是传参方式不同。call和apply都会执行对应的函数，而bind方法不会。
    ```
    function sayHi(){
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'YvetteLau',
        sayHi: sayHi
    }
    var name = 'Wiliam';
    var Hi = function(fn) {
        fn();
    }
    Hi.call(person, person.sayHi); 
    输出的结果是 Hello, Wiliam. 原因很简单，Hi.call(person, person.sayHi)的确是将this绑定到Hi中的this了。但是在执行fn的时候，相当于直接调用了sayHi方法(记住: person.sayHi已经被赋值给fn了，隐式绑定也丢了)，没有指定this的值，对应的是默认绑定。
    function sayHi(){
      console.log('Hello,', this.name);
    }
    var person = {
        name: 'YvetteLau',
        sayHi: sayHi
    }
    var name = 'Wiliam';
    var Hi = function(fn) {
        fn.call(this);
    }
    Hi.call(person, person.sayHi);
    输出的结果为: Hello, YvetteLau.因为person被绑定到Hi函数中的this上，fn又将这个对象绑定给了sayHi的函数。这时，sayHi中的this指向的就是person对象。
    ```

------
4. new绑定
   ```
   function sayHi(name){
    this.name = name;	
   }
   var Hi = new sayHi('Yevtte');
   console.log('Hello,', Hi.name);

   ```
---------------------------------
**这四种绑定的优先级为:new绑定 > 显式绑定 > 隐式绑定 > 默认绑定**   

**绑定例外：**如果我们将null或者是undefined作为this的绑定对象传入call、apply或者是bind,这些值在调用时会被忽略，实际应用的是默认绑定规则。
```
var foo = {
    name: 'Selina'
}
var name = 'Chirs';
function bar() {
    console.log(this.name);
}
bar.call(null); //Chirs 
```
**箭头函数：箭头函数没有自己的this，它的this继承于外层代码库中的this。**箭头函数在使用时，需要注意以下几点:
（1）函数体内的this对象，函数体内的this是定义时所在的对象而不是使用时所在的对象。
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
（5）箭头函数没有自己的this，所以不能用call()、apply()、bind()这些方法去改变this的指向.
  ```
  var obj = {
    hi: function(){
        console.log(this);
        return ()=>{
            console.log(this);
        }
    },
    sayHi: function(){
        return function() {
            console.log(this);
            return ()=>{
                console.log(this);
            }
        }
    },
    s:this,
    say: ()=>{
        console.log(this);
    }
   }
   let hi = obj.hi();  //输出obj对象
   hi();               //输出obj对象
   let sayHi = obj.sayHi();
   let fun1 = sayHi(); //输出window
   fun1();             //输出window
   obj.say();          //输出window

  ```
分析：
 1. obj.hi(); 对应了this的隐式绑定规则，this绑定在obj上，所以输出obj，很好理解。
 2. hi(); 这一步执行的就是箭头函数，箭头函数继承上一个代码库的this，刚刚我们得出上一层的this是obj，显然这里的this就是obj.
 3. 执行sayHi();这一步也很好理解，我们前面说过这种隐式绑定丢失的情况，这个时候this执行的是默认绑定，this指向的是全局对象window.
 4. fun1(); 这一步执行的是箭头函数，如果按照之前的理解，this指向的是箭头函数定义时所在的对象，那么这儿显然是说不通。OK，按照箭头函数的this是继承于外层代码库的this就很好理解了。外层代码库我们刚刚分析了，this指向的是window，因此这儿的输出结果是window
 5. obj.say(); 执行的是箭头函数，当前的代码块obj中是不存在this的，只能往上找，就找到了全局的this，指向的是window.
    
         定义
         ```
         var obj={a:this};
         obj.a结果为window，所以obj.say()的this指向的是window。
         ```
         属性里边对应的函数的this指向obj，但是对象本身以及属性的this是指向window的。
    ```
    var obj = {
        hi: function(){
            console.log(this);
            return ()=>{
                console.log(this);
            }
        },
        sayHi: function(){
            return function() {
                console.log(this);
                return ()=>{
                    console.log(this);
                }
            }
        },
        say: ()=>{
            console.log(this);
        }
    }
    let sayHi = obj.sayHi();
    let fun1 = sayHi(); //输出window
    fun1();             //输出window
    
    let fun2 = sayHi.bind(obj)();//输出obj
    fun2();                      //输出obj
    ```