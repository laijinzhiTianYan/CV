// 快速排序原地排序，关键在于定义基准元素，头尾元素与基准元素对比，定义头尾元素下标，头小右移，头大停止，尾大左移，尾小停止，头大尾小元素交换。
function quickSort(arr, startIndex, endIndex) {
    if (startIndex >= endIndex) {
        return arr;
    }
    var pivot = arr[startIndex];
    var left = startIndex;
    var right = endIndex;

    while (left < right) {
        // 先从右边开始
        while (left < right && arr[right] > pivot) {
            right--;
        }
        while (left < right && arr[left] <= pivot) {
            left++;
        }
        if (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
    }
    arr[startIndex] = arr[left];
    arr[left] = pivot;
    quickSort(arr, startIndex, left - 1);
    quickSort(arr, left + 1, endIndex);
    return arr;
}


// 快速排序2，非原地排序
function quicksort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }
    return quicksort(left).concat([pivot], quicksort(right));
}

// 以6 1 2 7 9为例，从左边先开始，到达7，根据算法，从右边开始也在7处停止，然后交换6，7
// 7 1 2 6 9左边并不是都小于哨点。
// 因为从左边先开始，注定到达的地方是大于哨点的，如果右边均没有小于哨点的，最终左右指针停留在一处，并且此处大于哨点。
// 与哨点交换后，无法实现左边的值均小于哨点，右边的值均大于哨点。