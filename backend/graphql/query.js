const {forwardTo} = require("prisma-binding")
const database = require("../prisma/database")
const {checkPermissions} = require("../utils")

const Query = {
    users: async(parent, args, context, info) => {
        const {user} = context.req

        if (!user) {
            throw new Error("You must be logged in to view users!")
        }

        const hasPermissions = checkPermissions(user, [
            "ADMIN",
            "PERMISSION_UPDATE",
        ])

        if (!hasPermissions) {
            throw new Error("You do not have permission to do that!")
        }

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
    order: async(parent, args, context, info) => {
        if (!context.req.user) {
            throw new Error("You must be logged in to view your orders!")
        }

        const order = await database.query.order({where: {id: args.id}}, info)

        const owner = order.user.id === context.req.user.id
        const permissions = checkPermissions(context.req.user, ["ADMIN"])

        if (!owner && !permissions) {
            throw new Error("You do not have permission to do that!")
        }

        return order
    },
}

module.exports = Query
