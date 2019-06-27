const database = require("../prisma/database")

const Query = {
    users: () => database.query.users(),
    items: () => database.query.items(),
}

module.exports = Query
