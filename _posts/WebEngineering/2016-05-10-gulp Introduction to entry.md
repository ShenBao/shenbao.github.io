---
layout:     post
title:      "Gulp 入门指南"
subtitle:   "gulp Introduction to entry"
date:       2016-05-10  21:00:00
author:     "ShenBao"
catalog: true
tags:
    - gulp
---

# Foreword

> gulp,用自动化构建工具增强你的工作流程！


Gulp.js 是一个自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见任务。Gulp.js 是基于 Node.js 构建的，利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。Gulp.js 源文件和你用来定义任务的 Gulp 文件都是通过 JavaScript（或者 CoffeeScript ）源码来实现的。


安装 Node 和 gulp
================

gulp 是基于 node 实现的，那么我们就需要先安装 node。

> Node 是一个基于Chrome JavaScript V8引擎建立的一个平台，可以利用它实现 Web服务。

Node官网下载node（自带npm），npm是node 的包管理工具

在终端/命令行中输入 `node -v` 检测node是否安装成功，安装成功会显示出 node 的版本号。

安装gulp（`注意科学上网`）
```
npm install -g gulp 
```
安装时请注意命令行的提示信息，安装完成后可在命令行输入 `gulp -v` 以确认安装成功。

# gulp 命令行（CLI）文档

#### 参数标记

gulp 只有你需要熟知的参数标记，其他所有的参数标记只在一些任务需要的时候使用。

- `-v` 或 `--version` 会显示全局和项目本地所安装的 gulp 版本号
- `--require <module path>` 将会在执行之前 reqiure 一个模块。这对于一些语言编译器或者需要其他应用的情况来说来说很有用。你可以使用多个`--require`
- `--gulpfile <gulpfile path>` 手动指定一个 gulpfile 的路径，这在你有很多个 gulpfile 的时候很有用。这也会将 CWD 设置到该 gulpfile 所在目录
- `--cwd <dir path>` 手动指定 CWD。定义 gulpfile 查找的位置，此外，所有的相应的依赖（require）会从这里开始计算相对路径
- `-T` 或 `--tasks` 会显示所指定 gulpfile 的 task 依赖树
- `--tasks-simple` 会以纯文本的方式显示所载入的 gulpfile 中的 task 列表
- `--color` 强制 gulp 和 gulp 插件显示颜色，即便没有颜色支持
- `--no-color` 强制不显示颜色，即便检测到有颜色支持
- `--silent` 禁止所有的 gulp 日志

命令行会在 process.env.INIT_CW 中记录它是从哪里被运行的。

#### Task 特定的参数标记

