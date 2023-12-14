const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUserId } = require("../service/auth");

async function handleSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.render("login");

  //const sessionId = uuidv4();
  //setUserId(sessionId, user);
  //res.cookie("uid", sessionId);
  const token = setUserId(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = {
  handleSignUp,
  handleUserLogin,
};
