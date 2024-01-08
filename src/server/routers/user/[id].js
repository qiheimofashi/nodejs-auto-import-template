const { rule, ruleData } = rules;
const {
  name,
  mobile,
  password,
  documentContent,
  title,
  pageNo,
  pageSize,
  newPassword,
  content_text,
  level,
  article_id,
} = ruleData;
module.exports = [
  rule([name, mobile, password]),
  function (req, res) {
    console.log(req.params);
    res.send({ dd: "对对对" });
  },
];
