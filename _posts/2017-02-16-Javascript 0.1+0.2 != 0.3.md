---
layout:     post
title:      "JavaScript中0.1+0.2不等于0.3"
subtitle:   "JS中IEEE754关于浮点数二进制的探讨"
date:       2017-02-16 22:00:00
author:     "ShenBao"
header-img: "img/common/1003.jpg"
catalog: true
tags:
    - JavaScript
    - IEEE754
---

前两天看了小胡子哥写了一篇js中浮点数运算的一个比较特殊的 0.1+0.2 的问题， [揭秘 0.1 + 0.2 != 0.3](http://www.barretlee.com/blog/2016/09/28/ieee754-operation-in-js/?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io) ,于是查各种资料，将包括IEEE754关于浮点数二进制的只是又整理一下，做此记录。

<!--https://shenbao.github.io/2017/02/16/Javascript-0.1+0.2-!=-0.3/-->

知乎上关于这个问题的探讨： [去知乎](https://www.zhihu.com/question/24415787)

![01.png](/img/201702/16/01.png "01.png")
上图是IEEE对浮点数表示的说明，这里分单精度与双精度之分，如下图：
![02.png](/img/201702/16/02.png "02.png")

对于单精度浮点数，采用32位存储，最高的1位是符号位s，接着的8位是指数E，剩下的23位为有效数字M。

对于双精度浮点数，采用64位存储，最高的1位是符号位S，接着的11位是指数E，剩下的52位为有效数字M。

在单精度浮点格式中，s、exp和frac字段分别为 1 位、k = 8 位和 n = 23 位，得到一个 32 位的表示。 在双精度浮点格式(C 语言中的 double)中，s、exp 和 frac 字段分别为 1 位、k = 11 位和 n = 52 位，得到一个 64 位的表示。

根据 exp 的值，被编码的值可以分成三种不同的情况(最后一种情况有两 个变种)。下图说明了对单精度格式的情况。


![03.png](/img/201702/16/03.png "03.png")
![04.png](/img/201702/16/04.png "04.png")
![05.png](/img/201702/16/05.png "05.png")
![06.png](/img/201702/16/06.png "06.png")

好了，下面我们重点关注一下情况1，并举例来看，不然实在头大啊。以单精度举例。

## 浮点数转换为二进制

浮点数转换成二进制，我们要将整数部分和小数部分分开，整数部分采用除2取余，小数部分采用乘2取整。

例如，13.125 转换为二进制：

1.整数部分

```
        13
    ÷   2
--------------       ↑
        6    1       |
    ÷   2            |
--------------       |
        3    0       |
    ÷   2            |
--------------       |
        1    1       |    
    ÷   2            |
--------------       |
        0    1    ----
```

逆序将余数拼上得到13的二进制：1101

2.小数部分

```
        0.125
    x       2        ----
-----------------       |
        0.25    0       |
    x      2            |
-----------------       |
        0.5     0       |
    x     2             |
-----------------       |
        1.0     1       ↓
```

得到小数部分的二进制：0.001

两部分相加，得到13.125的二进制： 1101.001

好了，到现在，我们知道了如何将浮点数转换为二进制表示，也知道了IEEE中浮点数的存储方式，那么，我们接下来用13.125这个例子来看看计算机中具体是如何表示的呢。

二进制 1101.001 可以写成 1.101001 * 2^3 ，即这里 M 为 1.101001,E为3,s为0。

单精度下，符号位s即为0,阶码字段exp的值e=E+127，即e=3+127=130，130的二进制表示为 10000010 

小数字段，frac为尾数M的二进制，即1.101001

那么，在单精度下，计算机中的表示为：

```
0  10000010  101001 00000000000000000
-------------------------------------
s  exp       frac
```

## 0.1+0.2

好了，关于浮点数转换二进制，以及浮点数的表示我们都知道了，那么，现在我们来看看，为什么 0.1+0.2!=0.3 的吧。首先，我们还是先看看js里到底输出多少吧：

```
> 0.1+0.2
0.30000000000000004
```

## 0.1的二进制

```
    0.1
x     2
-------
    0.2     0
x     2
-------
    0.4     0
x     2
-------
    0.8     0
x     2
-------
    0.6     1
x     2
-------
    0.2     1
------- 又从0.2开始循环了
```
于是，我们得到了0.1的二进制表示，即为 0.0001100110011(0011循环) ，即 1.100110011(0011)*2^-4 
即，M 1.100110011(0011),E -4,

那么，s=0,e=-4+1023=1019,

那么，js中由于是双精度的，那么0.1的表示为：

```
0  01111111011  1001100110011001100110011001100110011001100110011001
--------------------------------------------------------------------
s  exp(11位)     frac(52位)
```

## 0.2的二进制

```
    0.2
x     2
-------
    0.4     0
x     2
-------
    0.8     0
x     2
-------
    0.6     1
x     2
-------
    0.2     1
------- 又从0.2开始循环了
```

0.2的二进制表示： 0.001100110011(0011循环) ，即 1.100110011(0011)*2^-3 
那么，js双精度0.2的表示：

## 浮点数运算

浮点数的加减运算一般由以下五个步骤完成：

- 对阶
- 尾数运算
- 结果规格化
- 舍入处理
- 溢出判断


#### 1.对阶

将两个进行运算的浮点数的阶码对齐的操作。对阶的目的是为使两个浮点数的尾数能够进行加减运算。因为，当进行Mx·2Ex与My·2Ey加减运算时，只有使两浮点数的指数值部分相同，才能将相同的指数值作为公因数提出来，然后进行尾数的加减运算。

对阶的具体方法是：首先求出两浮点数阶码的差，即⊿E＝Ex-Ey，将小阶码加上⊿E，使之与大阶码相等，同时将小阶码对应的浮点数的尾数右移相应位数，以保证该浮点数的值不变。几点注意：

（1）对阶的原则是小阶对大阶，之所以这样做是因为若大阶对小阶，则尾数的数值部分的高位需移出，而小阶对大阶移出的是尾数的数值部分的低位，这样损失的精度更小。

（2）若⊿E＝0，说明两浮点数的阶码已经相同，无需再做对阶操作了。

（3）采用补码表示的尾数右移时，符号位保持不变。

（4）由于尾数右移时是将最低位移出，会损失一定的精度，为减少误差，可先保留若干移出的位，供以后舍入处理用。

#### 2. 尾数运算

尾数运算就是进行完成对阶后的尾数相加减。这里采用的就是我们前面讲过的纯小数的定点数加减运算。

#### 3. 结果规格化

在机器中，为保证浮点数表示的唯一性，浮点数在机器中都是以规格化形式存储的。对于IEEE754标准的浮点数来说，就是尾数必须是1.M的形式。由于在进行上述两个定点小数的尾数相加减运算后，尾数有可能是非规格化形式，为此必须进行规格化操作。 规格化操作包括左规和右规两种情况。 左规操作：将尾数左移，同时阶码减值，直至尾数成为1.M的形式。例如，浮点数0.0011·25是非规格化的形式，需进行左规操作，将其尾数左移3位，同时阶码减3，就变成1.1100·22规格化形式了。 右规操作：将尾数右移1位，同时阶码增1，便成为规格化的形式了。要注意的是，右规操作只需将尾数右移一位即可，这种情况出现在尾数的最高位（小数点前一位）运算时出现了进位，使尾数成为10.xxxx或11.xxxx的形式。例如，10.0011·25右规一位后便成为

1.00011·26的规格化形式了。

#### 4. 舍入处理

浮点运算在对阶或右规时，尾数需要右移，被右移出去的位会被丢掉，从而造成运算结果精度的损失。为了减少这种精度损失，可以将一定位数的移出位先保留起来，称为保护位，在规格化后用于舍入处理。 IEEE754标准列出了四种可选的舍入处理方法：

（1）就近舍入（round to nearest） 这是标准列出的默认舍入方式，其含义相当于我们日常所说的“四舍五入”。例如，对于32位单精度浮点数来说，若超出可保存的23位的多余位大于等于100…01，则多余位的值超过了最低可表示位值的一半，这种情况下，舍入的方法是在尾数的最低有效位上加1；若多余位小于等于011…11，则直接舍去；若多余位为100…00，此时再判断尾数的最低有效位的值，若为0则直接舍去，若为1则再加1。

（2）朝+∞舍入（round toward +∞） 对正数来说，只要多余位不为全0，则向尾数最低有效位进1；对负数来说，则是简单地舍去。

（3）朝-∞舍入（round toward -∞） 与朝+∞舍入方法正好相反，对正数来说，只是简单地舍去；对负数来说，只要多余位不为全0，则向尾数最低有效位进1。

（4）朝0舍入（round toward 0） 即简单地截断舍去，而不管多余位是什么值。这种方法实现简单，但容易形成累积误差，且舍入处理后的值总是向下偏差。


#### 5. 溢出判断

与定点数运算不同的是，浮点数的溢出是以其运算结果的阶码的值是否产生溢出来判断的。若阶码的值超过了阶码所能表示的最大正数，则为上溢，进一步，若此时浮点数为正数，则为正上溢，记为+∞，若浮点数为负数，则为负上溢，记为-∞；若阶码的值超过了阶码所能表示的最小负数，则为下溢，进一步，若此时浮点数为正数，则为正下溢，若浮点数为负数，则为负下溢。正下溢和负下溢都作为0处理。

#### 计算0.1+0.2

0.1的阶码-4,0.2的阶码-3,对阶阶段，将0.1的阶码变为-3，然后0.1的尾数部分：

可能会有人问，这里最高位怎么是1，移位后不应该是0么，别忘了，尾数部分我们隐含了一个最高位是1的条件，因此，移位后，会将该位一并移过来。

将其与0.2的尾数部分进行相加：
```
    1100110011001100110011001100110011001100110011001100
+   1001100110011001100110011001100110011001100110011001
    ----------------------------------------------------
  100110011001100110011001100110011001100110011001100111
```

注意，这里计算时，进位2位，去除原来最高位默认的1，相当于阶码部分加1，即由原来的-3变为-2，那么，阶码部分的表示：

而尾数部分，去除最高位1，最后一位1，进行舍入，得到52位新的二进制表示：

即，最后计算的结果如下：

该数表示的即0.1+0.2的结果 2^-2 * 1.0011001100110011001100110011001100110011001100110100 
将其转换成十进制数为： 0.3000000000000000444089209850062616169452667236328125 
由于精度问题，只取到 0.30000000000000004

到这里，在推演的过程中，真心觉得，人工推演二进制真累啊，十分感谢计算机前辈，设计出方案并实践于计算机，感谢。


##  浮点解决方案

[BigDecimal.js](https://github.com/dtrebbien/BigDecimal.js "https://github.com/dtrebbien/BigDecimal.js") 

[big.js](https://github.com/MikeMcl/big.js "https://github.com/MikeMcl/big.js")

