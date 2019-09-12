require("dotenv").config()

const config = {
    target: "serverless",
    env: {
        stripe: {
            key: process.env.STRIPE_PUBLIC_KEY,
        },
        pagination: {
            perPage: process.env.ITEMS_PER_PAGE,
        },
        server: {
            url: process.env.SERVER_URL,
        },
    },
}

module.exports = config
