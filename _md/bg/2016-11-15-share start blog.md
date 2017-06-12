---
layout:     post
title:      "基于GitHub和Jekyll的博客搭建"
subtitle:   "分享一下博客建立的过程"
date:       2016-11-15  20:00:00
author:     "ShenBao"
header-img: "img/common/1020.jpg"
catalog: true
tags:

---

# Foreword

从突发奇想到现在博客基本框架完成，我自己捣鼓了差不多一周的时间。期间百度、知乎、GitHub、Google了无数的东西，耗掉了很多不必要的时间。所以向趁现在我还记得我遇到了哪些Bug赶紧写一篇分享给大家，哈哈。欢迎你也拥有一个自己的 Personal Web.

# 为什么要用GitHub和Jekyll

* GitHub 是一个开源平台，里面有很多现成的代码，可以很轻易的 Fork 别人的东西。
* GitHub 可以提供免费的300M 空间。对于大多数人来说，发点文字是足足有余的。
* Jekyll 是一个免费的静态站点生成器，网上很多教程都是使用它。我们通过它来建立托管在 GitHub 上的静态网页，较为简单。


## 0.Linux系统下 Jekyll 的搭建

在 Ubuntu*(Linux)*系统下，安装Jekyll只需要几个命令行。

```
//Jekyll是使用ruby语言进行开发的，所以第一步需要安装ruby及ruby相关开发工具
sudo apt-get install ruby1.9.1-dev
sudo apt-get install rubygems
export PATH=$PATH:$HOME/bin:/var/lib/gems/1.8/bin

//接着将ruby的源设置成国内的源，而网上的教程基本都是设置成淘宝的。貌似是这样设置之后可以翻墙
sudo gem sources --remove http://rubygems.org/
sudo gem sources -a https://ruby.taobao.org/

// ubuntu下需要自己安装nodejs, 等一些其他的包(如果没安装下面的包，运行jekyll server会遇到ExecJS::RuntimeUnavailable 错误)
sudo apt-get install python-software-properties$ sudo add-apt-repository ppa:chris-lea/node.js$ sudo apt-get update$ sudo apt-get install nodejs

//安装jekyll
sudo gem install jekyll

//到此，Jekyll环境的搭建结束
```

