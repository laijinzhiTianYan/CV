- 内置函数(原生函数)
    String
    Number
    Boolean
    Object
    Function
    Array
    Date
    RegExp
    Error
    Symbol
    Object.prototype == [].__proto__ // false
    Object.prototype == {}.__proto__ // true
    Array.prototype == [].__proto__ // true
    Array.prototype == {}.__proto__ // false
- cookie localstorage sessionstorage
浏览器的cookie，localStorage,sessionStorage区别
localStorage,sessionStorage,cookies都是客户端存储的解决方案

1、localStorage和sessionStorage的声明周期
localStorage和sessionStorage都是用来存储客户端临时信息对象，他们只能存储字符串类型的对象，所以我们想要存储其它类型的数据，不得不需要自手动的进行编码和解码，规范中可以存储其它原生类型的对象，目前没有浏览器对其实现。

sessionStorage生命周期为当前窗口或标签页面，它仅仅适用于浏览器会话的持续时间，换句话说当标签或

者窗口关闭的时候，sessionStorage将会被删除。通过sessionStorage存储的数据也就被清空了。

localStorage生命周期为永久有效，除非自己清除了localStorage的内容，不然localStorage存储的信息将永久存在。

**2、localStorage和session的共享性**
对于不同的浏览器来说，无法共享localStorage或sessionStorage中的信息。

相同浏览器的不同页面间可以共享相同localStorage，前提是页面属于相同的域名和端口（其作用域限定在文档源级别（只要URL的协议、端口、主机名三者中有一个不同，就属于不同的文档源））。

不同的页面或者标签方无法共享sessionStorage的信息，这里需要注意的是，页面及标签页仅仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。（也就是说如果关闭标签页后，通过sessionStorage存储的数据就都被删除了。sessionStorage的作用域不仅被限制在文档源，还被限定在窗口中，也就是同一标签页中。注意，这里说的窗口是指顶级窗口，若果同一标签页中包含多个<iframe>元素，这两者之间也是可以共享sessionStorage的。

3、cookie
 cookie的主要内容包括：名字、值、过期时间、路径和域。路径与域一起构成cookie的作用范围。若不设置时间，则表示这个cookie的生命周期为浏览器会话期间，关闭浏览器窗口，cookie就会消失。这种生命周期为浏览器会话期的cookie被称之会话cookie。
 会话cookie一般不存储在硬盘而是保存在内存里，当然这个行为并不是规范规定的。若设置了过期时间，浏览
器就会把cookie保存到硬盘上关闭后再打开浏览器这些cookie仍然有效直到超过设定的过期时间。对于保存在内存
里的cookie，不同的浏览器有不同的处理方式。

4、sessionStorage、localStorage、cookie的区别

 共同点：

都是保存在浏览器端，并且是同源的（URL的协议、端口、主机名是相同的，只要有一个不同就属于不同源）

 不同点：

 1、cookie数据始终在同源的http请求中携带（即使不需要）（浏览器自动添加到请求头上），即cookie在浏览器和服务器间来回传递，而sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。

 2、存储大小限制也不同，cookie数据不能超过4K，同时因为每次http请求都会携带cookie、所以cookie只适合

保存很小的数据，如会话标识。sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以

达到5M或更大

 3、数据有效期不同，sessionStorage仅仅在当前浏览器窗口关闭之前有效；localStorage始终有效，窗口或者

浏览器关闭之后也一直保存，因此作用持久数据；cookie，只在设置cookie过期时间之前有效，即使窗口关闭或者浏

览器关闭。

 4、作用域不同：sessionStorage在不同的浏览器窗口中不共享，即使是同一个页面，localStorage在所有的同源窗

口中是共享的（不同浏览器不共享），cookie也是在所有同源的窗口中共享的（不同浏览器也共享）。

 5、web Storage支持事件通知机制，可以将数据更新的通知发送给监听者。

 6、web Storage的api接口使用更方便