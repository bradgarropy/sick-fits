import React from "react"
import {useRouter} from "next/router"
import Order from "../../components/Order"
import PleaseSignIn from "../../components/PleaseSignIn"

const OrderPage = () => {
    const router = useRouter()
    const {id} = router.query

    return (
        <PleaseSignIn>
            <Order id={id}/>
        </PleaseSignIn>
    )
}

export default OrderPage
