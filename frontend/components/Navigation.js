import React from "react"
import Link from "next/link"
import {useQuery, useMutation} from "@apollo/react-hooks"
import {READ_USER_QUERY} from "./User"
import NavigationWrapper from "../styles/Navigation"
import Signout from "./Signout"
import {TOGGLE_CART_MUTATION} from "./Cart"
import CartCount from "./CartCount"

const Navigation = () => {
    const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
    const {data} = useQuery(READ_USER_QUERY)
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

                    <Signout />

                    <button onClick={toggleCart}>
                        My Cart
                        <CartCount
                            count={me.cart.reduce(
                                (total, cartItem) => total + cartItem.quantity,
                                0,
                            )}
                        />
                    </button>
                </>
            )}

            {!me && (
                <Link href="/signup">
                    <a>Signup</a>
                </Link>
            )}
        </NavigationWrapper>
    )
}

export default Navigation
