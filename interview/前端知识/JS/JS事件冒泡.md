**事件冒泡**
- 01、 什么是事件冒泡

当一个元素接收到事件的时候，会把接收到事件传递给自己的父级（这里的传递仅仅是事件的传递，并不传递所绑定的事件。所以如果父级没有绑定事件函数，就算传递了事件，也不会有什么表现。但是事件确实传递了）

- 02、阻止冒泡

标准的W3C方式：e.stopPropagation()    这里的stopPropagation是标准的事件对象的一个方法，直接调用即可。
非标准的IE方式：window.event.cancelBubble=true   这里的cancelBubble是IE事件对象的属性，设为true即可

- 03.冒泡的优点：事件委托

- 04 冒泡实现举例
  
```
    <ul id="ulf">
      <li>11</li>
      <li>22</li>
      <li>33</li>
      <li>44</li>
    </ul>
```

```
    window.onload=function(){
        var ulf = document.getElementById('ulf');
        ulf.onclick=function(e){
            var target=e.target
            var currentTarget=e.currentTarget;
            console.log(target.innerHTML); //点击li，就是li
            console.log(currentTarget); //ul
        }
    }
```