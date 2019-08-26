import React from "react"
import PropTypes from "prop-types"
import StripeCheckout from "react-stripe-checkout"
import {useQuery} from "@apollo/react-hooks"
import {READ_USER_QUERY} from "./User"
import {calculateTotal} from "../utils/money"
import {totalItems} from "../utils/cart"

const TakeMyMoney = ({children}) => {
    const {data} = useQuery(READ_USER_QUERY)
    const {cart, email} = data.me

    const onToken = response => {
        console.log(response.id)
    }

    return (
        <StripeCheckout
            stripeKey={process.env.stripe.key}
            name="Sick Fits"
            description={`Order of ${totalItems(cart)} items!`}
            image={cart[0].item && cart[0].item.image}
            amount={calculateTotal(cart)}
            currency="USD"
            email={email}
            token={onToken}
        >
            {children}
        </StripeCheckout>
    )
}

TakeMyMoney.propTypes = {
    children: PropTypes.node,
}

export default TakeMyMoney
