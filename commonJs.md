
## 常用的js代码片段

### Math.min()比Math.max()大,因为Math.min() 返回 Infinity, 而 Math.max()返回 -Infinity。

### 深拷贝

* JSON.stringify()是目前前端开发过程中最常用的深拷贝方式，原理是把一个对象序列化成为一个JSON字符串，将对象的内容转换成字符串的形式再保存在磁盘上，再用JSON.parse()反序列化将JSON字符串变成一个新的对象
	
	```
		var obj1 = {
		    a:1,
		    b:[1,2,3]
		}
		var str = JSON.stringify(obj1)
		var obj2 = JSON.parse(str)
		console.log(obj2); //{a:1,b:[1,2,3]}
		obj1.a=2
		obj1.b.push(4);
		console.log(obj1); //{a:2,b:[1,2,3,4]}
		console.log(obj2); //{a:1,b:[1,2,3]}

	```
	通过JSON.stringify实现深拷贝有几点要注意

	1. 拷贝的对象的值中如果有函数,undefined,symbol则经过JSON.stringify()序列化后的JSON字符串中这个键值对会消失
	2. 无法拷贝不可枚举的属性，无法拷贝对象的原型链
	3. 拷贝Date引用类型会变成字符串
	4. 拷贝RegExp引用类型会变成空对象
	5. 对象中含有NaN、Infinity和-Infinity，则序列化的结果会变成null
	6. 无法拷贝对象的循环应用(即obj[key] = obj)

* 使用第三方库实现对象的深拷贝 比如： lodash

* 递归

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
但是还有很多问题

1. 首先这个deepClone函数并不能复制不可枚举的属性以及Symbol类型
2. 这里只是针对Object引用类型的值做的循环迭代，而对于Array,Date,RegExp,Error,Function引用类型无法正确拷贝
3. 对象成环，即循环引用 (例如：obj1.a = obj)


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

### 防抖函数

```
// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
// 不难看出如果用户调用该函数的间隔小于wait的情况下，上一次的时间还未到就被清除了，并不会执行函数
```

### 节流函数

```
const throttle = function(fn, threshold = 250, scope, once) {
	let last;
	let deferTimer;
	return function throttled(...rest) {
		const context = scope || this;
		const now = Date.now();
		if (last && now < last + threshold) {
			if(once) {
				deferTimer = null;
				return;
			}
			clearTimeout(deferTimer);
			deferTimer = setTimeout(() => {
				last = now;
		      func.apply(context, rest);
		    }, threshold)
		} else {
			last = now;
			func.apply(context, rest);
		}
	}
}
```

### 数组扁平化，去重，以及排序

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```
 var finalArr = [...new Set(arr.toString().split(",").sort((a,b)=>{ return a-b}).map(Number))]
 
```
### 得到一个指定范围内的随机整数
```
function getRandom(min, max) {
    return Math.floor(Math.random()*(max-min)+min)
}
```
### 得到一个指定长度的随机字符串
```
function getRandomString(length) {
    return Math.random().toString(36).substring(2, 2+length)
}
```
### 把一个伪数组转成数组
```
var obj = {0:1, '1':2, length:2}
Array.prototype.slice.call(obj) // 会得到[1,2]
```
### 对一个数组进行随机排序
```
function shuffle(arr) {
    return arr.sort(()=>Math.random() -0.5)
}
```
