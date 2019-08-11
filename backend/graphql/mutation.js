const database = require("../prisma/database")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {randomBytes} = require("crypto")

const ONE_HOUR = 3600000
const ONE_YEAR = 1000 * 60 * 60 * 24 * 365

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
            maxAge: ONE_YEAR,
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
            maxAge: ONE_YEAR,
        })

        return user
    },
    signout: (parent, args, context) => {
        context.res.clearCookie("token")
        const message = {message: "Goodbye!"}
        return message
    },
    requestReset: async(parent, args) => {
        const {email} = args
        const user = await database.query.user({where: {email}})

        if (!user) {
            throw new Error(`No user with email ${email}!`)
        }

        const resetToken = randomBytes(20).toString("hex")
        const resetTokenExpiration = Date.now() + ONE_HOUR

        await database.mutation.updateUser({
            where: {email},
            data: {resetToken, resetTokenExpiration},
        })

        const message = {
            message: "Check your email for a link to reset your password!",
        }

        return message
    },
    resetPassword: async(parent, args, context) => {
        const {resetToken, password, confirmPassword} = args

        if (password !== confirmPassword) {
            throw new Error("Passwords do not match!")
        }

        const [user] = await database.query.users({
            where: {
                resetToken,
                resetTokenExpiration_gte: Date.now() - ONE_HOUR,
            },
        })

        if (!user) {
            throw new Error("Your password reset token is invalid or expired!")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const updatedUser = await database.mutation.updateUser({
            where: {email: user.email},
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiration: null,
            },
        })

        const token = jwt.sign({id: updatedUser.id}, process.env.SECRET)
        context.res.cookie("token", token, {
            httpOnly: true,
            maxAge: ONE_YEAR,
        })

        return updatedUser
    },
}

module.exports = Mutation
