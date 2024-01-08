module.exports = async function (req, res) {
  const { redis } = utils;
  const { token } = req.headers;
  await redis.del(token);

  res.send("删除成功！");
  // this.redis
};
