---
layout:     post
title:      "Javascript 本地存储"
subtitle:   "cookie、localStorage、sessionStorage、globalStorage"
date:       2016-02-19 22:00:00
author:     "ShenBao"
header-img: "img/common/1008.jpg"
catalog: true
tags:
    - JavaScript
---


## cookie

cookie是浏览器提供的一种机制，它将document 对象的cookie属性提供给JavaScript。可以由JavaScript对其进行控制，而并不是JavaScript本身的性质。cookie是存于用户硬盘的一个文件，这个文件通常对应一个域名，当浏览器再次访问这个域名时，便使这个cookie可用。因此，cookie可以跨越一个域名下的多个网页，但不能跨越多个域名使用。 不同的浏览器对cookie的实现也不一样，但其性质是相同的。cookie机制将信息存储于用户硬盘，因此可以作为全局变量，这是它最大的一个优点。它可以用于以下几种场合。

保存用户登录状态

- 例如将用户id存储于一个cookie内，这样当用户下次访问该页面时就不需要重新登录了，现在很多论坛和社区都提供这样的功能。cookie还可以设置过期时间，当超过时间期限后，cookie就会自动消失。因此，系统往往可以提示用户保持登录状态的时间：常见选项有一个月、三个月、一年等。

跟踪用户行为

- 例如一个天气预报网站，能够根据用户选择的地区显示当地的天气情况。如果每次都需要选择所在地是烦琐的，当利用了 cookie后就会显得很人性化了，系统能够记住上一次访问的地区，当下次再打开该页面时，它就会自动显示上次用户所在地区的天气情况。因为一切都是在后台完成，所以这样的页面就像为某个用户所定制的一样，使用起来非常方便。

定制页面

- 如果网站提供了换肤或更换布局的功能，那么可以使用cookie来记录用户的选项，例如：背景色、分辨率等。当用户下次访问时，仍然可以保存上一次访问的界面风格

创建购物车

- 使用cookie来记录用户需要购买的商品一样，在结账的时候可以统一提交。例如淘宝网就使用cookie记录了用户曾经浏览过的商品，方便随时进行比较

当然，上述应用仅仅是cookie能完成的部分应用，还有更多的功能需要全局变量。cookie的缺点主要集中于安全性和隐私保护。主要包括以下几种：

- cookie可能被禁用。当用户非常注重个人隐私保护时，他很可能禁用浏览器的cookie功能；
- cookie是与浏览器相关的。这意味着即使访问的是同一个页面，不同浏览器之间所保存的cookie也是不能互相访问的；
- cookie可能被删除。因为每个cookie都是硬盘上的一个文件，因此很有可能被用户删除；
- cookie安全性不够高。所有的cookie都是以纯文本的形式记录于文件中，因此如果要保存用户名密码等信息时，最好事先经过加密处理。

#### 设置cookie
```
document.cookie="userId=828"; 
document.cookie="userId=828; userName=hulk"; 
```

#### 获取cookie的值
```
document.cookie
```

#### 给cookie设置终止日期
```
document.cookie="userId=828; expiress=GMT_String"; 
其中GMT_String是以GMT格式表示的时间字符串
```

#### 删除cookie

为了删除一个cookie，可以将其过期时间设定为一个过去的时间
```
    //获取当前时间 
    var date=new Date(); 
    //将date设置为过去的时间 
    date.setTime(date.getTime()-10000); 
    //将userId这个cookie删除 
    document.cookie="userId=828; expires="+date.toGMTString(); 
```

#### js对cookie操作方法代码

```
/**
     * 添加cookie
     * @param name cookie名称
     * @param value cookie值
     * @param expiresHours 多少小时后过期
     */
    function addCookie(name,value,expiresHours){
        var cookieString=name+"="+escape(value);
        //判断是否设置过期时间
        if(expiresHours>0){
            var date=new Date();
            date.setTime(date.getTime+expiresHours*3600*1000);
            cookieString=cookieString+"; expires="+date.toGMTString();
        }
        document.cookie=cookieString;
    }

    /**
     * 获得指定名称的cookie
     * @param name cookie名称
     * @returns  返回cookie值
     */
    function getCookie(name){
        var strCookie=document.cookie;
        var arrCookie=strCookie.split("; ");
        for(var i=0;i<arrCookie.length;i++){
            var arr=arrCookie[i].split("=");
            if(arr[0]==name)return arr[1];
        }
        return "";
    }

    /**
     * 删除指定名称的cookie
     * @param name cookie名称
     */
    function deleteCookie(name){
        var date=new Date();
        date.setTime(date.getTime()-10000);
        document.cookie=name+"=v; expires="+date.toGMTString();
    }
```

---
## localStorage

这是一种持久化的存储方式，也就是说如果不手动清除，数据就永远不会过期。
使用方法：

- localStorage.length 获得storage中的个数
- localStorage.key(n) 获得storage中第n个元素对的键值（第一个元素是0）
- localStorage.getItem(key)获取键值key对应的值
- localStorage.key 获取键值key对应的值
- localStorage.setItem(key, value) 添加数据，键值为key，值为value
- localStorage.removeItem(key) 移除键值为key的数据
- localStorage.clear() 清除所有数据

---
## sessionStorage

和服务器端使用的SESSION类似，是一种会话级别的缓存，关闭浏览器会数据会被清除。
使用方法：

- sessionStorage.length获得storage中的个数
- sessionStorage.key(n)获得storage中第n个元素对的键值（第一个元素是0）
- sessionStorage.getItem(key)获取键值key对应的值
- sessionStorage.key 获取键值key对应的值
- sessionStorage.setItem(key, value)添加数据，键值为key，值为value
- sessionStorage.removeItem(key)移除键值为key的数据
- sessionStorage.clear()清除所有数据

---
## globalStorage

这个是Firefox浏览器特有的，也是一种持久化的存储
使用方法：
- globalStorage['developer.mozilla.org'] —— 在developer.mozilla.org下面所有的子域都可以通过这个存储对象来进行读和写。
- globalStorage['mozilla.org'] —— 在mozilla.org域名下面的所有网页都可以通过这个存储对象来进行读和写。
- globalStorage['org'] —— 在.org域名下面的所有网页都可以通过这个存储对象来进行读和写。
- globalStorage[''] —— 在任何域名下的任何网页都可以通过这个存储对象来进行读和写。

方法属性：
- setItem(key, value) —— 设置或重置 key 值。
- getItem(key) —— 获取 key 值。
- removeItem(key) —— 删除 key 值。

设置 key 值：window.globalStorage["planabc.net"].key = value;

获取 key 值：value = window.globalStorage["planabc.net"].key;

