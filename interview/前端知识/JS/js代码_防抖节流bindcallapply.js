// 防抖,实时搜索，拖拽，登录用户名密码格式验证等等
let timer=null;
input.on('input',(e)=>{
    clearTimeout(timer)
    timer=setTimeout(()=>{
        // 发送一个ajax（）请求
        ajax();
    },500)
})
// 模拟ajax请求后台数据
function ajax() {
    console.log(this.value);// 搜索框value值
}

/*
*分析：1、setTimeout()形成了一个闭包，当执行的时候，ajax()方法中的this实际指向window，所以我们还需要进行优化，改变this指向。
2、e--事件对象，在上面一系列的方法调用之中，e已经被丢了，变成了undefined,所以我们还需要进行以下优化，将事件对象重新找回来。
*/
var oInp;// 假设在此取得输入框
var timer = null; // 定义一个全局定时器
oInp.oninput = function(e) {
    var _this = this,
        _arg = arguments; // e
    clearTimeout(timer);
    timer = setTimeout(function(){
        ajax().apply(_this, _arg); // 绑定this, 传入e
    }, 1000);
};
// 模拟ajax请求后台数据
function ajax(e) {
    console.log(this.value);// 搜索框value值
    console.log(e); // 事件对象
}

//防抖，封装成为一个方法 
function debounce(handle, delay) {
	var timer = null;
	return function() {
		var _this = this,
            _arg = arguments;
        if(timer){
            clearTimeout(timer);
        }
		timer = setTimeout(function() {
			handle.apply(_this, _arg);
		}, delay);
	}
} // 其中 handle 为需要进行防抖操作的函数，delay 为延迟时间

function throttle(handle,wait){
    let lasttime=0;
    return function(e){
        let 
    }
}




//节流，窗口调整，页面滚动，抢购疯狂点击等等。
let isClick=false
button.on('click',()=>{
    if(isClick) return;
    isClick=true;
    //每十秒只允许点击一次
    setTimeout(()=>{
        isClick=false;
    },10000)
})

// 节流的函数封装
// 时间戳
function throttle(handle, wait) {
	var prev=Date.now();
	return function() {
        var _this=this;
        var args=arguments;
		var nowtime = Date.now();
		if(now- prev >= wait) {
			handle.apply(_this, args);
			prev = Data.now();
		}
	}
}

// 定时器
/**
 * 当触发事件的时候，我们设置一个定时器，再次触发事件的时候，如果定时器存在，就不执行，直到delay时间后，定时器执行执行函数，
 * 并且清空定时器，这样就可以设置下个定时器。当第一次触发事件时，不会立即执行函数，而是在delay秒后才执行。
 * 而后再怎么频繁触发事件，也都是每delay时间才执行一次。当最后一次停止触发后，
 * 由于定时器的delay延迟，可能还会执行一次函数
 * @param {*} handle 
 * @param {*} delay 
 */
var throttle=function(handle,delay){
    var timer=null;
    return function(){
        var _this=this;
        var args=arguments;
        if(!timer){
            timer=setTimeout(function(){
                handle.apply(_this,args);
                timer=null;
            },delay);
        }
    }
}

// 节流：时间戳加定时器
var throttle=function(handle,delay){
    var timer=null;
    var startTime=Date.now();
    return function(){
        var curTime=Date.now();
        var remaining=delay-(curTime-startTime);
        var context=this;
        var args=arguments;
        clearTimeout(timer);
        if(remaining<=0){
            handle.apply(context,args);
            startTime=Date.now();
        }
        else{
            timer=setTimeout(handle,remaining);
        }
    }
}

//格式化金钱，每千分位加逗号
function format(str){
    let s=''
    let count=0;
    for(let i=str.length-1;i>=0;i--){
        s=str[i]+s;
        count++;
        if(count%3===0&&i!==0){
            s=','+s;
        }
    }
    return s;
}
function format(str){
    // 单词边界和非捕获分组
    // (\d)，后面匹配的字符串前面的一个数字字符。
    // ？=限定词，限定后面的字符串都是符合(?:\d{3})+$)
    // ？：非捕获分组，当匹配到 一个或多个 紧靠末尾 的三位数时, 这个规则生效, 但并不保存这个分组.
    // $1是第一个小括号里的内容，$2是第二个小括号里面的内容，依此类推
    return str.replace(/(\d)(?=(?:\d{3})+$)/g,'$1,');
}

//去除字符串空格
str.replace(/\s/g,'');//去除全部空格
str.replace(/^\s+|\s+$/g,'');//去除两边空格，等同于str.trim()

//反转数组，input: I am a student output: student a am I
function reverseArray(array){
    var res=[];
    for(let i=0;i<array.length;i++){
        res.unshift(array[i]);
    }
    return res;
}
//将金额12345转成中文金额表示
function numToString(num) {
    if (num > 999999999) throw '超过金额上限，最大单位为亿'
    const unitMap = ['', '十', '百', '千', '万', '十', '百', '千', '亿']
    const stringMap = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const n = num + ''
    const len = n.length
    let lastIndex = len - 1
    let result = ''
    for (let i = 0; i < len; i++) {
        if (i > 0 && n[i] == '0') {
            if (n[i - 1] != '0') result += '零'
        } else {
            result += stringMap[n[i]-'0'] + unitMap[lastIndex]
        }

        lastIndex--
    }
    
    lastIndex = result.length - 1
    if (result[lastIndex] == '零') return result.slice(0, lastIndex)
    return result
}
//要求 a~z 有 26个字母，按照 1~26 编码，现在给定一个数字字符串，输出所有可能的解码结果，如：输入 1234，输出 ['awd', 'abcd', 'lcd']
const map=[0,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
function getDecodes(num) {
    if(!num) return [];
    num+=''
    const result=[]
    _getDecodes(num,0,[],result);
    return result;
}

function _getDecodes(num,start,path,result){
    if(start==num.length){
        return result.push([...path]);
    }
    let c=num[start++];
    path.push(map[c]);
    _getDecodes(num,start,path,result);
    path.pop();
    if(start==num.length) return;
    //因为顶多有两位数
    c+=num[start];

    if(c>26)return;
    path.push(map[c]);
    _getDecodes(num,start+1,path,result);
    path.pop()
}




// 实现bind函数
Function.prototype.bind=function(context,...extra){
    const self=this;
    return function(...arg){
        return self.call(context,...extra.concat(arg))
    }
}
//实现call函数
Function.prototype.call=function(context,...args){
    if(context===null||context===undefined){
        context=window;
    }
    else if(!context||context.toString()!='[object Object]'){
        context={}
    }
    let key=Math.random();
    while(context[key]){
        key=Math.random();
    }
    context[key]=this;
    const res=context[key](...args);
    delete context[key];
    return res;
}
//实现apply
Function.prototype.apply = function(context, args) {
    if (args !== undefined && !Array.isArray(args)) throw '参数必须为数组'
    if (context === null || context === undefined) {
        context = window
    } else if (!context || context.toString() != '[object Object]') {
        context = {}
    }

    let key = Math.random()
    while (context[key]) {
        key = Math.random()
    }

    context[key] = this
    let result
    if (args === undefined) {
        const result = context[key]()
    } else {
        const result = context[key](...args)
    }

    delete context[key]
    return result
}

