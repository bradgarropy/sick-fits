require("dotenv").config()

const config = {
    target: "serverless",
    env: {
        server: {
            url: process.env.SERVER_URL,
        },
    },
}

module.exports = config
