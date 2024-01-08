const mysql = require("mysql2");
const env = require("../env");
const {
  database,
  host,
  mysqlUser: user,
  mysqlPassword: password,
  redisBasePath,
  redisTime,
} = env;

const con = mysql.createPool({
  waitForConnections: true, // 是否等待连接
  connectionLimit: 10, // 最大连接数
  queueLimit: 0,
  host,
  user,
  password,
  database, //开发数据库
});

const query = (sql, values, isRedis = false) => {
  const { redis } = utils;
  return new Promise(async (resolve, reject) => {
    const key = `${redisBasePath}:${sql}-${JSON.stringify(values)}`;
    if (isRedis) {
      const data = await redis.hGetAll(key);
      if (
        !data ||
        !Object.keys(data)?.length ||
        (!Array.isArray(data) && !data.length)
      ) {
        redis.del(key);
      } else {
        resolve(data);
        return;
      }
    }

    con.getConnection(function (err, conn) {
      if (err) reject(err);
      conn.execute(sql, Array.isArray(values) ? values : [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          const [result] = data;
          if (isRedis) {
            redis.hSet(key, result);
            redis.expire(key, redisTime);
          }
          resolve(JSON.parse(JSON.stringify(result ?? "")));
        } // 查询完之后释放连接
        con.releaseConnection(conn); // 释放连接
      });
    });
  });
};

const findOne = (sql, values, isRedis = false) => {
  const { redis } = utils;
  return new Promise(async (resolve, reject) => {
    const key = `${redisBasePath}:${sql}-${JSON.stringify(values)}`;
    if (isRedis) {
      const data = await redis.hGetAll(key);
      if (
        !data ||
        !Object.keys(data)?.length ||
        (!Array.isArray(data) && !data.length)
      ) {
        redis.del(key);
      } else {
        resolve(data);
        return;
      }
    }

    con.getConnection(function (err, conn) {
      if (err) reject(err);
      conn.execute(
        sql,
        Array.isArray(values) && values.length ? values : [],
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            const [result] = data;
            if (isRedis) {
              redis.hSet(key, result);
              redis.expire(key, redisTime);
            }
            resolve(JSON.parse(JSON.stringify(result ?? ""))); // 查询完之后释放连接
          }
          con.releaseConnection(conn); // 释放连接
        },
      );
    });
  });
};

module.exports = { sql: { query, findOne } };
