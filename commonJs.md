
## 常用的js代码片段

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
