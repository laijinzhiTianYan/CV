const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
// const undefinedTag='[object Undefined]';
// Object.prototype.toString.call(null)=>"[object Null]"
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

//这是可以继续遍历的类型
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

//iteratee方法的任务就是把一个数组，一个对象，或者一个字符串变成一个有效的function来遍历数组或对象找到符合要求的属性。
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

// 获取要克隆的目标的类型
function getType(target) {
    return Object.prototype.toString.call(target);
}

//初始化可遍历类型的cloneTarget
function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

// 既不是原始类型，也不是可遍历类型的克隆
// 使用new String() new Number()和new Boolean()创建的对象
// 以及error date regexp function null和（symbol）
function cloneOtherType(target, type) {
    const Ctor = target.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(target);
        case regexpTag:
            return cloneReg(target);
        case symbolTag:
            return cloneSymbol(target);
        case funcTag:
            return cloneFunction(target);
        default:
            return null;
    }
}

//克隆symbol类型，lodash库克隆symbol就是这样
function cloneSymbol(target) {
    //Symbol.prototype.valueOf：返回 Symbol 对象的初始值。覆盖 Object.prototype.valueOf() 方法。
    return Object(Symbol.prototype.valueOf.call(target));
}

//克隆正则表达式
function cloneReg(target) {
    //匹配结尾处的单词字符，0个或者多个。
    const reFlags = /\w*$/;
    //创建 RegExp 对象的语法：new RegExp(pattern, attributes);
    /*
    参数 pattern 是一个字符串，指定了正则表达式的模式或其他正则表达式。
    参数 attributes 是一个可选的字符串，包含属性 "g"、"i" 和 "m"，分别用于指定全局匹配、区分大小写的匹配和多行匹配。
    */
    const result = new target.constructor(target.source, reFlags.exec(target));
    result.lastIndex = target.lastIndex;
    //使用了全局匹配标记g，正则表达式会记录匹配成功的位置lastIndex，继续匹配时就从该位置往后匹配。
    return result;
}

// 克隆方法
function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    const param = paramReg.exec(funcString);
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

//判断是否是原始类型,是返回false。包括，number string boolean undefined
// let s='hello',Object.prototype.toString.call(s)结果为"[object String]"；
// let ss=new String ('word')，Object.prototype.toString.call(ss)结果也为"[object String]"；
// s为原始类型，ss为对象，且为既不是原始类型，也不是可遍历类型的对象。
// 由于Symbol的使用方式为，let s=new Symbol(),所以可能需要额外克隆
function isObject(target) {
    const type = typeof target;
    return type === 'object' || type === 'function';
}
function clone(target, map = new map()) {
    //克隆原始类型，直接返回即可
    if (!isObject(traget)) {
        return target;
    }
    //初始化
    const type = getType(target);
    let cloneTarget;
    //如果是可以遍历的类型，cloneTarget的初始化
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type);
    }
    else { //既不是原始类型，也不是可遍历类型的克隆
        return cloneOtherType(target, type);
    }

    //防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    //可遍历类型初始化后进行克隆
    //1.克隆set
    if (type === setTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map));
        });
        return cloneTarget;
    }
    //2.克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map));
        });
        return cloneTarget;
    }
    //克隆对象和数组
    // 如果是个数组，keys为undefined；如果是个对象，keys就是对象的键值
    // 如果target是数组，Array.isArray(target.keys())为false，t.keys()为Arrray Iterator；但是Array.isArray(Object.keys(target))为true
    // 如果target是对象，Array.isArray(target.keys)为false，target.keys为undefined；但是Array.isArray(Object.keys(target))为true

    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        //forEach函数接收两个参数，一个是数组，另一个是个方法。这个方法有两个参数(value,key)
        if (keys) {
            key = value;
        }
        cloneTarget[key] = clone(target[key], map);
    });
    return cloneTarget;
}
module.exports = {
    clone
};

//简单版的deepcopy
function deepcopy(obj, map = new Map()) {
    if (!isObject(obj)) return;
    var newObj = Array.isArray(obj) ? [] : {}
    if (map.get(obj)) {
        console.log(map.get(obj));
        return map.get(obj);
    }
    map.set(obj, newObj);
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (isObject(obj[key])) {
                newObj[key] = deepCopy(obj[key], map);
            }
            else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}
const obj1 = {
    x: 1,
    y: 2,
    d: {
        a: 3,
        b: 4
    }
}
obj1.z = obj1;
const obj2 = deepCopy(obj1);
console.log(obj2);

