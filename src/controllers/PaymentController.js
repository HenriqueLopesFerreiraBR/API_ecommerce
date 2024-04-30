const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripeKey = process.env.STRIPE_KEY;

class PaymentController {
    async payment(req, res) {
        stripe.charges.create(
            {
                source: req.body.tokenId,
                amount: req.body.amount,
                currency: "usd",
            },
            (stripeErro, stripeRes) => {
                if (stripeErro) {
                    res.status(500).json(stripeErro);
                } else {
                    res.status(200).json(stripeRes);
                }
            }
        );
    }
}

module.exports = new PaymentController();
