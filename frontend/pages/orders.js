import React from "react"
import OrderList from "../components/OrderList"
import PleaseSignIn from "../components/PleaseSignIn"

const OrdersPage = () => {
    return (
        <PleaseSignIn>
            <OrderList/>
        </PleaseSignIn>
    )
}

export default OrdersPage
