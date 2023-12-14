const express = require("express");
const { handleCreateURL, handleGetAnalytics } = require("../controllers/url");
const router = express.Router();

router.post("/", handleCreateURL);

router.get("/analytics/:shortURL", handleGetAnalytics);

module.exports = router;
