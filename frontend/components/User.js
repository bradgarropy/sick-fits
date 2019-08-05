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

const User = props => (
    <Query {...props} query={READ_USER_QUERY}>
        {payload => props.children(payload)}
    </Query>
)

User.propTypes = {
    children: PropTypes.func.isRequired,
}

export default User
export {READ_USER_QUERY}
