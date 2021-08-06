/*
遍历:
Symbol定义的属性不会出现在下面循环中：

for in:可获取原型属性，不可获取不可枚举属性
for of:不可遍历对象，可遍历数组
Object.keys：原型属性和不可枚举属性都不能获取
Object.getOwnPropertyByNames：不可获取原型属性，可获取不可枚举属性
JSON.stringify：原型属性和不可枚举属性都不能获取
Reflect.ownKeys：可获取不可枚举和Symbol，不可获取原型
总结：
获取原型上属性的有：for in；
获取不可枚举属性的有：getOwnPropertyNames，Reflect.ownKeys
可获取Symbol属性的有：getOwnpropertySymbols,Reflect.ownKeys
*/

function getType(value) {
  // 判断数据是 null 的情况
  if (value === null) {
    return value + "";
  }

  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split("");

    type.pop();

    return type.join("").toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}