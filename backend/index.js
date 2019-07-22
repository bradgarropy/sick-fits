require("dotenv").config()
const server = require("./graphql/server")

server.listen({port: process.env.PORT}, () => {
    console.log(`🚀  Server ready at http://localhost:${process.env.PORT}/graphql`)
})
