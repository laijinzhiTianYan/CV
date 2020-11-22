- Flex 主要用于一维布局，而 Grid 则用于二维布局。
**display:flex**
flex容器中存在两条轴， 横轴和纵轴， 容器中的每个单元称为flex item。

Flex Container属性
在容器上可以设置6个属性：
flex-direction: column-reverse | column | row | row-reverse .属性决定主轴的方向（即项目的排列方向）
![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png)
flex-wrap:nowrap | wrap | wrap-reverse;默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
![wrap:换行，第一行在上方](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg)
![wrap-reverse:换行，第一行在下方](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg)
flex-flow:flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap.
justify-content:flex-start | flex-end | center | space-between | space-around;属性定义了项目在主轴上的对齐方式。
align-items:flex-start | flex-end | center | baseline | stretch;定义项目在交叉轴上如何对齐。
*baseline子项目的第一行文字的基线对齐*
align-content:flex-start | flex-end | center | space-between | space-around | stretch;定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

**注意：当设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。**

Flex 项目属性
有六种属性可运用在 item 项目上:
order：定义项目的排列顺序。数值越小，排列越靠前，默认为0。
建议使用**flex：flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。**
flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。
flex-basis：定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
align-self：auto | flex-start | flex-end | center | baseline | stretch;允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

- min-width
  1、正常情况下：

    width :给块级元素/行内块 元素设置固定的宽度，或者固定百分比的宽度。

    min-width:  当盒子内部元素宽度小于 min-width的值时，盒子宽度为 min-width的值，当盒子内容宽度大于 min-width的值时，盒子随着内容的增加而被撑大，没有上上限，但是 盒子宽度的最小值是 设置的 min-width 的值。

  2、在父元素已经设置为 display: flex; 弹性布局时：
  width:  
     a、当父元素的width 大于子元素的width的前提下： 给子元素设置多大的width,该子元素的宽度变就是多大
     b、当父元素的宽度小于子元素的width 时： 给子元素设置的宽度将会按照该子元素在所有子元素宽度和所占的百分比，这个百分比，就是子元素占父元素宽度的百分比，计算公式：
                子元素宽度 = （该子元素宽度 / 所有子元素宽度和） * 父元素宽度
  min-width: 
    a、当子元素宽度和小于父元素：...该元素的内容小于 min-width的数值时，该元素的宽度为 min-width设置的值。
                               ...该元素的内容大于 min-width的数值时，该元素的宽度被撑大，值为其内容的宽度。
    b、当子元素的宽度大于父元素的宽度： 子元素的宽度最小值为设置的值，随着内部内容宽度的增加而增大。父元素会出现滚动条。

- 已知父级盒子的宽高，子级img宽高未知，想让img铺满父级盒子且图片不能变形
  **css的object-fit属性**
  ```
  div {
    width: 200px;
    height: 200px;
  }
  img {
      object-fit: cover;
      width: 100%;
      height: 100%;
  }
  ```
  .fill { object-fit: fill; }
  .contain { object-fit: contain; }
  .cover { object-fit: cover; }
  .none { object-fit: none; }
  .scale-down { object-fit: scale-down; }
  fill: 中文释义“填充”。默认值。替换内容拉伸填满整个content box, 不保证保持原有的比例。
  contain: 中文释义“包含”。保持原有尺寸比例。保证替换内容尺寸一定可以在容器里面放得下。因此，此参数可能会在容器内留下空白。
  cover: 中文释义“覆盖”。保持原有尺寸比例。保证替换内容尺寸一定大于容器尺寸，宽度和高度至少有一个和容器一致。因此，此参数可能会让替换  内容（如图片）部分区域不可见。
  none: 中文释义“无”。保持原有尺寸比例。同时保持替换内容原始尺寸大小。
  scale-down: 中文释义“降低”。就好像依次设置了none或contain, 最终呈现的是尺寸比较小的那个

- 去除inline-block元素间间距的方法
   - 移除空格
  ```
    <div class="space">
    <a href="##">
    惆怅</a><a href="##">
    淡定</a><a href="##">
    热血</a>
    </div>
    <div class="space">
    <a href="##">惆怅</a
    ><a href="##">淡定</a
    ><a href="##">热血</a>
    </div>
    <div class="space">
    <a href="##">惆怅</a><!--
    --><a href="##">淡定</a><!--
    --><a href="##">热血</a>
   </div>
   ```
   - 使用margin负值
   - 使用font-size:0
   - letter-spacing
    ```
    .space {
    letter-spacing: -3px;
    }
    .space a {
        letter-spacing: 0;
    }
    ```
   - word-spacing
    ```
    .space {
    word-spacing: -6px;
    }
    .space a {
        word-spacing: 0;
    }
    ```

