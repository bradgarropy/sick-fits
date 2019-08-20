const database = require("../prisma/database")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {randomBytes} = require("crypto")
const {transport, createEmail} = require("../mail")
const {checkPermissions} = require("../utils")

const ONE_HOUR = 3600000
const ONE_YEAR = 1000 * 60 * 60 * 24 * 365

const Mutation = {
    createUser: (parent, {data}) => database.mutation.createUser({data}),
    updatePermissions: async (parent, args, context, info) => {
        if (!context.req.user) {
            throw new Error("You must be logged in to create an item!")
        }

        const user = await database.query.user(
            {
                where: {
                    id: context.req.user.id,
                },
            },
            info,
        )

        const hasPermissions = checkPermissions(user, [
            "ADMIN",
            "PERMISSION_UPDATE",
        ])

        if (!hasPermissions) {
            throw new Error("You do not have permission to do that!")
        }

        const updatedUser = await database.mutation.updateUser(
            {
                where: {id: args.id},
                data: {permissions: {set: args.permissions}},
            },
            info,
        )

        return updatedUser
    },
    createItem: async (parent, args, context, info) => {
        const {user} = context.req

        if (!user) {
            throw new Error("You must be logged in to create an item!")
        }

        const item = await database.mutation.createItem(
            {
                data: {
                    ...args,
                    user: {
                        connect: {id: user.id},
                    },
                },
            },
            info,
        )

        return item
    },
    updateItem: (parent, {data, where}) =>
        database.mutation.updateItem({data, where}),
    deleteItem: async (parent, {where}, context, info) => {
        const item = await database.query.item({where}, "{id, user {id}}")

        const ownsItem = context.req.user.id === item.user.id
        const hasPermissions = checkPermissions(context.req.user, [
            "ADMIN",
            "ITEM_DELETE",
        ])

        if (!ownsItem && !hasPermissions) {
            throw new Error("You do not have permission to do that!")
        }

        const deletedItem = await database.mutation.deleteItem({where}, info)
        return deletedItem
    },
    signup: async (parent, args, context, info) => {
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
    signin: async (parent, args, context) => {
        const {email, password} = args
        const user = await database.query.user(
            {where: {email}},
            "{id, name, email, permissions, password}",
        )

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
    requestReset: async (parent, args) => {
        const {email} = args
        const user = await database.query.user({where: {email}})

        if (!user) {
            throw new Error(`No user with email ${email}!`)
        }

        const token = randomBytes(20).toString("hex")
        const tokenExpiration = Date.now() + ONE_HOUR

        await database.mutation.updateUser({
            where: {email},
            data: {token, tokenExpiration},
        })

        const text = `
            Your password reset token is here!
            <a href="${process.env.CLIENT_URL}/reset/${token}">
                Click here to reset your password!
            </a>
        `

        await transport.sendMail({
            from: "hey@sickfits.com",
            to: email,
            subject: "Your Password Reset Link!",
            html: createEmail(text),
        })

        const message = {
            message: "Check your email for a link to reset your password!",
        }

        return message
    },
    reset: async (parent, args, context) => {
        const {token, password, confirmPassword} = args

        if (password !== confirmPassword) {
            throw new Error("Passwords do not match!")
        }

        const [user] = await database.query.users({
            where: {
                token,
                tokenExpiration_gte: Date.now() - ONE_HOUR,
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
                token: null,
                tokenExpiration: null,
            },
        })

        const authToken = jwt.sign({id: updatedUser.id}, process.env.SECRET)
        context.res.cookie("token", authToken, {
            httpOnly: true,
            maxAge: ONE_YEAR,
        })

        return updatedUser
    },
    addToCart: async (parent, args, context, info) => {
        if (!context.req.user) {
            throw new Error("You must be logged in to add items to your cart!")
        }

        const [existingCartItem] = await database.query.cartItems({
            where: {
                user: {id: context.req.user.id},
                item: {id: args.id},
            },
        })

        if (existingCartItem) {
            const updatedCartItem = database.mutation.updateCartItem({
                where: {id: existingCartItem.id},
                data: {quantity: existingCartItem.quantity + 1},
            })

            return updatedCartItem
        } else {
            const newCartItem = database.mutation.createCartItem({
                data: {
                    user: {connect: {id: context.req.user.id}},
                    item: {connect: {id: args.id}},
                },
            })

            return newCartItem
        }
    },
}

module.exports = Mutation
