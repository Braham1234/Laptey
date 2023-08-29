const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    cartItems: [
      {
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: "mealId" },
        imgUrl: { type: String },
        product: { type: String, required: true },
        mealQty: { type: Number, required: true },
        mealRate: { type: Number, required: true },
        mealTotalPrice: { type: Number, required: true },
        ratings: {type: Number},
        category: {type: String}
      },
    ],

    historyItems: [
      {
        product: { type: String, required: true },
        mealRate: { type: Number },
        ratings: { type: Number },
        category: { type: String },
        // mealQty: [{type: Number}]
      },
    ],
  },
  { timestamps: true }
);

//Accessing a model
module.exports = mongoose.model("Cart", cartSchema);
