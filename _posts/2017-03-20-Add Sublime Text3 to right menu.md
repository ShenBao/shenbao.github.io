---
layout:     post
title:      "将Sublime Text3添加到右键菜单中"
subtitle:   "用Sublime Text3演示Windows注册和取消注册一个dll或者ocx的方法"
date:       2017-03-20  15:00:00
author:     "ShenBao"
catalog: true
tags:
    - Sublime
---

# Foreword

自从用上了VS Code之后，就再也没用Sublime了，今天有同事问Sublime修改注册表之后怎么没有Icon，于是乎我就好奇查了一下，便总结了下来。


## 方法一（推荐）

把以下代码，复制到SublimeText3的安装目录，然后重命名为：sublime_addright.inf，然后右击安装就可以了。

PS：重命名文件之前，需要先在工具--文件夹选项，查看中，把隐藏已知文件类型的扩展名前边的复选框不勾选。

```
[Version]
Signature="$Windows NT$"

[DefaultInstall]
AddReg=SublimeText3

[SublimeText3]
hkcr,"*\\shell\\SublimeText3",,,"用 SublimeText3 打开"
hkcr,"*\\shell\\SublimeText3\\command",,,"""%1%\sublime_text.exe"" ""%%1"" %%*"
hkcr,"Directory\shell\SublimeText3",,,"用 SublimeText3 打开"
hkcr,"*\\shell\\SublimeText3","Icon",0x20000,"%1%\sublime_text.exe, 0"
hkcr,"Directory\shell\SublimeText3\command",,,"""%1%\sublime_text.exe"" ""%%1"""
```



## 方法二、

把以下代码，复制到SublimeText3的安装目录，然后重命名为：sublime_addright.reg，然后双击就可以了。

PS:需要把里边的Sublime的安装目录，替换成实际的Sublime安装目录。

```
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\*\shell\SublimeText3]
@="用 SublimeText3 打开"
"Icon"="C:\\Program Files\\Sublime Text 3\\sublime_text.exe,0"

[HKEY_CLASSES_ROOT\*\shell\SublimeText3\command]
@="C:\\Program Files\\Sublime Text 3\\sublime_text.exe %1"


[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3]
@="用 SublimeText3 打开"
"Icon"="C:\\Program Files\\Sublime Text 3\\sublime_text.exe,0"

[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3\command]
@="C:\\Program Files\\Sublime Text 3\\sublime_text.exe %1"
```

## 删除右键菜单的脚本

把以下代码，复制到SublimeText3的安装目录，然后重命名为：sublime_delright.reg，然后双击就可以了。

```
Windows Registry Editor Version 5.00
[-HKEY_CLASSES_ROOT\*\shell\SublimeText3]
[-HKEY_CLASSES_ROOT\Directory\shell\SublimeText3]
```

## 参考

[Windows 注册和取消注册一个dll或者ocx](https://my.oschina.net/adairs/blog/634643)<br>
[https://tieba.baidu.com/p/4204454313](https://tieba.baidu.com/p/4204454313)<br>
[http://blog.csdn.net/rurud/article/details/52959165](http://blog.csdn.net/rurud/article/details/52959165)





