const {forwardTo} = require("prisma-binding")
const database = require("../prisma/database")
const {checkPermissions} = require("../utils")

const Query = {
    users: async(parent, args, context, info) => {
        const {user} = context.req

        if (!user) {
            throw new Error("You must be logged in to view users!")
        }

        checkPermissions(user, ["ADMIN", "PERMISSION_UPDATE"])

        const users = await database.query.users({}, info)
        return users
    },
    items: forwardTo("database"),
    item: forwardTo("database"),
    itemsConnection: forwardTo("database"),
    me: async(parent, args, context, info) => {
        if (!context.req.user) {
            return null
        }

        const user = await database.query.user(
            {where: {id: context.req.user.id}},
            info,
        )

        return user
    },
}

module.exports = Query
