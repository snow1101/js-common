# Javascript 采用词法作用域，也就是静态作用域。

函数的作用域在函数**定义**的时候就决定了

```
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();
//结果是1
```

因为JavaScript采用静态作用域，所以，执行foo函数，会先从foo函数内部查找是否有局部变量value，如果没有，就根据**书写**的位置，查找上面一层的代码，也就是value等于1
