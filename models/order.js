const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
        required: true,
    },
    userName: {type: String},
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            payablePrice:{
                type: Number,
                required: true,
            },
            purchasedQty: {
                type: Number,
                required: true,
            },
        },
    ],
    paymentStatus: {
        type: String,
        enum: ["PENDING", "COMPLETED", "cancelled", "refund"],
        required: true
    },
    paymentType:{
        type: String,
        enum: ["COD", "CARD"],
        required: true,
    },
    orderStatus: [
        {
            type: {
                type: String,
                enum: ["ORDERED", "PACKED", "SHIPPED", "DELIVERED"],
                default: "ORDERED",
            },
            date: {
                type: Date,
            },
            isCompleted: {
                type: Boolean,
                default: false,
            },
        },
    ],

}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);