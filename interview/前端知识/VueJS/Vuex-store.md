**vuex可以满足复杂应用中多个组件进行状态共享的需求。**
1. state及其辅助函数
   state表示数据在vuex中的存储状态，它就像一个在应用的任何角落都能访问到的庞大对象——是的，它就是单一数据源（single source of truth）。
   ![存储了一个数字的store](images/2021-04-03-09-37-37.png)
   辅助函数mapState，它返回一个被用作计算属性的函数对象。
    ![mapState数组](images/2021-04-03-09-37-56.png)
    ![mapState对象](images/2021-04-03-09-40-09.png)
    ![扩展运算符](images/2021-04-03-09-41-22.png)
2. getter及其辅助函数
   数组写法：computed:mapGetters(['unread','unreadFrom'])
   ![对象写法](images/2021-04-03-09-47-48.png)
3. mutation：修改state对象的值
   mutation是一个函数，它对state进行同步变更，通过调用store.commit()并传入mutation名称的方式来达成。
   使用方式：
   ![store](images/2021-04-03-09-50-11.png)
    ![component](images/2021-04-03-09-50-31.png)

    mutation辅助函数：
    数组写法：methods：mapMutations(['addMessage'])
    ![对象写法](images/2021-04-03-09-54-41.png)

    >> **Mutation必须是同步函数**,mutation只能实现同步变更state对象。如果需要实现异步变更，那么应该使用action。
4. action:异步变更
   ![store](images/2021-04-03-10-15-40.png)
   context对象即等于vuex的store——或者说是当前的vuex模块。通过context对象，可以访问到state（即它的state属性），不过不能直接修改它——还是得通过提交mutation来变更。
   ![组件中](images/2021-04-03-10-16-42.png)
   ![action辅助函数](images/2021-04-03-10-17-42.png)
5. promise与action
   action是异步函数，我们怎么知道它们已经完成了呢？可以观察计算属性的改变，但这不够理想。   
   其实可以在action中返回一个promise对象来代替上述做法。另外，调用dispatch也会返回一个promise对象，运用它就可以在action运行结束时去运行其他代码。  
   ![action返回promise](images/2021-04-03-10-23-51.png)
   ![](images/2021-04-03-10-26-19.png)
6. vuex，可以将store拆分到各个模块
   每个module都只是一个对象，并且拥有其自身的state、getter、mutation以及action，通过使用modules属性即可将它们添加到store当中。
7. vue-test-utils单元测试
   注意.find()仅返回第一个满足选择器规则的元素节点。如果希望得到多个，请使用.findAll()。它会返回一个WrapperArray对象，而不是Wrapper，但是它具有类似的方法，不过需要使用.at()方法来返回WrapperArray中指定索引的目标元素节点。
   ![挂载HTTP请求](images/2021-04-03-10-45-00.png)
   ![挂载slots](images/2021-04-03-10-45-58.png)