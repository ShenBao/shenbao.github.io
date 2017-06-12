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













