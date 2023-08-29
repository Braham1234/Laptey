const mongoose = require("mongoose");
const historySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    userName: { type: String, required: true },
    userEmail: { type: String },
    historyItems: [
      {
        mealRate: { type: Number },
        ratings: { type: Number },
        category: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
