const mongoose = require("mongoose");
const checkoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    userName: {type: String, required :true},
    userEmail: {type: String},
    deliveryDate: { type: Date, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryTime: { type: String, required: true },

    meals: [
      {
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: "mealId" },
        product: { type: String, required: true },
        mealQty: { type: Number, required: true },
        mealRate: { type: Number, required: true },
        mealTotalPrice: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Checkout", checkoutSchema);
