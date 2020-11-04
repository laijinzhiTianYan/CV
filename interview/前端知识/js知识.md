- 函数的长度就是定义形参的个数。
    实现add函数,让add(a)(b)和add(a,b)两种调用结果相同
    实现1
    function add(a, b) {
        if (b === undefined) {
            return function(x) {
                return a + x
            }
        }

        return a + b
    }
    实现2——柯里化
    function curry(fn, ...args1) {
        if (fn.length == args1.length) {
            return fn(...args1)
        }

        return function(...args2) {
            return curry(fn, ...args1, ...args2)
        }
    }

    function add(a, b) {
        return a + b
    }

    console.log(curry(add, 1)(2)) // 3
    console.log(curry(add, 1, 2)) // 3