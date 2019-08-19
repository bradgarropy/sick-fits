import React from "react"
import PropTypes from "prop-types"
import {useQuery, useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {CartStyles, Supreme, CloseButton, SickButton} from "../styles"
import format from "../utils/money"

const READ_CART_QUERY = gql`
    query READ_CART_QUERY {
        isCartOpen @client
    }
`
const TOGGLE_CART_MUTATION = gql`
    mutation TOGGLE_CART_MUTATION {
        toggleCart @client
    }
`

const Cart = () => {
    const price = 1000
    const items = 5

    const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
    const {data} = useQuery(READ_CART_QUERY)
    const {isCartOpen} = data

    return (
        <CartStyles open={isCartOpen}>
            <header>
                <CloseButton title="Close" onClick={toggleCart}>
                    &times;
                </CloseButton>
                <Supreme>Your Cart</Supreme>
                <p>{`You have ${items} items in your cart`}</p>
            </header>

            <footer>
                <p>{format(price)}</p>
                <SickButton>Checkout</SickButton>
            </footer>
        </CartStyles>
    )
}

Cart.propTypes = {
    open: PropTypes.bool,
}

export default Cart
export {READ_CART_QUERY, TOGGLE_CART_MUTATION}
