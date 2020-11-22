## Grid布局
Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格（行和列的交叉区域），可以看作是二维布局。Grid 布局远比 Flex 布局强大。

---------
**Grid布局也分为容器属性和项目属性**
1. 容器属性：
   - display: grid指定一个容器采用网格布局。
  
          注意：设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。
    ----
   - grid-template-columns属性定义每一列的列宽，grid-template-rows属性定义每一行的行高。
     ```
     1、.container {
       display: grid;
       grid-template-columns: 100px 100px 100px;
       grid-template-rows: 100px 100px 100px;
     }

     2、.container {
       display: grid;
       grid-template-columns: repeat(3, 33.33%);
       grid-template-rows: repeat(3, 33.33%);
     }
     repeat(重复的次数，重复的值)
     grid-template-columns: repeat(2, 100px 20px 80px);也可以
     
     3、.container {
       display: grid;
       grid-template-columns: repeat(auto-fill, 100px);
     }
     单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充。

     4、.container {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
     方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。

     5、grid-template-columns: 1fr 1fr minmax(100px, 1fr);
     minmax()函数产生一个长度范围，表示长度就在这个范围之中
     
     6、auto关键字表示由浏览器自己决定长度。

     7、网格线的名称
        .container {
          display: grid;
          grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
          grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
        }
        grid-template-columns属性和grid-template-rows属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用

     8、两栏布局
        .wrapper {
           display: grid;
           grid-template-columns: 70% 30%;
         }
        十二网格布局：grid-template-columns: repeat(12, 1fr);
     ```
    -----
    - grid-row-gap 属性，grid-column-gap 属性，grid-gap 属性
        grid-row-gap用于设置行间距，grid-column-gap用于设置列间距。
        grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式
        **最新标准** grid-column-gap和grid-row-gap写成column-gap和row-gap，grid-gap写成gap。
    -----
    - grid-template-areas 属性：定义区域，一个区域由单个或多个单元格组成。
        ```
        .container {
          display: grid;
          grid-template-columns: 100px 100px 100px;
          grid-template-rows: 100px 100px 100px;
          grid-template-areas: 'a b c'
                               'd e f'
                               'g h i';
        }

        grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
        上面代码将9个单元格分成a、b、c三个区域。
        ```
    -----
    - grid-auto-flow 属性:划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格.默认的放置顺序是"先行后列",也可以将它设成column，变成"先列后行"。`grid-auto-flow: column;`
    ------
    - justify-items 属性，align-items 属性，place-items 属性
        justify-items属性设置单元格内容的水平位置（左中右），align-items属性设置单元格内容的垂直位置（上中下）。
        place-items属性是align-items属性和justify-items属性的合并简写形式。
        ```
        .container {
          justify-items: start | end | center | stretch;
          align-items: start | end | center | stretch;
        }
        ```
    -----
    - justify-content 属性，align-content 属性，place-content 属性
        justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）
        ```
        .container {
          justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
          align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
        }
        ```
    ------
    - grid-auto-columns 属性，grid-auto-rows 属性
       grid-auto-columns属性和grid-auto-rows属性用来设置，浏览器自动创建的多余网格的列宽和行高。
-------
2. 项目属性
   - grid-column-start 属性，grid-column-end 属性，grid-row-start 属性，grid-row-end 属性
     项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

         grid-column-start属性：左边框所在的垂直网格线
         grid-column-end属性：右边框所在的垂直网格线
         grid-row-start属性：上边框所在的水平网格线
         grid-row-end属性：下边框所在的水平网格线
         ```
         .item-1 {
           grid-column-start: 2;
           grid-column-end: 4;
         }
         //指定网格线的名字也可以

         这四个属性的值还可以使用span关键字:
         .item-1 {  grid-column-start: span 2;}
         ```
   ------
   - grid-column 属性，grid-row 属性
       grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。
   ------
   - grid-area属性指定项目放在哪一个区域。
       .item-1 {
       grid-area: e;
     }
   -----
   - justify-self 属性，align-self 属性，place-self 属性
      justify-self属性设置单元格内容的水平位置（左中右）
      align-self属性设置单元格内容的垂直位置（上中下）
      ```
      .item {
        justify-self: start | end | center | stretch;
        align-self: start | end | center | stretch;
      }
      ```