- margin合并
  ```
  <div class="top">我在上面</div>
  <div class="bottom">我在下面</div>

  .top{
    width: 100px;
    height: 100px;
    background: red;
    margin-bottom: 100px;
  } 
  .bottom{
    width: 100px;
    height: 100px;
    background: green;
    margin-top: 100px;
  }
  /*理论上我们看到的应该是两个div上下相隔200px,但其实是取较大的那个*/
  ```
  所以，***兄弟结构水平方向的margin正常，但是垂直方向上面的margin会合并，并且这里的取到的是较大的一个*

- margin 塌陷
父子嵌套元素在垂直方向的 margin, 父子元素是结合在一起的, 他们两个的 margin 会取其中最大的值。

```
<div class="box">
    <div class="wrapper">
        <div class="content"></div>
    </div>
</div>

.box{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
}
.wrapper {
    width: 100px;
    height: 100px;
    background: #000;
    margin-top: 50px;
    margin-left: 50px;
}
.content {
    margin-left: 100px;
    /*margin-top: 100px;*/  注释掉这句后，一切是正常可以理解的。打开后，就会出现margin塌陷的问题。
    width: 50px;
    height: 50px;
    background: orange;
}
```

**解决方法——触发 BFC**
BFC: block format context - 块级格式化上下文，每一个盒子当中都有一套正常的渲染规则，但是我们可以通过一些语法，来触发bfc，让这个盒子的渲染规则不一样！ 就是这个渲染规则的改变，刚好就解决了margin塌陷的问题，
具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
![BFC原理](https://zhuanlan.zhihu.com/p/25321647)
**BFC特性：**
1. 同一个 BFC 下垂直方向外边距会发生折叠。如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。
2. BFC 可以包含浮动的元素（清除浮动）
3. BFC 可以阻止元素被浮动元素覆盖
**BFC的约束规则**
1. 内部的Box会在垂直方向上一个接一个的放置
2. 垂直方向上的距离由margin决定。（完整的说法是：属于同一个BFC的两个相邻Box的margin会发生重叠（塌陷），与方向无关。）
3. 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界）
4. BFC的区域不会与float的元素区域重叠
5. 计算BFC的高度时，浮动子元素也参与计算
6. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然


**只要元素满足下面任一条件即可触发 BFC 特性：**
body 根元素,意思应该是根元素所围起来的这个封闭空间是一个BFC。
浮动元素：float 除 none 以外的值
绝对定位元素：position (absolute、fixed)
display 为 inline-block、table-cells、flex
overflow 除了 visible 以外的值 (hidden、auto、scroll)

- 行内格式化上下文 IFC
行内格式化上下文是一个网页的渲染结果的一部分。其中，各行内框（inline boxes）一个接一个地排列，其排列顺序根据书写模式（writing-mode）的设置来决定：

对于水平书写模式，各个框从左边开始水平地排列
对于垂直书写模式，各个框从顶部开始水平地排列

- **padding-top/bottom 和 margin-top/bottom 都是相对于父元素的宽度来计算的。(百分比)**
  当然，padding-left/right和margin-left/right都是相对于父元素的宽度来计算的。

- 常见的定位方案
  - 普通流 (normal flow)
  在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染  为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。
  - 浮动 (float)
  在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。
  - 绝对定位 (absolute positioning)
  在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。

- 水平以及垂直居中
  - 弹出层的定位 绝对垂直居中
    ```
    .md-warp{
      position: relative;
    }
    .md-main{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
    ```
  - flex实现
    ```
    .md-warp{
        display:flex;
    }
    .md-main{
        display: flex;
      align-items: center;
      justify-content: center;
    }
    ```
  - margin法：元素定宽，元素为块级元素或行内元素设置display:block，元素的margin-left和margin-right都必须设置为auto。
    ```
    水平居中
    .md-main{
      width:100px;
      display:block;
      margin:0 auto;
    }
    ```

