// 字符串合并去重
function f(arr1,arr2){
    var arr=arr1.concat(arr2);
    var res=new Set(arr);

    return Array.from(res);
}
// 给定一个字符串，只包含数字和大小写字母，找出连续的按照字典序从小到大的最长子串，如果有多个用#连接，输出结果
function ff(str){
    var s=str+'\0';
    var len=0;
    var max=0;
    var sub='';
    for(var i=0;i<s.length-1;i++){
        var j=i;
        len=1;
        while(s[i]<=s[i+1]&&((s[i].charCodeAt()>=48&&s[i+1].charCodeAt()<=57)||(s[i].charCodeAt()>=97&&s[i+1].charCodeAt()<=122)||(s[i].charCodeAt()>=65&&s[i+1].charCodeAt()<=90))&&i<s.length-1){
            i++;
            len++;
        }
        console.log(len);
        if(max<len){
            max=len;
            sub=s.substr(j,len);
        }
        else if(max==len){
            sub=sub+'#'+s.substr(j,len);
        }
        console.log(i);
    }
    return sub;
}



