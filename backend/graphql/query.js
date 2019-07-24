const {forwardTo} = require("prisma-binding")
const database = require("../prisma/database")

const Query = {
    users: forwardTo("database"),
    items: forwardTo("database"),
    item: forwardTo("database"),
    itemsConnection: forwardTo("database"),
    me: async (parent, args, context, info) => {
        console.log("RUNNING ME")
        const {id} = context.req
        console.log("id: ", id)

        if (!id) {
            return null
        }

        const user = await database.query.user({where: {id: id}}, info)
        console.log(user)
        return user
    }
}

module.exports = Query
