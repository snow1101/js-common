
## 常用的js代码片段

### 数组去重
```javascript

# 方法一
var arr = [1, 4, 7, 4, 3, 2, 1, 4, 7];
var newArr = arr.reduce((newArr, current) => {
	if(newArr.indexOf(current) === -1) {newArr.push(current);} 
	return newArr;
}, []);
console.log(newArr);

# 方法二 思路：当前方案使用了ES6新增的set数据解构的去重特性，然后在将生成的set对象转换成数组。
var arr = [1, 4, 7, 4, 3, 2, 1, 4, 7];

var newArr = Array.from(new Set(arr));

console.log(newArr);
```
### 在数组中找出最小值（或者最大值）
```
# 思路：利用Math.min()方法求最小值，但是该方法的参数是一个数值列表，而不是一个数组，故使用ES6新增的扩展运算符将数组转换成列表，然后传递到Math.min()方法中去即可。
var arr = [23, 45, 40, 30, 12];

var iMin = Math.min(...arr);

console.log(iMin);

```
### 一个月有多少天

```
function days(year,month){
        var dayCount;
        now = new Date(year,month, 0);
        dayCount = now.getDate();
        return dayCount;
}
alert(days(2018,7))

```

### 如何优雅的实现金钱格式化：1234567890 --> 1,234,567,890

```
var test1 = '1234567890'
var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

console.log(format) // 1,234,567,890
```

### 如何优雅的取整

```
#方法一 利用ES6的数组解构方法，实现在不使用第三个变量的情况下，完成变量a和变量b的数据交换。

var a = 4, b = 6;

[a, b] = [b, a];

console.log(a, b);

# 方法二
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

### 取整
对一个数字 | 0 可以取整，负数也同样适用， num | 0

```
1.3 | 0 //1
-1.9 | 0 //-1
```

### 判断奇偶数 & 1
对一个数字 & 1 可以判断奇偶数， 负数也同样适用， num & 1

```
const num=3;
!!(num & 1) //true
!!(num % 2) //true

```
