const users = [
    {
        name: "Brad Garropy",
        email: "bradgarropy@gmail.com",
    },
    {
        name: "Gaby Garropy",
        email: "gabrielagarropy@gmail.com",
    },
]

const Query = {
    users: (parent, args, context, info) => {
        console.log(parent)
        console.log(args)
        console.log(context)
        console.log(info)
        return users
    },
}

module.exports = Query
