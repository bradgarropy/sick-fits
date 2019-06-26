const fs = require("fs")
const {ApolloServer, gql, makeExecutableSchema} = require("apollo-server")
const Query = require("./Query")
const Mutation = require("./Mutation")

const typeDefs = gql`
    ${fs.readFileSync("prisma/generated/prisma.graphql", "utf8")}
`

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
