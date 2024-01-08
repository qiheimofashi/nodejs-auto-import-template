module.exports = function (req, res) {
  const { setToken } = utils;

  const {
    body: { name },
  } = req;

  const token = setToken({ name: "大街光" });

  res.send({
    message: "成功！",
    token,
  });
};
