const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: {
                    type: String,
                },
                quandtity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        amount: {
            type: Number,
            required: true,
        },
        address: { type: Object, required: true },
        status: { type: String, defalt: "pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
