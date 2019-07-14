const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const {ApolloServer, makeExecutableSchema} = require("apollo-server-express")
const {importSchema} = require("graphql-import")
const Query = require("./query")
const Mutation = require("./mutation")
const database = require("../prisma/database")

const typeDefs = importSchema("graphql/schema.graphql")

const resolvers = {
    Query,
    Mutation,
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
})

const apolloServer = new ApolloServer({
    schema,
    context: ({req}) => ({...req, database}),
})

const server = express();

const options = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}

server.use(cors(options))
server.use(cookieParser())
server.use("*", (req, res, next) => {
    next()
})

apolloServer.applyMiddleware({
    app: server,
    cors: false,
});

module.exports = server
