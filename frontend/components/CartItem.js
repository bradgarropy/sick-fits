import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {formatPrice} from "../utils/money"
import RemoveFromCart from "./RemoveFromCart"

const CartItemWrapper = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid ${({theme}) => theme.lightGrey};
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;

    img {
        margin-right: 10px;
    }

    h3,
    p {
        margin: 0;
    }
`

const CartItem = ({cartItem}) => {
    if (!cartItem.item) {
        return null
    }

    return (
        <CartItemWrapper>
            <img
                width="100"
                src={cartItem.item.image}
                alt={cartItem.item.title}
            />

            <div className="cart-item-details">
                <h3>{cartItem.item.title}</h3>
                <p>
                    {formatPrice(cartItem.item.price * cartItem.quantity)}
                    {" - "}
                    <em>
                        {cartItem.quantity} x {formatPrice(cartItem.item.price)}{" "}
                        each
                    </em>
                </p>
            </div>

            <RemoveFromCart id={cartItem.id}/>
        </CartItemWrapper>
    )
}

CartItem.propTypes = {
    cartItem: PropTypes.object.isRequired,
}

export default CartItem
