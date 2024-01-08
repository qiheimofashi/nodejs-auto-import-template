module.exports = async (req, res) => {
  const { sql } = utils;
  const data = await sql.findOne(
    "select * from t_user where id = ?",
    [1],
    true,
  );

  res.success(data);
  // res.autoSend({ code: 500, data: "ddd", msg: "警告红温" });
};
