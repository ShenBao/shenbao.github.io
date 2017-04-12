---
layout:     post
title:      "mysql安装配置"
subtitle:   "总结一下"
date:       2017-04-11 20:00:00
author:     "ShenBao"
catalog: true
tags:
    - mysql
---



# 下载

```
http://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.11-winx64.zip
```

# 解压缩zip包；

```
D:\Program Files\mysql-5.7.11-winx64
``` 

# 配置环境变量，

## 添加path路径，

```
D:\Program Files\mysql-5.7.11-winx64\bin
```

## 修改mysql-default.ini配置文件，

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

# 以管理员身份进入命令提示符 cmd

<b>重要：管理员权限进入<b>

```
D:\Program Files\mysql-5.7.11-winx64\bin>
```

执行mysqld.exe --initialize 命令，

```
D:\Program Files\mysql-5.7.11-winx64\bin>mysqld.exe --initialize
```

创建了data目录

# 执行 mysqld -install命令

```
D:\Program Files\mysql-5.7.11-winx64\bin>mysqld -install
Service successfully installed.  //成功安装服务
```

# 执行mysqld.exe -nt --skip-grant-tables

注意：窗口无反应

```

D:\Program Files\mysql-5.7.11-winx64\bin>mysqld.exe -nt --skip-grant-tables

```

# 重新打开dos窗口，执行mysql -u root

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


# 安装sqlyog10

sqlyog10 图形化窗口操作，方便！！！





