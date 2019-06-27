const {ApolloServer, makeExecutableSchema} = require("apollo-server")
const typeDefs = require("./schema")
const Query = require("./query")
const Mutation = require("./mutation")

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
