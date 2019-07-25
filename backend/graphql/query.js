const {forwardTo} = require("prisma-binding")
const database = require("../prisma/database")

const Query = {
    users: forwardTo("database"),
    items: forwardTo("database"),
    item: forwardTo("database"),
    itemsConnection: forwardTo("database"),
    me: async(parent, args, context, info) => {
        const {id} = context.req

        if (!id) {
            return null
        }

        const user = await database.query.user({where: {id: id}}, info)
        return user
    },
}

module.exports = Query
