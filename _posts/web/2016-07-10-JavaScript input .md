---
layout:     post
title:      "js 实时监听input中值变化"
subtitle:   "oninput,onpropertychange,onchange的用法"
date:       2016-07-10 20:00:00
author:     "ShenBao"
header-img: "img/common/02.jpg"
catalog: true
tags:
    - HTML
    - JavaScript
    - 前端
---

## js 实时监听input中值变化

### HTML code

```
<!DOCTYPE html>  
<html>  
    <head>  
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
        <title>RunJS</title>  
    <script src="/js/jquery-1.8.3.min.js"></script>  
    </head>  
    <body>  
        <h1 >  
            实时监测input中值的变化  
        </h1>  
        <input type="text" id="username" autoComplete='off'>  
        <div id="result"></div>  
    </body>  
</html>  
```

### JS code
```
$(function(){  
  
  $('#username').bind('input propertychange', function() {  
      $('#result').html($(this).val().length + ' characters');  
  });  
  
})  
```

## 总结

类似于，实现微博的‘还能输入xxx个字符’

oninput,onpropertychange,onchange的用法:

onchange触发事件必须满足两个条件：

- a）当前对象属性改变，并且是由键盘或鼠标事件激发的（脚本触发无效）
- b）当前对象失去焦点(onblur)；

onpropertychange的话，只要当前对象属性发生改变，都会触发事件，但是它是IE专属的；

oninput是onpropertychange的非IE浏览器版本，支持firefox和opera等浏览器，但有一点不同，它绑定于对象时，并非该对象所有属性改变都能触发事件，它只在对象value值发生改变时奏效。



