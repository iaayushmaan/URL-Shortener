const { getUserId } = require("../service/auth");

async function restrictToLoginUserOnly(req, res, next) {
  const userid = req.cookies?.uid;

  if (!userid) return res.redirect("/login");
  const user = getUserId(userid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userid = req.cookies?.uid;

  const user = getUserId(userid);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoginUserOnly,
  checkAuth,
};
