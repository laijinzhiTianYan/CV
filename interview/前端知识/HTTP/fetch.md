- fetch()是 XMLHttpRequest 的升级版，用于在 JavaScript 脚本里面发出 HTTP 请求, 浏览器原生提供这个对象。

- fetch()的功能与 XMLHttpRequest 基本相同，但有三个主要的差异。

（1）fetch()使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。

（2）fetch()采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。

（3）fetch()通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。

在用法上，fetch()接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。它的基本用法如下。
```

fetch('https://api.github.com/users/ruanyf')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err)); 

async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status); 
  console.log(response.statusText);
}

```
- 判断请求是否成功
  >fetch()发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。这就是说，即使服务器返回的状态码是 4xx 或 5xx，fetch()也不会报错（即 Promise 不会变为 rejected状态）。只有通过Response.status属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功
  ```
  async function fetchText() {
    let response = await fetch('/readme.txt');
    if (response.status >= 200 && response.status < 300) {
      return await response.text();
    } else {
      throw new Error(response.statusText);
    }
  }
  ```
  另一种方法是判断response.ok是否为true。
  if (response.ok) {
    // 请求成功
  } else {
    // 请求失败
  }
- Response 对象还有一个Response.headers属性，指向一个 Headers 对象，对应 HTTP 回应的所有标头。
  >Headers.get()：根据指定的键名，返回键值。
  Headers.has()： 返回一个布尔值，表示是否包含某个标头。
  Headers.set()：将指定的键名设置为新的键值，如果该键名不存在则会添加。
  Headers.append()：添加标头。
  Headers.delete()：删除标头。
  Headers.keys()：返回一个遍历器，可以依次遍历所有键名。
  Headers.values()：返回一个遍历器，可以依次遍历所有键值。
  Headers.entries()：返回一个遍历器，可以依次遍历所有键值对（[key, value]）。
  Headers.forEach()：依次遍历标头，每个标头都会执行一次参数函数。

- Response对象根据服务器返回的不同类型的数据，提供了不同的读取方法。

  response.text()：得到文本字符串。
  response.json()：得到 JSON 对象。
  response.blob()：得到二进制 Blob 对象。
  response.formData()：得到 FormData 表单对象。
  response.arrayBuffer()：得到二进制 ArrayBuffer 对象。

- fetch()的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。fetch(url, optionObj)  
  >fetch()第二个参数的完整 API 如下。
  ```
  const response = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8"
    },
    body: undefined,
    referrer: "about:client",
    referrerPolicy: "no-referrer-when-downgrade",
    mode: "cors", 
    credentials: "same-origin",
    cache: "default",
    redirect: "follow",
    integrity: "",
    keepalive: false,
    signal: undefined
  });

- fetch()请求发送以后，如果中途想要取消，需要使用AbortController对象。
```
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () => console.log('abort!')
);

controller.abort(); // 取消
console.log(signal.aborted); // true
```
**1秒后自动取消请求**
```
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/long-operation', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') {
    console.log('Aborted!');
  } else {
    throw err;
  }
}
```