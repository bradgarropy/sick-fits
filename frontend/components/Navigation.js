import React from "react"
import Link from "next/link"
import NavigationWrapper from "../styles/Navigation"
import User from "./User"

const Navigation = () => {
    return (
        <NavigationWrapper>
            <User>
                {/* {(payload) => {
                    return (
                        <p>User</p>
                    )
                }} */}
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
