import React from "react"
import Head from "next/head"
import Link from "next/link"
import {useQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import styled from "styled-components"
import {formatPrice} from "../utils/money"
import Error from "../components/Error"
import {OrderWrapper} from "../styles"
import {formatDistance} from "date-fns"
import {OrderItem} from "../styles"
import {totalItems} from "../utils/order"

const READ_ORDERS_QUERY = gql`
    query READ_ORDERS_QUERY {
        orders(orderBy: createdAt_DESC) {
            id
            total
            createdAt
            items {
                id
                title
                price
                description
                quantity
                image
            }
        }
    }
`

const List = styled.ul`
    display: grid;
    grid-gap: 4rem;
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`

const OrderList = () => {
    const {loading, error, data} = useQuery(READ_ORDERS_QUERY)

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <Error error={error}/>
    }

    const {orders} = data
    console.log(orders)

    return (
        <OrderWrapper>
            <Head>
                <title>Sick Fits! | Orders</title>
            </Head>

            <div>
                <h2>You have {orders.length} orders.</h2>

                <List>
                    {orders.map(order => {
                        return (
                            <OrderItem key={order.id}>
                                <Link href={`/order/${order.id}`}>
                                    <a>
                                        <div className="order-meta">
                                            <p>{totalItems(order)} Items</p>
                                            <p>{order.items.length} Products</p>
                                            <p>
                                                {formatDistance(
                                                    new Date(order.createdAt),
                                                    new Date(),
                                                )}
                                            </p>
                                            <p>{formatPrice(order.total)}</p>
                                        </div>

                                        <div className="images">
                                            {order.items.map(item => {
                                                return (
                                                    <img
                                                        key={item.id}
                                                        src={item.image}
                                                        alt={item.title}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </a>
                                </Link>
                            </OrderItem>
                        )
                    })}
                </List>
            </div>
        </OrderWrapper>
    )
}

export default OrderList
