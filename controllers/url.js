const URL = require("../models/url");
const shortid = require("shortid");

async function handleCreateURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(404).json({ message: "URL not found" });
  }
  const shortenurl = shortid();
  const result = await URL.create({
    extendedURL: body.url,
    shortURL: shortenurl,
    timestamp: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortenurl });
  //return res.json({ id: shortenurl });
}

async function handleGetAnalytics(req, res) {
  const shortURL = req.params.shortURL;
  const entry = await URL.findOne({ shortURL });
  return res.json({
    TotalClicks: entry.visitHistory.length,
    Analytics: entry.visitHistory,
  });
}

module.exports = {
  handleCreateURL,
  handleGetAnalytics,
};
