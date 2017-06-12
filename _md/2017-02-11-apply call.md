---
layout:     post
title:      "Javascript中的apply与call详解"
subtitle:   "apply、call"
date:       2017-02-11 20:00:00
author:     "ShenBao"
catalog: true
tags:
    - ES5
---


## 方法定义

### call 方法

- 语法：call([thisObj[,arg1[, arg2[, [,.argN]]]]])
- 参数：thisObj 可选项。将被用作当前对象的对象。 arg1, arg2, , argN 可选项。将被传递方法参数序列。
- 说明：
    - call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。 
    - 如果没有提供 thisObj 参数，那么 Global 对象被用作thisObj。说明白一点其实就是更改对象的内部指针，即改变对象的this指向的内容。这在面向对象的js编程过程中有时是很有用的。

### apply方法 

- 语法：apply([thisObj[,argArray]]) 
- 定义：应用某一对象的一个方法，用另一个对象替换当前对象。 
- 说明： 
    - 如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。 
    - 如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。


## 常用实例

### call应用实例

```
<input type="text" id="myText"   value="input text">

<script>
   function Obj(){
       this.value="对象！";
    }
   var value="global 变量";
   function Fun1(){
       alert(this.value);
    }

   window.Fun1();   //global 变量
   Fun1.call(window);  //global 变量
   Fun1.call(document.getElementById('myText'));  //input text
   Fun1.call(new Obj());   //对象！
   window.Fun1(); //global 变量
</script>
```

call函数和apply方法的第一个参数都是要传入给当前对象的对象，及函数内部的this。后面的参数都是传递给当前对象的参数。

```
<script>
  var func=new function(){this.a="func"}
  var myfunc=function(x){
       var a="myfunc";
       alert(this.a);
       alert(x);
   }
   myfunc.call(func,"var");
</script>
```
可见分别弹出了func和var。先调用func函数，用this.a=”func”替换myfunc中的this.a ; 然后将”var”传递给方myfunc的参数x可见分别弹出了func和var。

对于apply和call两者在作用上是相同的，但两者在参数上有区别的。

第一个参数意义都一样。第二个参数：apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，而call则作为call的参数传入（从第二个参数开始）。

如 func.call(func1,var1,var2,var3)  对应的apply写法为：func.apply(func1,[var1,var2,var3])，同时使用apply的好处是可以直接将当前函数的arguments对象作为apply的第二个参数传入。 　　

### 继承

```
// 继承的演示
function base() {
    this.member = " dnnsun_Member";
    this.method = function() {
        window.alert(this.member);
    }
}
function extend() {
    base.call(this);
    window.alert(member);
    window.alert(this.method);
}
```
上面的例子可以看出，通过call之后，extend可以继承到base的方法和属性。

顺便提一下，在javascript框架prototype里就使用apply来创建一个定义类的模式，其实现代码如下：　

```
var Class = {
  create: function () {
    return function () {
      this.initialize.apply(this, arguments);
    }
  }
}
```

解析：从代码看,该对象仅包含一个方法：Create，其返回一个函数，即类。但这也同时是类的构造函数，其中调用initialize，而这个方法是在类创建时定义的初始化函数。通过如此途径，就可以实现prototype中的类创建模式

示例：
```
var vehicle=Class.create();
vehicle.prototype={
    initialize:function(type){
        this.type=type;
    },
    showSelf:function(){
        alert("this vehicle is "+ this.type);
    }
}
var moto=new vehicle("Moto");
moto.showSelf();
```






