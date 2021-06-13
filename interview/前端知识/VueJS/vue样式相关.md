1. class绑定
    数组形式：`<div v-bind:class="[first,second]"></div>`   
    对象形式：`{ 'my-class':shouldAddClass }`
    ![绑定计算属性样式](images/2021-04-02-23-12-09.png)
    混合使用：
    ![](images/2021-04-02-23-15-13.png)
2. 内联样式绑定
   `<div v-bind:style="{fontWeight:'bold',color:'red'}"></div>`
   `<div :style="[baseStyle,moreStyles]"></div>`
   多重值：
   `<div :style="{display:['-webkit-box','-ms-flexbox-','flex']}"></div>`
3. 与JavaScript不同，组件中的CSS不仅会影响自身，还会影响到页面上所有的HTML元素。Vue有一种方式可以修复这个问题：scoped CSS。如果我们在style标签上添加了scoped特性，Vue就会自动处理关联的CSS与HTML，使编写的CSS只影响到该组件中的HTML.
   正如我现在所遇到的，为什么我在一个vue文件写的样式，无需导入，在其他文件也可以使用，就是因为有共同的父组件。
   ![vue-loader实现css modules](images/2021-04-02-23-26-08.png)
   ![css预处理器的使用](images/2021-04-02-23-27-30.png)
4. vue中的render()与jsx
   安装了babel插件后，render函数与react无异
   ![](images/2021-04-02-23-35-24.png)
   ![](images/2021-04-02-23-36-06.png)
   ![](images/2021-04-02-23-36-55.png)