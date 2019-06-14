const keys = require("../config/keys");
const checkAuth = require("../middlewares/authenticatedUser");
const stripe = require("stripe")(keys.STRIPE_SECRET_KEY);

module.exports = app => {
  app.post("/api/stripe", checkAuth, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "paying for email credits",
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
