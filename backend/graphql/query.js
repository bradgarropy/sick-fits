const {forwardTo} = require("prisma-binding")

const Query = {
    users: forwardTo("database"),
    items: forwardTo("database"),
    item: forwardTo("database"),
    itemsConnection: forwardTo("database"),
}

module.exports = Query
