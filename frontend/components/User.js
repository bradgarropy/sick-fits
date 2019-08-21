import React from "react"
import PropTypes from "prop-types"
import {useQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"

const READ_USER_QUERY = gql`
    query READ_USER_QUERY {
        me {
            id
            name
            email
            permissions
            cart {
                id
                quantity
                item {
                    id
                    title
                    description
                    price
                    image
                }
            }
        }
    }
`

const User = props => {
    const {data} = useQuery(READ_USER_QUERY)
    return <>{props.children(data, {...props})}</>
}

User.propTypes = {
    children: PropTypes.func.isRequired,
}

export default User
export {READ_USER_QUERY}
