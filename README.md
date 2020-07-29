# 校园疫情防控系统

1.  项目暂不适配移动端及小屏设配
2.  启动文件为 根目录下的 `app.js`， 使用`node`启动



**项目功能以及实现思路简述：**

1. 注册：

   - 注册需填写用户相关信息 包括所在学院、专业、班级等，以及是否为教师
   - 注册时会进行判断学号/工号是否已被注册
   - 学院、专业、班级、职位等选项均采用下拉框或单选按钮，以简化用户注册操作
   - 其中下拉框利用`js`设计为三级联动式，即必须先选择学院，而后专业，最后班级

2. 登录：

   - 登录需提供 学号/工号 与 密码
   - 判断用户是否存在
   - 判断用户身份，进而跳转不同页面

3. 学生页面（对学生健康数据的采集）：

   - 如果今日未填写则 表单**(健康信息调查表) **呈未填写状态，学生可进行填写

   - 如果今日已填写则表单呈已填写状态

   - 当日提交的表单，学生可进行更改

   - 顶部导航条可查看当前用户信息，也可跳转至 首页 以及 历史提交页面

   - 历史提交页面将罗列出用户的提交记录

4. 教师页面（展示提交的学生健康状态数据）：

   - 学生提交状态以及学生健康状态将会以 **饼图** 的形式展示

   - 饼图下方将会以 **表格** 的形式详细展示出学生所提交的 健康信息

   - 页面左侧可选择查看 **学生提交的往日数据**

   - 页面顶部的 搜索框 可对当前页面表格数据进行 搜索



---



## 1. 项目目录结构

|--` project`

  |-- app.js	入口文件

  |-- package.json	项目配置文件

  |-- api	`数据接口文件夹`

  |  |-- home.js	home页面的数据接口

  |-- models	`数据模型文件夹`

  |  |-- database.js	连接数据库

  |  |-- formdata.js	构建formdata表

  |  |-- user.js	构建user表

  |-- public	`公共资源文件夹`

  |  |-- css	`样式文件夹`

  |  |  |-- pc	`pc端样式`

  |  |    |-- dashboard.css	控制台页面样式

  |  |    |-- formpage.css	表单页面样式

  |  |    |-- home.css	主页面样式

  |  |    |-- login.css	登录注册页面样式

  |  |-- js	`js脚本文件夹`

  |    |-- charts.js

  |    |-- form.js	

  |    |-- formed.js	

  |    |-- GLOBAL.js

  |    |-- select.js

  |    |-- update.js

  |-- router	`路由文件夹`

  |  |-- session.js

  |  |-- student.js

  |  |-- teacher.js

  |-- views	`视图文件夹`

​    |-- 404.html

​    |-- 500.html

​    |-- login.html

​    |-- register.html

​    |-- admin	`教师视图文件夹`

​    |  |-- history.html

​    |  |-- home.html

​    |-- students	`学生视图文件夹`

​    |  |-- form.html

​    |  |-- formed.html

​    |  |-- submit_record.html

​    |  |-- update.html

​    |-- _layouts	`页面布局文件夹`

​    |  |-- home.html

​    |-- _partials

​      |-- footer.html

​      |-- header.html

---



## 2. 数据库结构

> 数据库使用的是MongoDB数据库

### （1）user 表

> 作用：存储用户个人信息

| 属性        | 数据类型 | 是否可为空 | 描述             | 例子                             |
| ----------- | -------- | ---------- | ---------------- | -------------------------------- |
| name        | String   | 否         | 学生姓名         | 张三                             |
| password    | String   | 否         | md5加密后的密码  | e10adc3949ba59abbe56e057f20f883e |
| academy     | String   | 否         | 所在学院         | 计算机与信息学院                 |
| major       | String   | 否         | 所学专业及年级   | 19计算机科学与技术               |
| profession  | Int32    | 否         | 是否为老师       | 0为学生，1为老师                 |
| classNum    | String   | 否         | 所在班级         | 2                                |
| user_num    | String   | 否         | 学号/工号        | 19111301000                      |
| last_submit | Date     | 是         | 最后一次提交日期 | 2020-07-22T15:08:56+08:00        |

### （2）formdata 表

> 作用：存储提交的表单数据

|       属性       | 数据类型 | 是否可为空 |     描述     |           例子            |
| :--------------: | :------: | :--------: | :----------: | :-----------------------: |
|     province     |  String  |     否     |   所在省份   |          安徽省           |
|       city       |  String  |     否     |   所在城市   |          芜湖市           |
|       area       |  String  |     否     |  所在区/县   |          弋江区           |
|       unit       |  String  |     否     |   所在单位   |           居家            |
|   submit_time    |   Date   |     否     |   提交日期   | 2020-07-22T15:08:56+08:00 |
|     academy      |  String  |     否     |   所在学院   |     计算机与信息学院      |
|      major       |  String  |     否     |   所在专业   |       19级软件工程        |
|     classNum     |  String  |     否     |   所在班级   |             1             |
|     user_num     |  String  |     否     |     学号     |        19111301157        |
| health_condition |  Array   |     否     | 身体健康状况 |          [0, 1]           |

---



## 3. 所使用的技术

> 概述：项目基于`html`、`css`、`js`、`nodejs`、`jquery`开发，数据库使用的是非关系型数据库 `mongodb`

1. 服务端使用的是基于nodejs平台的Web开发框架[express](https://www.expressjs.com.cn/)，使用它完成项目路由以及数据接口的设计

 2. 页面组件样式，使用了前端框架[bootstrap3](https://v3.bootcss.com/)，使用它的按钮，表单等组件
  3. 页面模板引擎使用的是 [art-template](http://aui.github.io/art-template/zh-cn/)，使用它完成后端数据在前端页面的渲染
  4. 使用 [blueimp-md5](https://www.npmjs.com/package/blueimp-md5) 来对密码之类信息进行`md5`加密
  5. 使用`express`中间件 [body-parser](https://www.npmjs.com/package/body-parser) 来对`HTTP`请求体解析
  6. 使用`JQuery`插件 [distpicker](http://fengyuanchen.github.io/distpicker/) 来完成中国省市区地址下拉框三级联动
  7. 使用 [echarts](https://echarts.apache.org/zh/index.html) 实现学生提交数据的可视化
  8. 使用`express`中间件`express-session`对用户登录状态进行保存
  9. 使用 [momentjs](http://momentjs.cn/) 对`Date`日期对象进行格式处理，以及日期计算
  10. 使用 [mongoose](http://www.mongoosejs.net/) 来操作 `MongoDB` 数据库
  11. 页面结构使用`html`搭建、页面样式使用`css`以及`less`设计、页面响应使用`js`、`jquery`实现

