
## prototype

```javascript
  function Person() {

  }
  Person.prototype.name = 'snow';
  var person = new Person();
  person.name = 'Kevin';
  console.log(person.name) // Kevin
  console.log(person.__proto__ === Person.prototype); // true
  console.log(Person === Person.prototype.constructor); // true
  // 顺便学习一个ES5的方法,可以获得对象的原型
  console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

* **prototype是一个对象** 每个函数都有一个prototype属性，这个prototype属性是一个对象，所以我们才会Person.prototype.name = 'snow';给Person.prototype添加属性
* prototype 指向的对象正是调用该构造函数而创建的实例的原形，所以 person.__proto__ === Person.prototype

## __proto__

* 每一个JavaScript对象(除了null)都具有一个属性（__proto__）,这个属性指向该对象的原形 person.__proto__ === Person.prototype

## constructor

一个构造函数可以生成多个实例，每个实例使用__proto__指向原形，原形可以使用constructor属性指向构造函数。所以Person.prototype.constructor === Person

## 一张图理解原形以及原形链
![](./images/prototype4.png)

## 万物皆空

JavaScript是个挺有意思的语言，有点佛家意味

**每个对象都有一个__proto__属性指向原形，原形也是个对象，所以原形也有个__proto__指向生成此原形的原形，这就构成了原形链，直到最终找到原形的原形是Object,而最上层的Object的原形是null**

```
  function Father(){}
  var child = new Father();
  console.log(child.__proto__ === Father.prototype); //true
  console.log(Father.prototype.__proto__ === Object.prototype);//true
  console.log(Object.prototype.__proto__ === null);//true
```
