## window.requestAnimationFrame
浏览器(所以只能在浏览器中使用)专门为动画提供的 API，让 DOM 动画、Canvas 动画、SVG 动画、WebGL 动画等有一个统一的刷新机制

作用：
- 按帧对网页进行重绘。该方法告诉浏览器希望执行动画并请求浏览器在下一次重绘之前调用回调函数来更新动画。确保在每一帧开始执行动画。
- 由系统来决定回调函数的执行时机，在运行时浏览器会自动优化方法的调用。

**优点：**
requestAnimationFrame采用系统时间间隔，保持最佳绘制效率。不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间过长，使动画卡顿。

**1. 提升性能，防止掉帧**
> - 浏览器 UI 线程：浏览器让执行 JavaScript 和更新用户界面（包括重绘和回流）共用同一个单线程，称为“浏览器 UI 线程”
> - 浏览器 UI 线程的工作基于一个简单的队列系统，任务会被保存到队列中直到进程空闲。一旦空闲，队列中的下一个任务就被重新提取出来并运行。这些任务要么是运行 JavaScript 代码，要么执行 UI 更新

setTimeout掉帧：
![](https://user-gold-cdn.xitu.io/2019/3/5/1694cac2cf97812b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
**2. 节约资源，节省电源**
使用requestAnimationFrame，当页面处于未激活的状态下，该页面的屏幕刷新任务会被系统暂停，由于requestAnimationFrame保持和屏幕刷新同步执行，所以也会被暂停。当页面被激活时，动画从上次停留的地方继续执行，节约 CPU 开销。

**3. 函数节流**
- 一个刷新间隔内函数执行多次时没有意义的，因为显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来
- 在高频事件（resize，scroll等）中，使用requestAnimationFrame可以防止在一个刷新间隔内发生多次函数执行，这样保证了流畅性，也节省了函数执行的开销
- 某些情况下可以直接使用requestAnimationFrame替代 Throttle 函数，都是限制回调函数执行的频率

**应用：**
```
function loadingBar(ele){
    // 使用闭包保存定时器的编号
    let handle;
    return ()={
        //每次触发将进度清空
        ele.style.width="0";
        //开始动画前清除上一次的动画定时器
        // 否则会开启多个定时器
        cancelAnimationFrame(handle);
        //回调函数
        let _progress=()=>{
            let eleWidth=parseInt(ele.style.width);
            if(eleWidth<200){
                ele.style.width=`${eleWidth+5}px`;
                handle=requestAniamtionFrame(_progress);
            }
            else{
                cancelAnimationFrame(handle);
            }
        };
        handle=requestAnimationFrame(_progress);
    };
}
```
缓动动画：指定动画效果在执行时的速度，使其看起来更加真实
```
function moveBox(ele,change,duration){
    let handle;
    // 返回动画函数
    return ()=>{
        //开始时间
        let startTime=performance.now();
        cancelAnimationFrame(handle);
        // 回调函数
        function _animation(){
            //这一帧开始的时间
            let current=performance.now();
            let eleTop=ele.offsetLeft;
            // 这一帧内元素移动的距离
            let left=change*easeInOutCubic((current-startTime)/duration);
            ele.style.left=`${~~left}px`;
            // 判断动画是否执行完
            if((current-startTime)/duration<1){
                handle=requestAnimationFrame(_animation);
            }
            else{
                cancelAnimationFrame(handle);
            }
        }
        handle=requestAnimationFrame(_animation);
    }
}
function easeInOutCubic(k) {
  return (k *= 2) < 1 ? 0.5 * k * k * k : 0.5 * ((k -= 2) * k * k + 2);
}
```

**缓动效果原理公式：用于表述时间进度和移动进度的关系。**
>function linear(time, begin, change, duration) {
    return change * (time / duration) + begin;
}
可以拆分成两个函数：
>>function factor(time, duration) {
    return time/duration;
}
>>function progress(time, begin, end, duration) {
    return begin + (end - begin) * factor(time, duration);
}

在linear特效中，系数的产生是线性的:time / duration。如果我们把系数公式改为Math.pow(time / duration, 2)，而progress函数不变。
![](https://pic3.zhimg.com/80/v2-e12917881a1318f89186a786bfa3971a_720w.png)
我们可以继续把系数公式抽象，继续改变Math.pow(time / duration, 2)中的平方系数2，改为3、4甚至5。

**常见的是通过贝塞尔曲线来指定缓动效果**
transition-timing-function: cubic-bezier(P1.x, P1.y, P2.x, P2.y);













