const {ApolloServer, makeExecutableSchema} = require("apollo-server")
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

const server = new ApolloServer({
    schema,
    context: ({req}) => ({...req, database}),
})

module.exports = server
