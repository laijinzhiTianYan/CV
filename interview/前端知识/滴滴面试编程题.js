var cityList = [
    {
        name: '北京',
        value: 'beijing'
    },
    {
        name: '上海',
        value: 'shanghai'
    },
    {
        name: '杭州',
        value: 'hangzhou'
    },
    {
        name: '广州',
        value: 'guangzhou'
    }
]

var sortFields = ['shanghai','hangzhou','chengdu','beijing'];

var result = [
    
    {
        name: '上海',
        value: 'shanghai'
    },
    {
        name: '杭州',
        value: 'hangzhou'
    },
    
    {
        name: '北京',
        value: 'beijing'
    },
    {
        name: '广州',
        value: 'guangzhou'
    }
]

function f(cityList,sortFields){
    var res=[];
    var rest=[];
    for(var i=0;i<cityList.length;i++){
        j=cityList.length-1;
        while(j>i&&cityList[j].value!==sortFields[i]){
            j--;
        }
        if(j<=i){
            continue;
        }
        if(cityList[j].value===sortFields[i]){
            [cityList[i],cityList[j]]=[cityList[j],cityList[i]];
        }
    }
}

    