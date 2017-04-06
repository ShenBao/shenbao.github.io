


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