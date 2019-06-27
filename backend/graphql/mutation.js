const Mutation = {
    createUser: (parent, args) => {
        return {name: args.name, email: args.email}
    },
}

module.exports = Mutation
