---
layout:     post
title:      "W3Cschool - 初级脚本算法题"
subtitle:   "JavaSCript primary algorithm"
date:       2017-01-18 18:00:00
author:     "ShenBao"
catalog: true
tags:
    - JavaScript
---


## 前言

偶然看到W3Cschool上有个编程挑战，里面的题目前是面向前端方面的，也有一些算法和数据结构的题在，我花了两天的时间把16道初级脚本算法的题完成并做一个思路分享，从中有一定的收获，题目从实际出发，需要灵活运用各个JS对象的属性和方法才能完成，反复的加深了我对这些方法的认识和理解以及运用，也锻炼了我的逻辑思维能力。做这些题确实很有帮助，以后有时间每天再去做一两道中级的，最后再整理出来把我的解法和思路与大家共享。


## 翻转字符串
先把字符串转化成数组，再借助数组的reverse方法翻转数组顺序，最后把数组转化成字符串。你的结果必须得是一个字符串
```
function reverseString(str) {
            var arr = [];
            arr = str.split("");
            arr.reverse();
            str = arr.join("");
            return str;

        }
        console.log(reverseString("hello"));
```
知识点：

    - split() 把字符串分割为字符串数组。
    - reverse() 反转数组的元素顺序。
    - join() 把数组转换为字符串，并返回结果。


## 阶乘算法挑战
计算一个整数的阶乘如果用字母n来代表一个整数，阶乘代表着所有小于或等于n的整数的乘积。
```
// //for循环
// function factorialize(num) {
//     var i = 1
//     var sum = 1;
//     for (; i < num + 1; i++) {
//         sum = sum * i;
//     }
//     return sum;
// }

// 递归实现  
function factorialize(num) {
    if (num == 1 || num == 0)
        return 1;
    else {
        return factorialize(num - 1) * num;
    }

}
console.log(factorialize(0));
```

## 回文算法挑战
如果一个字符串忽略标点符号、大小写和空格，正着读和反着读一模一样，那么这个字符串就是palindrome(回文)。

- 你需要去掉字符串多余的标点符号和空格
- 然后把字符串转化成小写来验证此字符串是否为回文。
```
function palindrome(str) {
    //传入字符串处理
    var newstr = str.replace(/[^0-9a-z]/gi, "");
    newstr = newstr.toLowerCase();
    // // 方法一
    // //转换成数组并进行反向排序
    // var arr = newstr.split("");
    // arr.reverse();
    // //把排序后的转换为字符串进行全等判断
    // arr = arr.join("");
    // if (newstr === arr) {
    //     return true;
    // } else {
    //     return false;
    // }
    //方法二 从字符串头部和尾部，逐次向中间检测
    for (var i = 0, j = newstr.length - 1; i < j; i++, j--) {
        //这里注意下，for循环内部只判断不符合要求的，
        //如果循环后都没返回false就在for外部返回true，不要在内部直接返回true或提前出来
        if (newstr.charAt(i) !== newstr.charAt(j)) {
            return false;
        }
    }

    return true;
}
```


## 寻找最长的单词算法挑战
找到提供的句子中最长的单词，并计算它的长度。函数的返回值应该是一个数字。
```
function findLongestWord(str) {
    var arr = str.split(" "),
        i = 0,
        maxLengthNum = 0;
    // var index = i + 1;
    //方法一：复杂化方法：冒泡排序解法（直接第一个想到就是这个，就顺着来做了，发现复杂化，
    //只需要把数组长度和最大值取出来做比较就行了）
    //     for (; i < arr.length - 1; i++) {
    //         for (; index < arr.length; index++) {
    //             if (arr[i].length < arr[index].length) {
    //                 var temp = arr[i];
    //                 arr[i] = arr[index];
    //                 arr[index] = temp;
    //             }
    //         }
    //     }
    //     return arr[0].length;

    //方法二：取出数组长度值与历史最大值比较，第一个默认为起始最大值
    for (; i < arr.length; i++) {
        if (arr[i].length > maxLengthNum) {
            maxLengthNum = arr[i].length;
        }
    }
    return maxLengthNum;
}

findLongestWord("The quick brown fox jumped over the lazy dog");
```

## 设置首字母大写算法挑战
确保字符串的每个单词首字母都大写，其余部分小写。
```
//方法一：复杂化，没有使用charAt+replace、map() + slice()
// function titleCase(str) {
//     var arr = str.toLowerCase().split(" ");
//     var newArr = new Array();
//     var i = 0;
//     for (; i < arr.length; i++) {
//         newArr[i] = arr[i].split("");
//         newArr[i][0] = newArr[i][0].toUpperCase();
//         newArr[i] = newArr[i].join("");
//     }
//     arr = newArr.join(" ");
//     console.log(arr);
//     return arr;
// }

//方法二：简单化用replace替换首字母大写
// function titleCase(str) {
//     var arr = str.toLowerCase().split(" ");
//     var i = 0;
//     for (; i < arr.length; i++) {
//         var Up = arr[i].charAt(0).toUpperCase();
//         arr[i] = arr[i].replace(arr[i].charAt(0), Up);
//     }
//     return arr.join(" ");
// }

//方法三:map() + replace()
function titleCase(str) {
    var arr = str.toLowerCase().split(" ").map(function(word) {
        return (word.charAt(0).toUpperCase() +
            word.slice(1));
    }).join(" ");
    console.log(arr);
    return arr;
}
titleCase("I'm a little tea pot");
```


