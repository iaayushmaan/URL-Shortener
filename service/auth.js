//Statefull
//const sessionIdToUserMap = new Map();

// function setUserId(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUserId(id) {
//   return sessionIdToUserMap.get(id);
// }
// + Necessary Changes in Other folders

//Stateless
const jwt = require("jsonwebtoken");
const secret = "aayushmaan@123";

function setUserId(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

function getUserId(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUserId,
  getUserId,
};
