import React from "react"
import PropTypes from "prop-types"
import {CartStyles, Supreme, CloseButton, SickButton} from "../styles"
import format from "../utils/money"

const Cart = open => {
    const price = 1000
    const items = 5

    return (
        <CartStyles>
            <header>
                <CloseButton title="Close">&times;</CloseButton>
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
