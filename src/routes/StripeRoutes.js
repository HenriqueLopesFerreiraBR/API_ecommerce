const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const StripeController = require("../controllers/PaymentController");

dotenv.config();

const stripeKey = process.env.STRIPE_KEY;

router.post("/payment", StripeController.payment);

module.exports = router;
