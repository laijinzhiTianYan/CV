function f(array) {
  let res = [];
  let i = 0, j = array.length - 1;
  while (j >= 1 && array[j] > array[j - 1]) {
    j--;
  }
  while (i < j && array[i] < array[i + 1]) {
    i++;
  }
  res.push(i + 1);
  res.push(j + 1);
  console.log(res);
}
f([4, 2, 3, 1, 5, 6]);