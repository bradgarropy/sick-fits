const {ApolloServer, makeExecutableSchema} = require("apollo-server")
const {importSchema} = require("graphql-import")
const Query = require("./query")
const Mutation = require("./mutation")

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

const server = new ApolloServer({schema})

module.exports = server
