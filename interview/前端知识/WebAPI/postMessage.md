- postMessage是html5引入的API,postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,可以实现跨文本文档,多窗口,跨域消息传递.多用于窗口间数据通信,这也使它成为跨域通信的一种有效的解决方案.
- 场景一 跨域通信(包括GET请求和POST请求)

  >我们都知道JSONP可以实现解决GET请求的跨域问题,但是不能解决POST请求的跨域问题.而postMessage都可以.这里只是列举一个示例,仅供参考,具体的代码如何编写要以具体的场景而定奥~

- 场景二 WebWorker
  JavaScript语言采用的是单线程模型,通常来说,所有任务都在一个线程上完成,一次只能做一件事,后面的任务要等到前面的任务被执行完成后才可以开始执行,但是这种方法如果遇到复杂费时的计算,就会导致发生阻塞,严重阻碍应用程序的正常运行.Web Worker为web内容在后台线程中运行脚本提供了一种简单的方法,线程可以执行任务而不干扰用户界面.一旦创建,一个worker可以将消息发送到创建它的JavaScript代码,通过消息发布到改代码指定的事件处理程序.

  一个woker是使用一个构造函数创建一个对象,运行一个命名的JavaScript文件-这个文件将包含在工作线程中运行的代码,woker运行在另一个全局上下文中,不同于当前的window,不能使用window来获取全局属性.

  >**一些局限性**

    - 只能加载同源脚本文件,不能直接操作DOM节点

    - Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求

    - 无法读取本地文件,只能加载网络文件

    - 也不能使用window对象的默认方法和属性,然而你可以使用大量window对象之下的东西,包括webSocket,indexedDB以及FireFoxOS专用的D阿塔Store API等数据存储机制.查看Functions and classes available to workers获取详情。

    - workers和主线程间的数据传递通过这样的消息机制进行——双方都使用postMessage()方法发送各自的消息，使用onmessage事件处理函数来响应消息（消息被包含在Message事件的data属性中）。这个过程中数据并不是被共享而是被复制;woker分为专用worker和共享worker,一个专用worker仅能被首次生成它的脚本使用,而共享woker可以同时被多个脚本使用.
  
  Web Worker的使用场景,用于收集埋点数据,可以用于大量复杂的数据计算,复杂的图像处理,大数据的处理.因为它不会阻碍主线程的正常执行和页面UI的渲染.
  埋点数据采集下的使用: 可在main.js中收集数据,将收集到的信息通过postMessage的方式发送给worker.js,在woker.js中进行相关运算和整理并发送到服务器端;

- 场景三  Service Worker
  Service Worker是web应用做离线存储的一个最佳的解决方案,Service Worker和Web Worker的相同点是在常规的js引擎线程以外开辟了新的js线程去处理一些不适合在主线程上处理的业务,不同点主要包括以下几点:

  - Web Worker式服务于特定页面的,而Service Worker在被注册安装之后能够在多个页面使用

  - Service Worker常驻在浏览器中,不会因为页面的关闭而被销毁.本质上,它是一个后台线程,只有你主动终结,或者浏览器回收,这个线程才会结束.

  - 生命周期,可调用的API也不同

  我们可以使用Service Worker来进行缓存,用js来拦截浏览器的http请求,并设置缓存的文件,从而创建离线web应用.

