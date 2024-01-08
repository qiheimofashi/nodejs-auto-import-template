const argvs = process.argv.find((i) => i.includes("PROJECT_MODEL"));
let PROJECT_MODEL = "dev";
if (!!argvs) {
  PROJECT_MODEL = argvs.split("=")[1];
}

const env = require(`../${PROJECT_MODEL}.js`) ?? {
  redisBasePath: "AUTO_IMPROT",
  part: "5351",
  database: "test",
  host: "localhost",
  mysqlUser: "test",
  mysqlPassword: "test",
  redisTime: 60 * 10,
  autoImport: {
    utils: [
      "getValue/getTime.js",
      "getValue/getYYYY.js",
      "getValue/returnTime",
    ],
    server: {
      api: [],
      routers: ["user/info.post.js", "user/[id].js"],
    },
  },
};

module.exports = env;
