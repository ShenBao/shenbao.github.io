

## 下载
https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.4.7-signed.msi/download


## 安装

根据你的系统下载 32 位或 64 位的 .msi 文件，下载后双击该文件，按操作提示安装即可。

安装过程中，你可以通过点击 "Custom(自定义)" 按钮来设置你的安装目录。

我安装在C:\mongodb下

安装完成之后，在C:\mongodb目录下创建data文件夹，然后创建db
```
C:\mongodb\data\db
```

`并且将C:\mongodb\bin加入到系统Path中`

## 命令行下运行 MongoDB 服务器

在C:\mongodb\bin 目录下运行
```
 .\mongod.exe --dbpath C:\mongodb\data\db\
```

mongodb默认连接端口27017，如果出现如图的情况，可以打开http://localhost:27017查看（笔者这里是chrome），发现如图则表示连接成功，如果不成功，可以查看端口是否被占用。

Chrome显示
```
It looks like you are trying to access MongoDB over HTTP on the native driver port.
```

## 将MongoDB设置成Windows服务

这个操作就是为了方便，每次开机MongoDB就自动启动了。

在c:\mongodb\data下新建文件夹log（存放日志文件）并且新建文件`mongodb.log`

在d:\mongodb新建文件`mongo.config`


用记事本打开mongo.config输入：
```
dbpath=C:\mongodb\data\db
logpath=C:\mongodb\data\log\mongo.log  
```


用管理员身份打开cmd命令行，进入D:\mongodb\bin目录，输入如下的命令：
```
C:\mongodb\bin>mongod --config C:\mongodb\mongo.config 
有人提醒改为如下：
mongod --config C:\mongodb\mongo.config --install --serviceName "MongoDB"
```

结果存放在日志文件中，查看日志发现已经成功。如果失败有可能没有使用管理员身份，遭到拒绝访问。


打开cmd输入services.msc查看服务可以看到MongoDB服务，点击可以启动。


## 可视化工具

- [Robo 3T 1.1.1](https://robomongo.org/download)
- [NoSQL Manager for MongoDB](https://www.mongodbmanager.com/download) 
- MongoVUe


