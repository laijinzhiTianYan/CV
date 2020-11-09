1. MVVM
   ViewModel负责把Model的数据同步到View显示出来，还负责把View的修改同步回Model;View 和 Model 之间的同步工作完全是自动的，无需人为干涉（由viewModel完成，在这里指VUE）.所以开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题， 复杂的数据状态维护完全由 MVVM 来统一管理，节省了很多精力。
   ![mvvm](https://github.com/woai3c/mini-vue/raw/master/imgs/mvvm.jpg)
2. Vue的数据双向绑定都是依据Object.defineProperty()这一方法来做的.
    ```
    Object.defineProperty(obj, prop, descriptor)
    obj
    要在其上定义属性的对象。  
    prop
    要定义或修改的属性的名称。  
    descriptor
    将被定义或修改的属性描述符。

    Object.defineProperty(obj, 'a', {
    get : function(){
      return val
    },
    set : function(newValue){
      val = newValue
    },
    enumerable : true,
    configurable : true
    })
    ```
    只要在读取值时收集观察者 在赋值时触发观察者更新函数 就可以实现数据变更 从而实现DOM重新渲染.
3. vuex原理:vuex能实现所有的组件共享同一份数据
    因为vuex生成了一个store实例，并且把这个实例挂在了所有的组件上，所有的组件引用的都是同一个store实例。store实例上有数据，有方法，方法改变的都是store实例上的数据。由于其他组件引用的是同样的实例，所以一个组件改变了store上的数据， 导致另一个组件上的数据也会改变，就像是一个对象的引用。
4. vue实现页面的权限控制
    利用 vue-router 的 beforeEach 事件，可以在跳转页面前判断用户的权限（利用 cookie 或 token），是否能够进入此页面，如果不能则提示错误或重定向到其他页面，在后台管理系统中这种场景经常能遇到。
5. keep-alive
    在 Vue 中，每次切换组件时，都会重新渲染。如果有多个组件切换，又想让它们保持原来的状态，避免重新渲染，这个时候就可以使用 keep-alive。 keep-alive 可以使被包含的组件保留状态，或避免重新渲染。
6. 计算属性:当其依赖的属性的值发生变化的时，计算属性会重新计算。反之则使用缓存中的属性值。
7. watch：监听某个数据值的变化，它和计算属性很相似。
   - 借助 watch 还可以做一些特别的事情，例如监听页面路由，当页面跳转时，我们可以做相应的权限控制，拒绝没有权限的用户访问页面。
   - watch 与计算属性的区别有两个：一是计算属性依赖其他属性和有缓存，它没有；二是 watch 可以进行异步操作。
   - 为什么计算属性不能进行异步操作：因为计算属性必须将计算后的值 return 回去，如果在计算属性中使用异步操作，那会返回一个 undefined。
   ```
   computed: {
    test() {
        let value
        setTimeout(() => value = 10)
        return value
      }
    }
    就像上述代码，还没等异步操作完成就已经执行 return value 了。 
    如果把 test() 改成 async test() 再结合 await 来进行异步操作呢？     
        async test() {
            let value = 1
            value = await new Promise(r => r(10))
            return value
        }
    也不行，因为 async() 返回的是一个 Promise。
    ```

8. $route和$router的区别
    $route 是路由信息对象，包括path，params，hash，query，fullPath，matched，name 等路由信息参数。
    而 $router 是路由实例对象，包括了路由的跳转方法，钩子函数等
9.  vue-loader:是解析 .vue 文件的一个加载器，将 template/js/style 转换成 js 模块。
    用途：js 可以写 es6、style 样式可以 scss 或 less；template 可以加 jade 等。
10. 假设定义了一个数组a=[1,2,3]，相应的，页面上显示的值为1,2,3，现设a[0]=5，页面上的值会变成5,2,3吗？为什么？
     answer:不会。因为 Vue 是使用 Object.defineProperty 来监听数值变化的，而直接修改数组的值的这种操作无法监听。
     例如：vm.items[indexOfItem] = newValue 这种操作是无法监听的。虽然数组值已经更改，但是不会触发视图更新
     如果需要直接修改数组元素的值，可以使用 Vue.set
     Vue.set(vm.items, indexOfItem, newValue)
     如果是json数组 这么修改
     Vue.set(this.items, 0, {message:"Change Test",id:'10'})

    <U>开发过程遇到的情况：</U>当vue的data里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，向数组对象中添加新的属性，如果直接更新此属性的值，是不会更新视图的。
    官方定义：**如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。**
    受现代 JavaScript 的限制 (以及废弃 Object.observe)，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。



