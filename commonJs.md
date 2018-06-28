
## 常用的js代码片段

### 如何优雅的实现金钱格式化：1234567890 --> 1,234,567,890

```
var test1 = '1234567890'
var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

console.log(format) // 1,234,567,890
```

### 如何优雅的取整

```
var a = ~~2.33

var b= 2.33 | 0

var c= 2.33 >> 0

```
### 论如何最佳的让两个整数交换数值
```
a ^= b;
b ^= a;
a ^= b;

```
### 统计字符串中相同字符出现的次数。
```
var arr = 'abcdaabc';

var info = arr
    .split('')
    .reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});

console.log(info); //{ a: 3, b: 2, c: 2, d: 1 }

```

### Math.min()比Math.max()大,因为Math.min() 返回 Infinity, 而 Math.max()返回 -Infinity。

### 深拷贝

```
  function deepCopy(source) {
    var result = {};
    for(var key in source) {
      if(typeof source[key] === 'object') {
        result[key] = deepCopy(source[key])
      } else {
        result[key] = source[key]
      }
    }
    return result;
  }

```

### 函数声明会覆盖变量声明，但不会覆盖变量赋值。

```
function a() { return true; } var a; var c = 1;console.log(a); // fun a

var a; var c = 1; a = 1; function a() { return true; } console.log(a); // 1
```

###  处理localStorage

```
export function setLocalStorage(key, obj) {
  if (typeof obj === 'object') {
    return window.localStorage.setItem(key, JSON.stringify(obj));
  } else {
    return window.localStorage.setItem(key, obj);
  }
}


export function getLocalStorage(key) {
  const tmp = window.localStorage.getItem(key);
  if (tmp === null) return null;
  try {
    return JSON.parse(tmp);
  } catch (error) {
    return tmp;
  }
}

export function removeLocalStorage(key) {
	window.localStorage.removeItem(key);
}

```

### 获取ios版本

```
export function getIOSVersion() {
  let version = navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/);
  return version ? version[version.length-1] : false;
}

```

### 获取url的参数

```
export function getParameterByName(name, url) {
  let myUrl;
  if (!url) myUrl = window.location.search;
  const myName = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${myName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(myUrl);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

```
### 判断是否是微信或者微博环境

```
export const isWeixinOrWeibo = () => {
  const userAgent = window.navigator.userAgent;
  return (/MicroMessenger/i).test(userAgent) || (/WeiBo/i).test(userAgent);
};

```

### cookie相关

```
export const getCookie = (name) => {
	const arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
	if (arr && arr.length > 2) {
		return decodeURIComponent(arr[2]);
	} else {
		return null;
	}
};

export const setCookie = (name, value) => {
	const Days = 30;
	const exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};path=/`;
};
```
