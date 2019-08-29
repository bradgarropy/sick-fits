import React from "react"
import PropTypes from "prop-types"
import StripeCheckout from "react-stripe-checkout"
import {useQuery, useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {READ_USER_QUERY} from "./User"
import {calculateTotal} from "../utils/money"
import {totalItems} from "../utils/cart"

const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTATION($token: String!) {
        createOrder(token: $token) {
            id
            charge
            total
            items {
                id
                title
            }
        }
    }
`

const TakeMyMoney = ({children}) => {
    const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
        refetchQueries: [{query: READ_USER_QUERY}],
    })

    const {data} = useQuery(READ_USER_QUERY)
    const {cart, email} = data.me

    const onToken = async token => {
        await createOrder({variables: {token: token.id}})
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
