const database = require("../prisma/database")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Mutation = {
    createUser: (parent, {data}) => database.mutation.createUser({data}),
    createItem: (parent, {data}) => database.mutation.createItem({data}),
    updateItem: (parent, {data, where}) =>
        database.mutation.updateItem({data, where}),
    deleteItem: (parent, {where}) => database.mutation.deleteItem({where}),
    signup: async(parent, args, context, info) => {
        args.email = args.email.toLowerCase()
        args.password = await bcrypt.hash(args.password, 10)

        const user = await database.mutation.createUser(
            {
                data: {
                    ...args,
                    permissions: {set: ["USER"]},
                },
            },
            info,
        )

        const token = jwt.sign({id: user.id}, process.env.SECRET)
        context.res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        })

        return user
    },
    signin: async(parent, args, context) => {
        const {email, password} = args
        const user = await database.query.user({where: {email}})

        if (!user) {
            throw new Error(`No user with email ${email}!`)
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            throw new Error("Invalid password!")
        }

        const token = jwt.sign({id: user.id}, process.env.SECRET)
        context.res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        })

        return user
    },
    signout: (parent, args, context) => {
        context.res.clearCookie("token")
        const message = {message: "Goodbye!"}
        return message
    },
}

module.exports = Mutation
