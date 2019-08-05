import React from "react"
import Link from "next/link"
import User from "./User"
import NavigationWrapper from "../styles/Navigation"

const Navigation = () => {
    return (
        <NavigationWrapper>
            <User>
                {({data}) => {
                    const {me} = data

                    if(!me) {
                        return null
                    }

                    return (<p>{me.name}</p>)
                }}
            </User>

            <Link href="/shop">
                <a>Shop</a>
            </Link>

            <Link href="/sell">
                <a>Sell</a>
            </Link>

            <Link href="/signup">
                <a>Signup</a>
            </Link>

            <Link href="/orders">
                <a>Orders</a>
            </Link>

            <Link href="/me">
                <a>Account</a>
            </Link>
        </NavigationWrapper>
    )
}

export default Navigation
