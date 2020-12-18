// 快速排序原地排序，关键在于定义基准元素，头尾元素与基准元素对比，定义头尾元素下标，头小右移，头大停止，尾大左移，尾小停止，头大尾小元素交换。
function quickSort(arr,startIndex,endIndex){
    if(startIndex>=endIndex){
        return arr;
    }
    var pivot=arr[startIndex];
    var left=startIndex;
    var right=endIndex;

    while(left<right){
        // 先从右边开始
        while(left<right&&arr[right]>pivot){
            right--;
        }
        while(left<right&&arr[left]<=pivot){
            left++;
        }
        if(left<right){
            [arr[left],arr[right]]=[arr[right],arr[left]];
        }
    }
    arr[startIndex]=arr[left];
    arr[left]=pivot;
    quickSort(arr,startIndex,left-1);
    quickSort(arr,left+1,endIndex);
    return arr;
}


// 快速排序2，非原地排序
function quicksort(arr){
    if(arr.length<=1) {
        return arr;
    }
    var pivotIndex=Math.floor(arr.length/2);
    var pivot=arr.splice(pivotIndex,1)[0];
    var left=[];
    var right=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]<pivot){
            left.push(arr[i]);
        }
        else{
            right.push(arr[i]);
        }
    }
    return quicksort(left).concat([pivot],quicksort(right));
}

