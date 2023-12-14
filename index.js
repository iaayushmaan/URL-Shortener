const express = require("express");
const connectMongo = require("./connections");
const path = require("path");
const URL = require("./models/url");
const urlRouter = require("./routes/url");
const cookieParser = require("cookie-parser");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const { restrictToLoginUserOnly, checkAuth } = require("./middleware/auth");
const app = express();

connectMongo("mongodb://127.0.0.1:27017/url").then(() =>
  console.log("MongoDB connected successfully")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoginUserOnly, urlRouter);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRouter);

app.get("/url/:shortURL", async (req, res) => {
  const shortURL = req.params.shortURL;
  const entry = await URL.findOneAndUpdate(
    {
      shortURL,
    },
    {
      $push: {
        visitHistory: { timeStamp: Date.now() },
      },
    }
  );
  console.log(entry);
  res.redirect(entry.extendedURL);
});

app.get("/signup", (req, res) => {
  return res.render("signup");
});

app.listen(8000, () => console.log("listening on port 8000"));
