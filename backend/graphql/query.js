const database = require("../prisma/database")

const Query = {
    users: () => database.query.users(),
    items: () => database.query.items(),
    item: (parent, {where}) => database.query.item({where}),
}

module.exports = Query
