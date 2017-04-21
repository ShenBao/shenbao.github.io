

#include 
1.可包含本地文件（不包含VTL） 
2.文件内容不经过template engine处理 
3.出于安全性的考虑，此文件只能位于TEMPLATE_ROOT目录下 

#parse 
1.可以引入包含VTL的模板 
2.任何模板文件只能位于TEMPLATE_ROOT目录下 

一般默认情况下，TEMPLATE_ROOT就是项目的根目录，举个例子： 

#parse("./user/b.html") 此处b.html可以包含velocity代码。 
#include("./user/a.html") 此处a.html不可以包含velocity代码。

## 数组长度
$array.size()

## velocity时间格式化

思想：通过前台展现层（Velocity）中的工具（tools）方法来修改。

具体修改步骤：

- 1、在toolbox.xml配置文件中添加以下代码：
```
<tool>
   <key>date</key>
   <scope>application</scope>
   <class>org.apache.velocity.tools.generic.DateTool</class>
</tool>
```
- 2、在前台页面中需要显示时间的地方添加这样的代码：
```
例如：要显示的时间为：$!user.time
        那么添加的代码为：
   $!date.format('yyyy-MM-dd HH:mm:ss ',$!user.time)
   其中'yyyy-MM-dd HH:mm:ss '格式可以自己定义。
```


- $myarray.isEmpty()数组是否为空
- $myarray.size()获取数组元素个数
- $myarray.get(2)获取数组指定下标的元素
- $myarray.add()增加元素



数组 & 访问

Velocity 访问数组对象，无法通过类似 arr[2] 来访问特定位置的元素。

#set($arr = [0, 1, 2, 3])
$arr.get(2)
注：Velocity 中的数组对应 Java 中的 List 对象。对于 Java 原生 Array 对象， 只能够 #foreach 进行遍历，无法使用 $arr[0] 和 $arr.get(0) 方法。

范围(range)
#foreach($item in [10..20])
$item
#end
对象 & 访问
#set($obj = {“key”:”value”, “name”:”space”})
$obj.get(“key”)

#foreach(#item in $obj)
$item
#end
上面的 $item 取到的是 values，如果需要在遍历对象过程中，同时取到对象的 keys， 可以使用 entrySet() 或 keySet() 方法。

#foreach($item in $!obj.entrySet())
$!item.key : $!item.value
#end

#foreach($item in $obj.keySet())
$item : $obj.get($item)
#end
注： 这种集合的遍历是无序的，即遍历顺序可能不同于 $obj 中元素的定义顺序 （据目前所知，是根据键的字母排序的）。

另外有两种不完美解决方法：

I:
#set($obj = [
{“key”:”key”, “value”:”value”},
{“key”:”name”, “value”:”space”}
])
#foreach($item in $obj)
$item.key : $item.value
#end
II:
#set($obj = [
[“key”,”value”],
[“name”,”space”]
])
#foreach($item in $obj)
$item.get(0) : $item.get(1)
#end
之所以说 不完美 是因为：对于已知的 key，本可以直接

$obj.get(“key”)
现在只能遍历并进行比较取得，而且较早的 Velocity 版本无法使用 #break， 以便在找到匹配项之后立即退出循环。

#foreach($item in $obj)
#if(“key” == $!obj.get(0))
#set($myKey = $!type.get(1))
##break
#end
#end

















