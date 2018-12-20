import React from "react"
import Link from "next/link"
import StyledNav from "./styles/StyledNav"

const Navigation = () => {
    return (
        <StyledNav>
            <Link href="/items">
                <a>Items</a>
            </Link>

            <Link href="/sell">
                <a>Sell</a>
            </Link>

            <Link href="/signup">
                <a>Sign Up</a>
            </Link>

            <Link href="/orders">
                <a>Orders</a>
            </Link>

            <Link href="/me">
                <a>Account</a>
            </Link>
        </StyledNav>
    )
}

Navigation.propTypes = {}

// export
export default Navigation
