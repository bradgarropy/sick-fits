import React from "react"
import PropTypes from "prop-types"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {READ_USER_QUERY} from "./User"

const ADD_TO_CART_MUTATION = gql`
    mutation ADD_TO_CART_MUTATION($id: ID!) {
        addToCart(id: $id) {
            id
            quantity
        }
    }
`

const AddToCart = props => {
    const {id} = props
    const [addToCart, {loading}] = useMutation(ADD_TO_CART_MUTATION, {
        refetchQueries: [{query: READ_USER_QUERY}],
    })

    const onClick = async() => {
        await addToCart({
            variables: {id},
        })
    }

    return (
        <button disabled={loading} onClick={onClick}>
            Add{loading && "ing"} To Cart 🛒
        </button>
    )
}

AddToCart.propTypes = {
    id: PropTypes.string.isRequired,
}

export default AddToCart
