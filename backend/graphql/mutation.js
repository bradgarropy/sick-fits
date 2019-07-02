const database = require("../prisma/database")

const Mutation = {
    createUser: (parent, {data}) => database.mutation.createUser({data}),
    createItem: (parent, {data}) => database.mutation.createItem({data}),
    updateItem: (parent, {data, where}) => database.mutation.updateItem({data, where}),
    deleteItem: (parent, {where}) => database.mutation.deleteItem({where}),
}

module.exports = Mutation
