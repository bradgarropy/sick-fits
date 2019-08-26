require("dotenv").config()

const config = {
    target: "serverless",
    env: {
        server: {
            url: process.env.SERVER_URL,
        },
        pagination: {
            perPage: process.env.ITEMS_PER_PAGE,
        },
        stripe: {
            key: process.env.STRIPE_PUBLIC_KEY,
        },
    },
}

module.exports = config
