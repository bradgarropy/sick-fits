require("dotenv").config()
const {Prisma} = require("prisma-binding")

const database = new Prisma({
    typeDefs: "prisma/generated/prisma.graphql",
    endpoint: process.env.PRISMA_ENDPOINT,
})

module.exports = database
