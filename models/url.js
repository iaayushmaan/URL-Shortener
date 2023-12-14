const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    extendedURL: {
      type: String,
      required: true,
      unique: true,
    },
    shortURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timeStamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { timestamps: true }
);

const url = mongoose.model("url", urlSchema);

module.exports = url;
