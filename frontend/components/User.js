import React from "react"
import {Query} from "react-apollo"
import {gql} from "apollo-boost"

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

const User = () => {
    return (
        <Query query={READ_USER_QUERY}>
            {({data, loading, error}) => {
                return (<p>{JSON.stringify(data.me)}</p>)
            }}
        </Query>
    )
}

export default User
export {READ_USER_QUERY}
