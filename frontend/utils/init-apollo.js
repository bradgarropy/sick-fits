import {ApolloClient, InMemoryCache, HttpLink} from "apollo-boost"
import fetch from "isomorphic-unfetch"
import {READ_CART_QUERY} from "../components/Cart"

let apolloClient = null

function create(initialState) {
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    const isBrowser = typeof window !== "undefined"
    const cache = new InMemoryCache().restore(initialState || {})

    cache.writeData({
        data: {
            isCartOpen: false,
        },
    })

    return new ApolloClient({
        connectToDevTools: isBrowser,
        ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
        link: new HttpLink({
            uri: process.env.server.url, // Server URL (must be absolute)
            credentials: "include", // Additional fetch() options like `credentials` or `headers`
            // Use fetch() polyfill on the server
            fetch: !isBrowser && fetch,
        }),
        cache,
        resolvers: {
            Mutation: {
                toggleCart: (root, args, {cache}) => {
                    const {isCartOpen} = cache.readQuery({
                        query: READ_CART_QUERY,
                    })

                    const data = {isCartOpen: !isCartOpen}
                    cache.writeData({data})
                    return data
                },
            },
        },
    })
}

export default function initApollo(initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === "undefined") {
        return create(initialState)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState)
    }

    return apolloClient
}
