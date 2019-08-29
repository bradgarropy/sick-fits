const stripe = require("stripe")(process.env.STRIPE_KEY)

module.exports = stripe
