
官方文档：http://www.thymeleaf.org/doc/tutorials/2.1/usingthymeleaf.html#conditional-expressions


#   介绍

thymeleaf是基于Java的模板引擎，支持xml/xhtml/HTML5。

lthymeleaf在指定的模式下处理文件之前会首先将文件转换为格式良好的XML文件，而此XML文件仍然是完全有效的HTML5.1解析xml方式为SAX.所以web页面要求严格格式，一定要有封闭标签：/> 或 </>


##  引入文件
```
<script type="text/javascript"  th:src="@{/webjars/jquery/1.11.1/jquery.min.js}"></script>  

<script th:src="${url}+'/js/core/jquery.min.js'"></script>
```

##  变量表达式

语法格式为${ }，取得context map的变量.

```
<span th:text = "${title}"></span>
```

##  选择表达式，又名星号表达式

语法格式为*{ }.一般与th:object配合使用，用于获取对象的属性值

```
<span th:object = "${obj}">
    <span th:text = "*{user}"></span>
</span>
```








































#   参考

http://blog.csdn.net/sun_jy2011/article/category/2643051