## 寻找数组中的最大值算法挑战
右边大数组中包含了4个小数组，分别找到每个小数组中的最大值，然后把它们串联起来，形成一个新数组。

方法一：
```
function largestOfFour(arr) {
    var i = 0,
        j = 0,
        maxArr = [];
    for (; i < arr.length; i++) {
        var max = 0; //内部循环后，比较值要清空一次。
        for (; j < arr[i].length; j++) {
            if (arr[i][j] > max) {
                max = arr[i][j];
            }
        }
        maxArr.push(max);
    }
    return maxArr;
}
largestOfFour([
    [13, 27, 18, 26],
    [4, 5, 1, 3],
    [32, 35, 37, 39],
    [1000, 1001, 857, 1]
]);
```
方法二：
```
function largestOfFour(arr) {
    var i = 0;
    var maxArr =[];
    for (; i < arr.length; i++) {               
        for (var j = 0; j < arr[i].length; j++) {
            if (j===0) {
                maxArr[i] = arr[i][j];
            }else{
                //采用Math对象的max方法取值优化内部循环性能
                maxArr[i]=Math.max(maxArr[i],arr[i][j]);
            }
        }
    }
    return maxArr;
}
```

## 确认末尾字符算法挑战
检查一个字符串(str)是否以指定的字符串(target)结尾。
```
//方法一：使用lastIndexOf从最后开始查找，并返回对应的起始位置到其索引，再做比较，indexOf也可实现返回索引
// function confirmEnding(str, target) {
//     var index = str.lastIndexOf(target);
//     return index == str.length - target.length;
// }

//方法二：使用substr抽取出字符，用负数来实现从末尾抽对应的查询字符的长度
//如果查找的字符实在最后出现，则抽取出来的应该和需要查找的一样，同理slice也可以实现提取
function confirmEnding(str, target) {
    var endingPart = str.substr(-(target.length));
    return target === endingPart;
}
console.log(confirmEnding("Walking on water and developing software from a are easy if both are frozen specification", "specification"));
```

## 重复操作算法挑战
重复一个指定的字符串 num次，如果num是一个负数则返回一个空字符串。

```
function repeat(str, num) {
    var temp = str,
        i = 0;
    if (num < 0) {
        return "";
    } else {
        for (; i < num - 1; i++) {
            str = str.concat(temp);
        }
    }
    return str;
}
console.log(repeat("abc", 3));
```

## 字符串截取算法挑战
如果字符串的长度比指定的参数num长，则把多余的部分用...来表示。切记，插入到字符串尾部的三个点号也会计入字符串的长度。但是，如果指定的参数num小于或等于3，则添加的三个点号不会计入字符串的长度。
```
function truncate(str, num) {
    var more = "...";
    // Clear out that junk in your trunk
    if (str.length <= num) {
        if (num <= 3) {
            var newStr = str.substr(0, num);
            str = newStr.concat(more);
        } else
            return str;
    } else {
        if (num <= 3) {
            var newStr = str.substr(0, num);
            str = newStr.concat(more);
        } else {
            var newStr = str.substr(0, num - 3);
            str = newStr.concat(more);
        }

    }
    return str;
}
console.log(truncate("Absolutely Longer", 2));
```

## 数组分割算法挑战
猴子吃香蕉可是掰成好几段来吃哦！

把一个数组arr按照指定的数组大小size分割成若干个数组块。

例如:chunk([1,2,3,4],2)=[[1,2],[3,4]];

chunk([1,2,3,4,5],2)=[[1,2],[3,4],[5]];
```
function chunk(arr, size) {
    // Break it up.
    var newArr = [];
    var index = 0,
        end = size,
        i = 0;
    var count = arr.length / size;
    console.log(count);
    for (; i < count; index += size) {
        newArr[i] = arr.slice(index, end);
        end = end + end;
        i++;
    }
    return newArr;
}
    console.log(chunk([0, 1, 2, 3, 4, 5, 6], 3));
```

## 数组截断算法挑战
返回一个数组被截断n个元素后还剩余的元素，截断从索引0开始。

方法一：
```
function slasher(arr, howMany) {
    if (arr.length > howMany) {
        arr = arr.slice(-(arr.length - howMany));
        return arr;
    } else return [];

}
console.log(slasher([1, 2, 3], 4));
```
方法二：
```
function slasher(arr, howMany) {
    for (var i = 0; i < howMany; i++) {
        //使用数组对象shift()方法，把数组的第一个元素从其中删除，并返回第一个元素的值。
        arr.shift();
    }
    return arr;
}

```

