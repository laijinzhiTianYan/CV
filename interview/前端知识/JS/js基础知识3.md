1. 严格模式 "use strict";
   
       变量必须声明后再使用
       函数的参数不能有同名属性，否则报错
       不能使用with语句 ？
       不能对只读属性赋值，否则报错 ？
       不能使用前缀 0 表示八进制数，否则报错 ？
       不能删除不可删除的属性，否则报错 ？
       不能删除变量delete prop，会报错，只能删除属性delete global[prop] ？
       eval不会在它的外层作用域引入变量
       eval和arguments不能被重新赋值
       arguments不会自动反映函数参数的变化
       不能使用arguments.callee
       不能使用arguments.caller
       禁止this指向全局对象，this不是指向window,而是undefined。
       不能使用fn.caller和fn.arguments获取函数调用的堆栈
       增加了保留字（比如protected、static和interface）
2. 2020扩展
   - 声明：globalThis：作为顶层对象，指向全局环境下的this
     >Browser：顶层对象是window
     Node：顶层对象是global
     WebWorker：顶层对象是self
     以上三者：通用顶层对象是globalThis

   - 数值扩展:BigInt：任何位数的整数(新增的数据类型，使用n结尾) BigInt(3)=>3n
       >BigInt()：转换普通数值为BigInt类型
       BigInt.asUintN()：转换BigInt为0到2n-1之间对应的值
       BigInt.asIntN()：转换BigInt为-2n-1 到2n-1-1
       BigInt.parseInt()：近似于Number.parseInt()，将一个字符串转换成指定进制的BigInt类型
       
       重点难点:  
       BigInt同样可使用各种进制表示，都要加上后缀
       BigInt与普通整数是两种值，它们之间并不相等
       typeof运算符对于BigInt类型的数据返回bigint

