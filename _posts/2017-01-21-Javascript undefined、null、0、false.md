---
layout:     post
title:      "区分JS中的undefined,null, ' ' ,0和false"
subtitle:   "undefined,null, ' ' ,0和false对比一下啦"
date:       2017-01-21 22:00:00
author:     "ShenBao"
header-img: "img/common/1016.jpg"
catalog: true
tags:
    - JavaScript
---

由0 == ''结果是true思考，单独做了一下测试，记录于此。

```
console.log(0 == '');               //true
console.log(0 == false);            //true
console.log(false == '');           //true
console.log(null == undefined);     //true

console.log(!0);                    //true
console.log(!false);                //true
console.log(!undefined);            //true
console.log(!null);                 //true
console.log(!'');                   //true

console.log(0 == undefined);        //false
console.log(0 == null);             //false
console.log(false == null);         //false
console.log(false == undefined);    //false
console.log('' == null);            //false
console.log('' == undefined);       //false
```

JavaScript中所有的"空值"和"假值"，除了boolean值本身就是true和false这两种情况外，其它数据类型的"空值"主要是undefined和defined这两大类。这些空值的类型分别是：

```
typeof(undefined) == 'undefined'
typeof(null) == 'object'
typeof("") == 'string'
typeof(0) == 'number'
typeof(false) == 'boolean'
```

<b>（PS：关于类型检测之后会单独写一篇,[点击这里查看](/2017/02/23/Javascript-Test-data-type/)）</b>

<!--这五个值的共同点是，在if语句中做判断，都会执行false分支。当然从广义上来看，是说明这些数值都是其对应数据类型上的无效值或空值。还有这五个值作!运算，结果全为：true。-->

这几个值中也有不同，其中undefined和null比较特殊，虽然null的类型是object，但是null不具有任何对象的特性，就是说我们并不能执行null.toString()、null.constructor等对象实例的默认调用。所以从这个意义上来说，null和undefined有最大的相似性。看看null == undefined的结果(true)也就更加能说明这点。不过相似归相似，还是有区别的，就是和数字运算时，10 + null结果为：10；10 + undefined结果为：NaN。

另外""、0和false虽然在if语句表现为"假值"，可它们都是有意义数据，只是被作为了"空值"或"假值"，因为："".toString()，(0).toString()和false.toString()都是合法的可执行表达式。

其实这5个值在上面所说的这些差异里，并不太会给程流程控制带来太大的问题，那么要区分它们什么呢？需要注意区分的是这些值在转换为String时的差异是比较大的，它们到String的转换关系是：

```
 String(undefined) -> "undefined"
 String(null) -> "null"
 String("") -> ""
 String(0) -> "0"
 String(false) -> "false"
```

这个转换关系在做字符串累加时需要特别的注意，否这会出些意想不到的问题。