## 数组查询算法挑战
蛤蟆可以吃队友，也可以吃对手。

如果数组第一个字符串元素包含了第二个字符串元素的所有字符，函数返回true。

举例，["hello", "Hello"]应该返回true，因为在忽略大小写的情况下，第二个字符串的所有字符都可以在第一个字符串找到。["hello", "hey"]应该返回false，因为字符串"hello"并不包含字符"y"。["Alien", "line"]应该返回true，因为"line"中所有字符都可以在"Alien"找到。

```
function mutation(arr) {
    var count = 0,
        newArr, i = 0;
    newArr = arr.join(" ");
    newArr = newArr.toLowerCase().split(" ");
    newArr[0] = newArr[0].split("");
    newArr[1] = newArr[1].split("");
    console.log(newArr);
    for (; i < newArr[1].length; i++) {
        var index = 0;
        for (; index < newArr[0].length; index++) {
            if (newArr[1][i] == newArr[0][index]) {
                count++;
                index = newArr[0].length;
            }
        }
        console.log(count);
    }
    return count === arr[1].length;
}
console.log(mutation(["floor", "for"]));

```


## 删除数组中特定值算法挑战
删除数组中的所有假值。在JavaScript中，假值有false、null、0、""、undefined 和 NaN。
```
function bouncer(arr) {
    var index = 0;
    // Don't show a false ID to this bouncer.
    for (; index < arr.length; index++) {
        if (!arr[index]) {
            arr.splice(index, 1);
            //保证删除数组元素后，索引不跳过下一个
            index--; 
        }
    }
    return arr;
}
console.log(bouncer([7, "ate", "", false, 9]));
```

## 去除数组中任意多个值算法挑战
实现一个摧毁(destroyer)函数，第一个参数是待摧毁的数组，其余的参数是待摧毁的值。
```
function destroyer(arr, del1, del2, del3) {
    var newDel = [del1, del2, del3],
        index = 0;
    for (; index < newDel.length; index++) {
        var i = 0;
        for (; i < arr.length; i++) {
            if (arr[i] == newDel[index]) {
                arr.splice(i, 1);
                i--;
            }
        }
    }
    return arr;
}
console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));
```

## 数组排序并插入值算法挑战
先给数组排序，然后找到指定的值在数组的位置，最后返回位置对应的索引。

举例：where([1,2,3,4], 1.5) 应该返回 1。因为1.5插入到数组[1,2,3,4]后变成[1,1.5,2,3,4]，而1.5对应的索引值就是1。

同理，where([20,3,5], 19) 应该返回 2。因为数组会先排序为 [3,5,20]，19插入到数组[3,5,20]后变成[3,5,19,20]，而19对应的索引值就是2。

```
function where(arr, num) {
        arr.push(num);
        var i = 0,
            index = 0;
        for (; i < arr.length - 1; i++) {
            var j = i + 1;
            for (; j < arr.length; j++) {
                if (arr[i] > arr[j]) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        for (; index < arr.length; index++) {
            if (arr[index] == num) {
                return index;
            }
        }
    }
    console.log(where([2, 20, 10], 19));

```


## 位移密码算法挑战
下面我们来介绍风靡全球的凯撒密码Caesar cipher，又叫移位密码。

移位密码也就是密码中的字母会按照指定的数量来做移位。

一个常见的案例就是ROT13密码，字母会移位13个位置。由'A' ↔ 'N', 'B' ↔'O'，以此类推。

写一个ROT13函数，实现输入加密字符串，输出解密字符串。

所有的字母都是大写，不要转化任何非字母形式的字符(例如：空格，标点符号)，遇到这些特殊字符，跳过它们。

方法一：
```
function rot13(str) { // LBH QVQ VG!
    var arr = [];
    for (var index = 0; index < str.length; index++) {
        arr[index] = str.charCodeAt(index);
        if (arr[index] >= 65 && arr[index] <= 77) {
            arr[index] += 13;
        }
        //字母为26个当在字母末13个位，右移13位不是字母，应该进行左移、保证在字母26位里。
        else if (arr[index] > 77 && arr[index] < 91)
            arr[index] -= 13;
    }
    for (var i = 0; i < arr.length; i++) {
        arr[i] = String.fromCharCode(arr[i]);
    }
    return arr.join("");
}
// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));
```

方法二:
```
function rot13(str) {
    var a = [];
    for (var i = 0; i <
        str.length; i++) {
        a[i] = str.charCodeAt(i);
        if (a[i] >= 65 && a[i] <= 90) {
            a[i] = a[i] + 13;
            //优化处
            if (a[i] > 90) {
                a[i] = a[i] - 91 + 65;
            }
        }
    }
    for (var j = 0; j <
        a.length; j++) {
        a[j] = String.fromCharCode(a[j]);
    }
    return a.join("");
}
```




