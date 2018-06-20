---
layout:     post
title:      "JavaScript数据类型检测的方法"
subtitle:   "判断js中的数据类型几种方法typeof、instanceof、 constructor、 prototype、 $.type()/jquery.type()"
date:       2016-11-02 13:00:00
author:     "ShenBao"
header-img: "img/common/1006.jpg"
catalog: true
tags:
    - JavaScript
---


JavaScript数据类型是非常简洁的，它只定义了7中基本数据类型（最后一个ES6新增的）

- null：空、无。表示不存在，当为对象的属性赋值为null，表示删除该属性
- undefined：未定义。当声明变量却没有赋值时会显示该值。可以为变量赋值为undefined
- number：数值。最原始的数据类型，表达式计算的载体
- string：字符串。最抽象的数据类型，信息传播的载体
- boolean：布尔值。最机械的数据类型，逻辑运算的载体
- object：对象。面向对象的基础

- Symbol: ES6新增的


判断js中的数据类型有以下几种方法：typeof、instanceof、 constructor、 prototype、 $.type()/jquery.type(),接下来主要比较一下这几种方法的异同。


## typeof用来检测数据类型的运算符

最常见的判断方法

```
var a = "iamstring.";
console.log(typeof 12);//"number"
console.log(typeof ['a','b']);//"object"
console.log(typeof /\d+/);//"object"
console.log(typeof 'a');//"string"
console.log(typeof undefined);//"undefined"
其中typeof返回的类型都是字符串形式，需注意
console.log(typeof a == "string") -------------> true
console.log(typeof a == String) ---------------> false
另外typeof 可以判断function的类型；在判断除Object类型的对象时比较方便。
```
说明：typeof检测数据类型返回一个字符串。可以检测到的数据类型为："number"、“string”、“boolean”，“undefined”，“function”、“object”。由以上代码可以看出，typeof不可以检测出数组，正则等具体的数据类型。会将对象数据类型的值都返回“object”

## instanceof检测某一个实例是否属于某个类

判断已知对象类型的方法

```
var ary=[1,2]; 
var f = function(){this.name="22";};
console.log(ary instanceof Array);//true
console.log(ary instanceof Object);//true
console.log(1 instanceof Number);//false
console.log(new Number(1) instanceof Number);//true
console.log(f instanceof Function) ------------> true
console.log(f instanceof function) ------------> false
注意：instanceof 后面一定要是对象类型，并且大小写不能错，该方法适合一些条件选择或分支。
```
说明：由以上代码可以说明instanceof不能用来处理字面量方式创建出来的基本数据类型的值。只要在当前实例的原型链上，我们用其检测出来的结果都是true。instanceof不可以检测null和undefined


## constructor

根据对象的constructor判断

```
var aa=[1,2];
console.log(aa.constructor==Array);//true
console.log(aa.constructor==RegExp);//false
console.log((1).constructor==Number);//true
var reg=/^$/;
console.log(reg.constructor==RegExp);//true
console.log(reg.constructor==Object);//false
```
说明：constructor作用和instanceof非常相似。但是我们可以把类的原型进行重写，在重写的过程中很有可能把之前的constructor给覆盖了，所以这样检测出来的结果是不准确的。constructor不可以检测null和undefined



## Object.prototype.toString.call() 最准确最常用的方式。

通用但很繁琐的方法

```
var aaa=[];
console.log(Object.prototype.toString.call(aaa));//[object Array]
console.log(({}).toString.call(aaa));//[object Array]
console.log(Object.prototype.toString.call(aaa)==="[object Array]");//true
```

说明：Object.prototype.toString.call() 最准确最常用的方式。 首先获取Object原型上的toString方法，让方法执行，让toString方法中的this指向第一个参数的值。Object上的toString并不是用来转换为字符串的。Object上的toSting它的作用是返回当前方法执行的主体（方法中的this）所属类的详细信息——>"[object Object]":第一个object代表当前实例是对象数据类型的，这个是固定死的，第二个Object代表的是this所属的类是Object。 Object可以检测null和undefined，第二和第三种方法不可以检测null和undefined


## 无敌万能的方法：jquery.type()

```
如果对象是undefined或null，则返回相应的“undefined”或“null”。
jQuery.type( undefined ) === "undefined"
jQuery.type() === "undefined"
jQuery.type( window.notDefined ) === "undefined"
jQuery.type( null ) === "null"
如果对象有一个内部的[[Class]]和一个浏览器的内置对象的 [[Class]] 相同，我们返回相应的 [[Class]] 名字。 (有关此技术的更多细节。 )
jQuery.type( true ) === "boolean"
jQuery.type( 3 ) === "number"
jQuery.type( "test" ) === "string"
jQuery.type( function(){} ) === "function"
jQuery.type( [] ) === "array"
jQuery.type( new Date() ) === "date"
jQuery.type( new Error() ) === "error" // as of jQuery 1.9
jQuery.type( /test/ ) === "regexp"
其他一切都将返回它的类型“object”。
```

通常情况下用typeof 判断就可以了，遇到预知Object类型的情况可以选用instanceof或constructor方法,实在没辙就使用$.type()方法。

