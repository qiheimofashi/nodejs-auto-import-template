# 一、项目描述（nodejs-auto-import-template）

这是一个通用性 nodejs 服务脚手架，利用 fs 系统模块实现工具函数，接口文件自动注册引入。

- 项目环境：node-20。

# 二、目录结构

```
Project
├── public 公共资源
│    ├── assets 静态资源
├── src
│    ├── users 全员中间件注册模块
│    ├── utils 工具函数（自动引入此文件下的函数。暴漏给全局变量utils使用）
│    └── server 业务组件
│          ├──api 对应app实例接口
│          └──routers 对应router实例接口
└── index.js 入口文件
```

# 三、使用介绍

> 如何书写接口？
>
> > server 文件下 api 与 routers 的 js 文件会自动映射成接口。
> >
> > > 比如 server>api>user>login.js api 文件下的 user 文件里的 login.js 文件 => /user/login 此文件诶需 module.export = function(req,res){} 函数里书写业务逻辑代码
>
> 如何区分接口类型？
>
> > 文件名.类型 => getInfo.post.js(默认 get 请求)
>
> 如何使用 res.params 参数？
>
> > [参数 key].js [id].get.js => req.params.id
>
> 如何使用单路由中间件？
>
> > module.export = [...中间件,逻辑代码函数] =>module.export = [中间 1,中间 2,function(){}]
>
> 此模版以统一封装返回格式
>
> > res.success
> >
> > > res.success(返回的参数,提示文本) 状态码默认返回 200
>
> > res.error
> >
> > > res.error([...错误提示]) 状态码默认返回 500
>
> > res.autoSend
> >
> > > res.error({code:number,data:返回参数,msg:'提示文本'})
