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
    <input 
        id="btnAdd"
        type="button"
        onclick="openWin();"
        value="点击出子窗口"
    />
```
### JS Code
```
function openWin() {
    window.open(
        'win.html',
        '_blank',
        'width=300,height=400,top=200,left=400'
    );
}
//定义callback方法，用于回调
function callback(data) {
    console.log(data)
}

```

## 子页面

### HTML Code

```
    <input 
        id="onSub" 
        type="button"
        onclick="formSubmit();"
        value="点击传送数据到父页面，同时关闭当前小窗口" 
    />
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

判断父窗口的状态

```
if(window.opener && !window.opener.closed)
```


## 刷新父窗口

1. window.opener.location.reload();这个方法在强迫父窗口的时候，在有些IE浏览器（比如安全设置高）的情况下，会弹出一个确认对话框，提示是不是要重新再刷新一次页面，这可是比较郁闷的事情哦
2. window.opener.location.href=window.opener.location.href;用这个就不会有问题




