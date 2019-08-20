import React from "react"
import PropTypes from "prop-types"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"

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
    const [addToCart] = useMutation(ADD_TO_CART_MUTATION)

    const onClick = async() => {
        await addToCart({
            variables: {id},
        })
    }

    return <button onClick={onClick}>Add To Cart 🛒</button>
}

AddToCart.propTypes = {
    id: PropTypes.string.isRequired,
}

export default AddToCart
