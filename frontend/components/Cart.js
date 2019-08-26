import React from "react"
import PropTypes from "prop-types"
import {useQuery, useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {CartStyles, Supreme, CloseButton, SickButton} from "../styles"
import {formatPrice, calculateTotal} from "../utils/money"
import {READ_USER_QUERY} from "./User"
import CartItem from "./CartItem"
import TakeMyMoney from "./TakeMyMoney"

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
    const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
    const {data: cartData} = useQuery(READ_CART_QUERY)
    const {data: userData} = useQuery(READ_USER_QUERY)
    const {isCartOpen} = cartData
    const {me} = userData

    if (!me) {
        return null
    }

    const count = me.cart.length
    const total = calculateTotal(me.cart)

    return (
        <CartStyles open={isCartOpen}>
            <header>
                <CloseButton title="Close" onClick={toggleCart}>
                    &times;
                </CloseButton>
                <Supreme>{me.name}&apos;s Cart</Supreme>
                <p>{`You have ${count} item${
                    count > 1 ? "s" : ""
                } in your cart`}</p>
            </header>

            <ul>
                {me.cart.map(cartItem => {
                    return <CartItem key={cartItem.id} cartItem={cartItem}/>
                })}
            </ul>

            <footer>
                <p>{formatPrice(total)}</p>

                <TakeMyMoney>
                    <SickButton>Checkout</SickButton>
                </TakeMyMoney>
            </footer>
        </CartStyles>
    )
}

Cart.propTypes = {
    open: PropTypes.bool,
}

export default Cart
export {READ_CART_QUERY, TOGGLE_CART_MUTATION}
