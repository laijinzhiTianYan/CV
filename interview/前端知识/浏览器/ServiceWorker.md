### ServiceWorker
可以把 Service Worker 理解为一个介于客户端和服务器之间的一个代理服务器。
在 Service Worker 中我们可以做很多事情，比如拦截客户端的请求、向客户端发送消息、向服务器发起请求等等，其中最重要的作用之一就是**离线资源缓存**。

- ServiceWoker与WebWorker的异同点：
    相同点：
    1. Service Worker 工作在 worker context 中，是没有访问 DOM 的权限的，所以我们无法在 Service Worker 中获取 DOM 节点，也无法在其中操作 DOM 元素；
    2. 可以通过 postMessage 接口把数据传递给其他 JS 文件；
    3. Service Worker 中运行的代码不会被阻塞，也不会阻塞其他页面的 JS 文件中的代码；
   不同点：
    1. Service Worker 是一个浏览器中的进程而不是浏览器内核下的线程，因此它在被注册安装之后，能够被在多个页面中使用，也不会因为页面的关闭而被销毁。
    2. 出于对安全问题的考虑，Service Worker 只能被使用在 https 或者本地的 localhost 环境下。

***静态资源缓存***


