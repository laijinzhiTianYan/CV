1. 方法及示例
  - // 获取字符串长度的方法
  ```
    function length(str) {
        return [...str].length;
      } 
      length("x\uD83D\uDE80y"); // 3
  ```
2. 字符串函数扩展
 >Unicode表示法：大括号包含表示Unicode字符(\u{0xXX}或\u{0XXX})
 字符串遍历：可通过for-of遍历字符串
 字符串模板：可单行可多行可插入变量的增强版字符串
 标签模板：函数参数的特殊调用
 String.raw()：返回把字符串所有变量替换且对斜杠进行转义的结果
 String.fromCodePoint()：返回码点对应字符
 codePointAt()：返回字符对应码点(String.fromCodePoint()的逆操作)
 normalize()：把字符的不同表示方法统一为同样形式，返回新字符串(Unicode正规化)
 repeat()：把字符串重复n次，返回新字符串
 matchAll()：返回正则表达式在字符串的所有匹配
 includes()：是否存在指定字符串
 startsWith()：是否存在字符串头部指定字符串
 endsWith()：是否存在字符串尾部指定字符串

  - ES2017
    padStart()：把指定字符串填充到字符串头部，返回新字符串
    padEnd()：把指定字符串填充到字符串尾部，返回新字符串
  - ES2019
    trimStart()：消除字符串头部空格，返回新字符串
    trimEnd()：消除字符串尾部空格，返回新字符串









