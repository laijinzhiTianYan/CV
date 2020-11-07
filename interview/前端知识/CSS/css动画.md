![浏览器解析和CSS（GPU）动画优化](https://segmentfault.com/a/1190000008015671)
- 在从服务器中拿到数据后，浏览器会先做解析三类东西：
  - 解析html,xhtml,svg这三类文档，形成dom树。
  - 解析css，产生css rule tree。
  - 解析js，js会通过api来操作dom tree和css rule tree。
- 解析完成之后，浏览器引擎会通过dom tree和css rule tree来构建rendering tree：
  - rendering tree和dom tree并不完全相同，例如：<head></head>或display:none的东西就不会放在渲染树中。
  - css rule tree主要是完成匹配，并把css rule附加给rendering tree的每个element。
- 在渲染树构建完成后，
  - 浏览器会对这些元素进行定位和布局，这一步也叫做reflow或者layout。
  - 浏览器绘制这些元素的样式，颜色，背景，大小及边框等，这一步也叫做repaint。
  - 然后浏览器会将各层的信息发送给GPU，GPU会将各层合成；显示在屏幕上
  
reflow和repaint都是耗费浏览器性能的操作，这两者尤以reflow为甚；因为每次reflow，浏览器都要重新计算每个元素的形状和位置。
**一些针对reflow和repaint的最佳实践：**
- 不要一条一条地修改dom的样式，尽量使用className一次修改。
- 将dom离线后修改
    - 使用documentFragment对象在内存里操作dom。
    - 先把dom节点display:none;（会触发一次reflow）。然后做大量的修改后，再把它显示出来。
    - clone一个dom节点在内存里，修改之后；与在线的节点相替换。
- 不要使用table布局，一个小改动会造成整个table的重新布局。
- **transform和opacity只会引起合成，不会引起布局和重绘。**

- 为了仅发生composite，我们做动画的css property必须满足以下三个条件：
1. 不影响文档流。
2. 不依赖文档流。
3. 不会造成重绘。
满足以上以上条件的css property只有transform和opacity。

```
@keyframes move {
 from { transform: translateX(0); }
 to { transform: translateX(70px); }
}
```
- **用css动画而不是js动画**
css动画有一个重要的特性，它是完全工作在GPU上。因为你声明了一个动画如何开始和如何结束，浏览器会在动画开始前准备好所有需要的指令；并把它们发送给GPU。而如果使用js动画，浏览器必须计算每一帧的状态；为了保证平滑的动画，我们必须在浏览器主线程计算新状态；把它们发送给GPU至少60次每秒。除了计算和发送数据比css动画要慢，主线程的负载也会影响动画； 当主线程的计算任务过多时，会造成动画的延迟、卡顿。

所以尽可能地使用基于css的动画，不仅仅更快；也不会被大量的js计算所阻塞。

- CSS动画优化技巧总结
1. 减少浏览器的重排和重绘的发生。
2. 不要使用table布局。
3. css动画中尽量只使用transform和opacity，这不会发生重排和重绘。
4. 尽可能地只使用css做动画。
5. 避免浏览器的隐式合成。
6. 改变复合层的尺寸。















