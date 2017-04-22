---
layout:     post
title:      "mysql安装配置"
subtitle:   "安装及错误处理"
date:       2017-04-11 20:00:00
author:     "ShenBao"
catalog: true
tags:
    - mysql
---

# mysql安装配置


## 下载

```
http://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.11-winx64.zip
```

## 解压缩zip包

```
D:\Program Files\mysql-5.7.11-winx64
``` 

## 配置环境变量

### 添加path路径

```
D:\Program Files\mysql-5.7.11-winx64\bin
```

### 修改mysql-default.ini配置文件

原
```
# These are commonly set, remove the # and set as required.
# basedir = .....
# datadir = .....
# port = .....
# server_id = .....
```
改为
```
# These are commonly set, remove the # and set as required.
 basedir = D:\Program Files\mysql-5.7.11-winx64
 datadir = D:\Program Files\mysql-5.7.11-winx64\Data
 port = 3306
# server_id = .....
```

## 以管理员身份进入命令提示符 cmd

<b>重要：管理员权限进入<b>

```
D:\Program Files\mysql-5.7.11-winx64\bin>
```

执行mysqld.exe --initialize 命令，

```
D:\Program Files\mysql-5.7.11-winx64\bin>mysqld.exe --initialize
```

创建了data目录

## 执行 mysqld -install命令

```
D:\Program Files\mysql-5.7.11-winx64\bin>mysqld -install
Service successfully installed.  //成功安装服务
```

## 执行mysqld.exe -nt --skip-grant-tables

注意：窗口无反应

```

D:\Program Files\mysql-5.7.11-winx64\bin>mysqld.exe -nt --skip-grant-tables

```

## 重新打开dos窗口，执行mysql -u root

进入mysql命令行，执行命令use mysql; update user set authtication_string=Password('123456') where user="root"; set password=Password('123456');

```
C:\Users\Administrator>mysqld.exe -nt --skip-grant-tables

C:\Users\Administrator>mysql -u root
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 3
Server version: 5.7.11 MySQL Community Server (GPL)

Copyright (c) 2000, 2016, Oracle and/or its affiliates. All rights reserved.
 
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use mysql
Database changed
mysql> update user set authtication_string=Password('123456') where user="root"
    -> set password=Password('123456')
    ->
```

在任务管理器中终止mysqld进程，开启mysql服务。

安装完成。


## 安装sqlyog10

sqlyog10 图形化窗口操作，方便！！！


## 连接MySQL出错,错误代码1045的解决方法


1、以系统管理员身份登录到系统；

2、如果MySQL服务器正在运行，停止它。

如果是作为Windows服务运行的服务器，进入服务管理器：开始菜单->控制面板->管理工具->服务

如果服务器不是作为服务而运行的，可能需要使用任务管理器来强制停止它。

3、创建1个文本文件，并将下述命令置于单一行中：

```
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('MyNewPassword');
```

用任意名称保存该文件。该文件为C:\mysql-init.txt。

4、进入DOS命令提示：开始菜单->运行-> cmd

假定你已将MySQL安装到C:\mysql。如果你将MySQL安装到了另一位置，请对下述命令进行相应的调整。

在DOS命令提示符下，执行命令：

```
C:\> C:\mysql\bin\mysql --init-file=C:\mysql-init.txt
```

在服务器启动时，执行由“--init-file”选项（作用：在启动时从指定的文件中读取SQL命令）命名的文件的内容，更改根用户密码。当服务器成功启动后，应删除C:\mysql-init.txt。

5、停止MySQL服务器，然后在正常模式下重启它。如果以服务方式运行服务器，应从Windows服务窗口启动它。如果以手动方式启动了服务器，能够像正常情形下一样使用命令。












<!--http://www.cnblogs.com/endv/p/5205435.html-->