const express = require("express");
const { handleSignUp, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", handleSignUp);

router.post("/login", handleUserLogin);

module.exports = router;
