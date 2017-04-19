---
layout:     post
title:      "javascript关于window.open子页面执行完成后刷新父页面的方法及传送数据给父页面"
subtitle:   "window.open"
date:       2017-04-19 22:00:00
author:     "ShenBao"
catalog: true
tags:
    - JavaScript
---


## 父页面

### HTML Code

```
<input id="btnAdd" type="button" onclick="openWin();" value="点击出子窗口" />
```
### JS Code
```
function openWin() {
    window.open('win.html', '_blank','width=300,height=400,top=200,left=400');
}
//定义callback方法，用于回调
function callback(data) {
    console.log(data)
}

```

## 子页面

### HTML Code

```
<input id="onSub" type="button" onclick="formSubmit();" value="点击传送数据到父页面，同时关闭当前小窗口">
```
### JS Code
```
function formSubmit(){
    var data = {
        name:'shenbao',
        age: 18,
    };
    window.opener.callback(data);
    //上述执行完成后，调用打开页面的callback方法，
    //此处是调用主页面的callback方法
    window.close();//当前页面关闭

}
```

