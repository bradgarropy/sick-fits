import React from "react"
import {Query} from "react-apollo"
import {gql} from "apollo-boost"
import Items from "../components/Items"

const READ_USER_QUERY = gql`
    query READ_USER_QUERY {
        me {
            id
            name
            email
            permissions
        }
    }
`

const IndexPage = () => {
    return (
        <>
            <button onClick={async () => {
                const response = await fetch(process.env.server.url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query: "{ me { name } }" }),
                    credentials: "include",
                })
                const data = await response.json()
                console.log("data.me: ", data)
            }}>
                COOKIES
            </button>

            <Query query={READ_USER_QUERY}>
                {(data, loading, error) => {
                    console.log("me: ", data.me)
                    return null
                }}
            </Query>

            <Items/>
        </>
    )
}

export default IndexPage
