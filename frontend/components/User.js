import React from "react"
import PropTypes from "prop-types"
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

const User = (props) => {
    return (
        <Query query={READ_USER_QUERY}>
            {(data, loading, error) => {
                console.log(data)
                return null
            }}
        </Query>
    )
}

User.propTypes = {}

export default User
export {READ_USER_QUERY}
