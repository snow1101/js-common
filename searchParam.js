/**
  使用js编写函数从url中解析出所有的参数
*/
// 方法一 ： 使用nodejs 中的querystring ,querystring.decode 方法返回的是对象
import Querystring from 'querystring';

export function getUrlQueryByNode(obj) => {
  const query = Querystring.decode(location.search.slice(1));
  return query;
};

// 方法二 ： 使用URLSearchParams.value方法，但是有浏览器兼容性问题

// 方法三 ： 使用纯函数，不借助任何库的情况下

export function getUrlQueryByJs(str) {
  if (typeof str !== 'string') {
    return {};
  }
  // 按照规范，url的各种参数需要在encode之后拼接到URL中，对应的解析时需要decode
  return decodeURI(str).split('&').map(param => {
    const tmp = param.split('=');
    const key = tmp[0];
    let value = tmp[1] || true;
    if (typeof value === 'string' && isNaN(Number(value)) === false) {
      value = Number(value);
    }

    return { key, value };
  }).reduce((params, item) => {
    const { key, value } = item;
    if (typeof params[key] === 'undefined') {
      params[key] = value;
    } else {
      params[key] = Array.isArray(params[key]) ? params[key] : [params[key]];
      params[key].push(value);
    }

    return params;
  }, {});
}