然而***我是 win10 系统***，所有东西都要自己上网下载。请看下面。
### 1.Ruby
一门开源的动态编程语言，注重简洁和效率。Ruby 的句法优雅，读起来自然，写起来舒适。<br><br>
首先在[官网](http://rubyinstaller.org/downloads/)下载相应版本的安装包。<br><br> 
我使用的是 Ruby2.2.6 和 DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe
<br><br>
ruby的安装需要注意一点，就是将ruby的可执行文件加入到环境变量的PATH中，如下图，将其勾上，然后安装即可。

![1.PNG](/img/Blog/20161115/1.PNG "1.PNG")

接下来我们安装 Ruby DevKit。双击我们刚才下载的 DevKit-mingw64-64-4.7.2-20130224-1432-sfx ，将其解压到某个文件夹下，这里我选择的是 C:\RubyDevKit，解压完毕后，以此输入如下命令：
```
cd C:\RubyDevKit 
ruby dk.rb init
ruby dk.rb install
```
在此普及下呼出运行的快捷键：win + R

最后我们可以用gem -v 和 ruby -v 来确认一下ruby和gem是否已经安装成功.

### 2.Change the Gem's sources
如上所说，这一步我并没有成功...至今不知道原因，但是用着也没啥问题。<br><br>
不过在此还是说一下，万一你成功了呢。
```
//首先将原始的源删掉
gem sources --remove https://rubygems.org/
//添加 taobao 的源
gem sources -a https://ruby.taobao.org/
//更新缓存
gem sources -u
```
## 3.Install the Jekyll
到此终于可以安装 Jekyll 了，只需要一条命令即可。
```
gem install jekyll
```
jekyll 的安装完毕。

## 4.Build your firstblog
我们赶紧来测试一下，你期待已久的博客马上就要诞生了。
```
//路径切换到桌面
cd Desktop
//新建一个 jekyll 结构的文件，名字可以任意。这里使用 firstblog
jekyll new firstblog
//路径切换到刚才新建的文件夹
cd firstblog
//开始你的 blog 之旅吧
jekyll serve

```
然后打开浏览器，输入 http://127.0.0.1:4000/，就可以看到你的原生态博客了。

![3.PNG](/img/Blog/20161115/3.PNG "3.PNG")

## 5.用GitHub展示你的博客

要使用 GitHub ，很明显你首先应该拥有一个 GitHub 账号。So赶紧去[注册](github.com/)一个吧。

拥有账号后，就可以创建New repository了

这个 repository 必须为你的 github 的名字+github+io，即 username.github.io 

这里有三种方式来操控，看你的个人喜好选择一个两个或者三个。<br>

##### 5.1 GitHub
* 1 下载[GitHub Desktop](https://desktop.github.com/)，这是GitHub推出的一个*不太好用*但是又没有别的可以代替的软件
* 2 在GitHub网站上，将你的repository clone到这个Github Desktop中
* 3 你需要知道，repository clone到本地后，默认是储存在C:\Users\Username\Documents\GitHub\username.github.io
* 4 将你刚才新建的 firstblog 里的所有内容复制到 username.github.io 之中
* 5 打开 GitHub Desktop 后，你会发现右上角有一个 Uncommitted changes 提示，在填写完 Commit 信息后，点右上角的 Sync ，等 Syncing 完成后，你本地的文件便成功同步到网络上了*(可能有一点延迟)*。
* 6 在网站中输入 username.github.io 就可以看见我们用 Jekyll 部署的站点已经被部署到 GitHub 上了。
* 7 以后，只要将你更新的内容写到这个 firstblog 中，然后重复4-6步就可以更新你的网站。

##### 5.2 Git 
* 1 前4步同Way1
* 2 在 GitHub Desktop 中，右上角设置里有一个 Open in Git Shell
* 3 在 Git Shell 中输入以下 git 命令来同步。
```
//添加所有文件
git add .
//提交修改信息
git commit -m "firstblog" 
//push到远程仓库
git push origin master
```

##### 5.3 在windows端的git bash
* 1 去[官网](https://git-for-windows.github.io/)下载git for windows 直接安装即可。
* 2 在windows端的git bash下，运行命令如下。<br><br>
```
//将你 GitHub 上的 repository clone 到本地，注意 username 是需要根据你的名字修改的
git clone https://github.com/username/username.github.io.git
//这时桌面上会出现一个 username 文件夹，把 firstblog 下的所有文件复制过去
//然后切换到 username.github.io 文件夹 
cd username.github.io/
//添加所有文件
git add .
//提交修改信息
git commit -m "firstblog" 
//push到远程仓库
git push origin master
```

到此，3种同步的方式介绍完毕。

在此推荐几个很不错的博客，大家可以一键fork 

但是不用着急，请先看完这篇文章。<br>
[suyan](https://github.com/suyan/suyan.github.io)丨
[JimmyLv](https://github.com/JimmyLv/note-blog)丨
[stormzhang](https://github.com/stormzhang/stormzhang.github.com)丨
[Hux](https://github.com/Huxpro/huxpro.github.io)

## 6. 绑定域名
如果没有这一步，那么你个人博客的域名就是username.github.io

如果你不介意，这一步可以跳过；如果你想拥有一个更炫酷的域名，那就去买吧哈哈

域名购买的话，我推荐去[阿里云](https://www.aliyun.com/)，价格可能比隔壁几个卖域名的稍微贵一点，但毕竟名气大点，对域名的某些防御和保护措施稍微好一点。
<br><br>
好的，现在假设你已经拥有自己的域名。
* 在 GitHub 上你的 blog 中新建一个 CNAME 文件，在里面添加你的域名，比如我的就是 phoenixwu.cn
* 到域名服务商那增加你的 CNAME 记录。需要添加两条。记录类型都是CNAME，主机记录分别为 @ 和 www ，记录值是 username.github.io

过一段时间，就可以通过你的域名来访问你在 github 上的 blog 了。

## 7. 制作属于你的Blog
如果只有上面这些步骤，那你的 Blog 中都是别人的东西。<br><br>
如何编写自己的 Blog ？在此推荐一个软件VS code，用着十分方便。
<br><br>

![4.PNG](/img/Blog/20161115/4.PNG "4.PNG")


好了，快去开启你 Blog 的新世界吧！

## 8. 参考资料
[Jekyll + Github 搭建属于你的静态博客](https://bigballon.github.io/posts/jekyll-github.html)<br>
[Jekyll和Github搭建个人静态博客](http://pwnny.cn/original/2016/06/26/MakeBlog.html)


## 报错解决

##### 报错1

报错内容：Dependency Error: Yikes! It looks like you don't have jekyll-paginate or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- jekyll-paginate' If you run into trouble, you can find helpful resources at Getting Help

解决方案：gem install jekyll-paginate


##### 报错2

报错内容：Dependency Error: Yikes! It looks like you don't have bundler or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- bundler' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!

解决方案：gem install bundler
