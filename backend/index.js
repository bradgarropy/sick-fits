require("dotenv").config()
const cookieParser = require("cookie-parser")
const server = require("./graphql/server")

server.use(cookieParser())

server.listen({port: process.env.PORT}, () => {
    console.log(`🚀  Server ready at http://localhost:${process.env.PORT}/graphql`)
})
