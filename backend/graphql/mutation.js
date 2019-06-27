const database = require("../prisma/database")

const Mutation = {
    createUser: (parent, {data}) => database.mutation.createUser({data}),
    createItem: (parent, {data}) => database.mutation.createItem({data}),
}

module.exports = Mutation
