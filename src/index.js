//引入路径别名
require("module-alias/register");
//读取环境变量
const { autoImport: autoImportFilter, part = 5351 } = require("@/env");

//引入自动注册函数
const utilsAutoImport = require("./utilsAutoImport");
//注册utils工具函数
utilsAutoImport("utils", autoImportFilter.utils);
//注册字段校验函数
utilsAutoImport("rules");

const { autoImport, requireContext } = utils;
//导入express包
const express = require("express");

//生成 express 服务实例
const app = express();

// 创建路由对象，使得用户登录状态检查的中间件只作用于部分路由。
const router = express.Router();

global.app = app;
global.router = router;

//引入中间件注册模块
require("./uses/middleware");
//自动注册接口文件
const appApi = requireContext(
  __dirname + "/server/api",
  autoImportFilter.server.api,
);
const routers = requireContext(
  __dirname + "/server/routers",
  autoImportFilter.server.routers,
);
autoImport(appApi, app);
autoImport(routers, router);

//将路由作为中间件挂接在 / 根路由上面
app.use("/", router);
//全局错误处理
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ success: false, message: err.message });
});
//启动服务监听
app.listen(part, () => {
  console.log(`服务器已经启动：http://localhost:${part}`);
});
