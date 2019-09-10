require("dotenv").config()

const config = {
    target: "serverless",
    env: {
        stripe: {
            key: process.env.STRIPE_PUBLIC_KEY,
        },
    },
}

module.exports = config
