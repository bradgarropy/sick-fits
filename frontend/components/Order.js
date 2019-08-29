import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import {useQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {formatPrice} from "../utils/money"
import Error from "../components/Error"
import {OrderWrapper} from "../styles"
import {format} from "date-fns"

const READ_ORDER_QUERY = gql`
    query READ_ORDER_QUERY($id: ID!) {
        order(id: $id) {
            id
            charge
            total
            createdAt
            user {
                id
            }
            items {
                id
                title
                description
                price
                image
                quantity
            }
        }
    }
`

const Order = ({id}) => {
    const {loading, error, data} = useQuery(READ_ORDER_QUERY, {variables: {id}})

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <Error error={error} />
    }

    const {order} = data

    return (
        <OrderWrapper>
            <Head>
                <title>Sick Fits! | Order {order.id}</title>
            </Head>

            <p>
                <span>Order ID:</span>
                <span>{order.id}</span>
            </p>

            <p>
                <span>Charge:</span>
                <span>{order.charge}</span>
            </p>

            <p>
                <span>Date:</span>
                <span>
                    {format(new Date(order.createdAt), "MMMM d, yyyy h:mm a")}
                </span>
            </p>

            <p>
                <span>Total:</span>
                <span>{formatPrice(order.total)}</span>
            </p>

            <p>
                <span>Item Count:</span>
                <span>{order.items.length}</span>
            </p>

            <div className="items">
                {order.items.map(item => {
                    return (
                        <div key={item.id} className="order-item">
                            <img src={item.image} alt={item.title} />

                            <div className="item-details">
                                <h2>{item.title}</h2>
                                <p>Quantity: {item.quantity}</p>
                                <p>Each: {formatPrice(item.price)}</p>
                                <p>
                                    Subtotal:{" "}
                                    {formatPrice(item.price * item.quantity)}
                                </p>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </OrderWrapper>
    )
}

Order.propTypes = {
    id: PropTypes.string.isRequired,
}

export default Order