参考 [StackOverflow](http://stackoverflow.com/questions/23023650/is-it-possible-to-pass-a-flag-to-gulp-to-have-it-run-tasks-in-different-ways) 了解如何增加任务特定的参数标记。

#### Tasks

Task 可以通过 `gulp <task> <othertask>` 方式来执行。如果只运行 `gulp` 命令，则会执行所注册的名为 `default` 的 task，如果没有这个 task，那么 gulp 会报错。


# gulp API 文档

## gulp.src(globs[, options])

输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。
将返回一个 [Vinyl files](https://github.com/gulpjs/vinyl-fs) 的 [stream](http://nodejs.org/api/stream.html)
它可以被 [piped](http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options) 到别的插件中。

```javascript
gulp.src('client/templates/*.jade')
  .pipe(jade())
  .pipe(minify())
  .pipe(gulp.dest('build/minified_templates'));
```

`glob` 参考 [node-glob 语法](https://github.com/isaacs/node-glob) 或 直接写文件的路径。

### globs
类型： `String` 或 `Array`

所读取的 glob 或者 glob 数组，除了 negation(`!`) 以外的 [node-glob 语法] 均被支持。

一个 `!` 开头的 glob 会在结果中排除掉到这个地方为止的所匹配到的文件。举个例子，考虑如下的目录结构：

    client/
      a.js
      bob.js
      bad.js

下面的表达式匹配到的结果是 `a.js` 和 `bad.js`：

    gulp.src(['client/*.js', '!client/b*.js', 'client/bad.js'])

### options
类型： `Object`

通过 [glob-stream] 所传递给 [node-glob] 的参数。

除了 [node-glob][node-glob 文档] 和 [glob-stream] 所支持的参数（除了 `ignore`）外，gulp 增加了一些额外的选项参数：

##### options.buffer
类型： `Boolean`
默认值： `true`

如果该项被设置为 `false`，那么将会以 stream 方式返回 `file.contents` 而不是文件 buffer 的形式。这在处理一些大文件的时候将会很有用。**注意：**插件可能并不会实现对 stream 的支持。

##### options.read
类型： `Boolean`
默认值： `true`

如果该项被设置为 `false`， 那么 `file.contents` 会返回空值（null），也就是并不会去读取文件。

##### options.base
类型： `String`
默认值： 将会加在 glob 之前 (参考 [glob2base])

如, 请想像一下在一个路径为 `client/js/somedir` 的目录中，有一个文件叫 `somefile.js` ：

```js
gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
  .pipe(minify())
  .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'

gulp.src('client/js/**/*.js', { base: 'client' })
  .pipe(minify())
  .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'
```

## gulp.dest(path[, options])

能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。

```javascript
gulp.src('./client/templates/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./build/templates'))
  .pipe(minify())
  .pipe(gulp.dest('./build/minified_templates'));
```

文件被写入的路径是以所给的相对路径根据所给的目标目录计算而来。类似的，相对路径也可以根据所给的 base 来计算。
请查看上述的 `gulp.src` 来了解更多信息。

### path
类型： `String` or `Function`

文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径，这个函数也可以由 [vinyl 文件实例](https://github.com/gulpjs/vinyl) 来提供。

### options
类型： `Object`

#### options.cwd
类型： `String`
默认值： `process.cwd()`

输出目录的 `cwd` 参数，只在所给的输出目录是相对路径时候有效。

#### options.mode
类型： `String`
默认值： `0777`

八进制权限字符，用以定义所有在输出目录中所创建的目录的权限。

## gulp.task(name [, deps] [, fn])

定义一个使用 [Orchestrator] 实现的任务（task）。

```js
gulp.task('somename', function() {
  // 做一些事
});
```

### name
类型：`String`

任务的名字，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空格。

### deps
类型： `Array`

一个包含任务列表的数组，这些任务会在你当前任务运行之前完成。

```js
gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {
  // 做一些事
});
```

**注意：** 你的任务是否在这些前置依赖的任务完成之前运行了？请一定要确保你所依赖的任务列表中的任务都使用了正确的异步执行方式：使用一个 callback，或者返回一个 promise 或 stream。

你也可以省略最后那个函数，如果你只是想要执行依赖的任务：

```js
gulp.task('mytask', ['array', 'of', 'task', 'names']);
```

**注意：** 这些任务会一次并发执行，因此，请不要假定他们会按顺序开始和结束。

### fn
类型：`Function`

该函数定义任务所要执行的主要操作。通常来说，它会是这种形式：

```js
gulp.task('buildStuff', function() {
  // Do something that "builds stuff"
  var stream = gulp.src(/*some source path*/)
  .pipe(somePlugin())
  .pipe(someOtherPlugin())
  .pipe(gulp.dest(/*some destination*/));

  return stream;
  });
```

#### 异步任务支持

任务可以异步执行，如果 `fn` 能做到以下其中一点：

##### 接受一个 callback

```javascript
// 在 shell 中运行一个命令
var exec = require('child_process').exec;
gulp.task('jekyll', function(cb) {
  // 构建 Jekyll
  exec('jekyll build', function(err) {
    if (err) return cb(err); // return error
    cb(); // 完成 task
  });
});

// 在 pipe 中使用异步的结果
gulp.task('somename', function(cb) {
  getFilesAsync(function(err, res) {
    if (err) return cb(err);
    var stream = gulp.src(res)
      .pipe(minify())
      .pipe(gulp.dest('build'))
      .on('end', cb);
  });
});
```

##### 返回一个 stream

```js
gulp.task('somename', function() {
  var stream = gulp.src('client/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('build'));
  return stream;
});
```

##### 返回一个 promise

```javascript
var Q = require('q');

gulp.task('somename', function() {
  var deferred = Q.defer();

  // 执行异步的操作
  setTimeout(function() {
    deferred.resolve();
  }, 1);

  return deferred.promise;
});
```

**注意：** 默认的，task 将以最大的并发数执行，也就是说，gulp 会一次性运行所有的 task 并且不做任何等待。如果你想要创建一个序列化的 task 队列，并以特定的顺序执行，你需要做两件事：

- 给出一个提示，来告知 task 什么时候执行完毕，
- 并且再给出一个提示，来告知一个 task 依赖另一个 task 的完成。

对于这个例子，让我们先假定你有两个 task，"one" 和 "two"，并且你希望它们按照这个顺序执行：

1. 在 "one" 中，你加入一个提示，来告知什么时候它会完成：可以再完成时候返回一个 callback，或者返回一个 promise 或 stream，这样系统会去等待它完成。

2. 在 "two" 中，你需要添加一个提示来告诉系统它需要依赖第一个 task 完成。

因此，这个例子的实际代码将会是这样：

```js
var gulp = require('gulp');

// 返回一个 callback，因此系统可以知道它什么时候完成
gulp.task('one', function(cb) {
    // 做一些事 -- 异步的或者其他的
    cb(err); // 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了
});

// 定义一个所依赖的 task 必须在这个 task 执行之前完成
gulp.task('two', ['one'], function() {
    // 'one' 完成后
});

gulp.task('default', ['one', 'two']);
```


## gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])

监视文件，并且可以在文件发生改动时候做一些事情。它总会返回一个 EventEmitter 来发射（emit） `change` 事件。

### gulp.watch(glob[, opts], tasks)

#### glob
类型： `String` or `Array`

一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。

#### opts
类型： `Object`

传给 [`gaze`](https://github.com/shama/gaze) 的参数。

#### tasks
类型： `Array`

需要在文件变动后执行的一个或者多个通过 `gulp.task()` 创建的 task 的名字，

```js
var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```

### gulp.watch(glob[, opts, cb])

#### glob
类型： `String` or `Array`

一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。

#### opts
类型： `Object`

传给 [`gaze`](https://github.com/shama/gaze) 的参数。

#### cb(event)
类型： `Function`

每次变动需要执行的 callback。

```js
gulp.watch('js/**/*.js', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```

callback 会被传入一个名为 `event` 的对象。这个对象描述了所监控到的变动：

##### event.type
类型： `String`

发生的变动的类型：`added`, `changed`, `deleted` 或者 `renamed`。

##### event.path
类型： `String`

触发了该事件的文件的路径。

- [node-glob](https://github.com/isaacs/node-glob)
- [node-glob 文档](https://github.com/isaacs/node-glob#options)
- [node-glob 语法](https://github.com/isaacs/node-glob)
- [gulp-if](https://github.com/robrich/gulp-if)
- [Orchestrator](https://github.com/robrich/orchestrator)
- [glob2base](https://github.com/wearefractal/glob2base)


# 快速使用

全局安装 gulp：

如果之前有全局安装过一个版本的 gulp，执行一下 `npm rm --global gulp` 来避免和 gulp-cli 冲突

```sh
$ npm install --global gulp-cli
```

作为项目的开发依赖（devDependencies）安装：

```sh
$ npm install --save-dev gulp
```

在项目根目录下创建一个名为 `gulpfile.js` 的文件：

```js
var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

运行 gulp：

```sh
$ gulp
```

默认的名为 default 的任务（task）将会被运行，在这里，这个任务并未做任何事情。

想要单独执行特定的任务（task），输入 `gulp <task> <othertask>`。




