# my-project

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目可视化
```
vue ui
```

### 项目结构
```
    |-- vue.config.js           //vue项目配置
    |-- public
    |   |-- index.html          //index
    |
    |-- src
        |-- App.vue             
        |-- main.js
        |-- assets                  //静态资源
        |   |-- img                 //图片
        |   |-- style               //样式
        |       |-- animate.less    //动画
        |       |-- default.less    //初始化样式
        |       |-- var.less        //定义样式变量
        |
        |-- components              //公共组件
        |   |-- Code
        |   |-- Header
        |   |-- Modal
        |   |-- Sign
        |
        |-- config                  //配置文件
        |-- plugins                 //插件
        |   |-- axios.js            //axios封装
        |
        |-- router                  //路由       
        |   |-- index.js            
        |   |-- intercept.js        //路由拦截
        |
        |-- store                   //vuex状态管理      
        |
        |-- utils                   
        |   |-- auth.js             //权限相关-工具函数
        |   |-- directive.js        //指令
        |   |-- regExp.js           //正则
        |   |-- tool.js             //工具函数
        |
        |-- views
            |-- demo.vue            //demo 自定义示例（组件/接口/工具函数）
            |-- Error               //错误模块
            |-- Home                //首页模块
            |-- Login               //登录模块
            |-- ......

```

## 常用工具
	word转html： http://www.docpe.com/word/word-to-html.aspx
    快速生成项目目录： mddir
