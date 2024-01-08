const express = require("express");
//异步错误获取补丁
require("express-async-errors");
const { expressSend } = utils;
//注入统一格式数据放回方法
router.use((req, res, next) => {
  expressSend(res);
  console.log("to-router-module");
  next();
});
app.use((req, res, next) => {
  expressSend(res);
  console.log("to-app-module");
  next();
});

// 使用中间键 解析body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
//session  中间件

const session = require("express-session");
app.use(
  session({
    secret: "switch a good secret key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false, maxAge: 30 * 60 * 1000 },
  }),
);

//使用静态文件服务
app.use(express.static("public"));
