import React from "react"
import Link from "next/link"
import User from "./User"
import NavigationWrapper from "../styles/Navigation"
import Signout from "./Signout"

const Navigation = () => {
    return (
        <User>
            {({data}) => {
                const {me} = data

                return (
                    <NavigationWrapper>
                        <Link href="/shop">
                            <a>Shop</a>
                        </Link>

                        {me && (
                            <>
                                <Link href="/sell">
                                    <a>Sell</a>
                                </Link>

                                <Link href="/orders">
                                    <a>Orders</a>
                                </Link>

                                <Link href="/me">
                                    <a>Account</a>
                                </Link>

                                <Signout/>
                            </>
                        )}

                        {!me && (
                            <Link href="/signup">
                                <a>Signup</a>
                            </Link>
                        )}
                    </NavigationWrapper>
                )
            }}
        </User>
    )
}

export default Navigation
