import React from "react"
import Link from "next/link"

const Navigation = () => {
    return (
        <nav>
            <Link href="/">
                <a>Home</a>
            </Link>

            <Link href="/sell">
                <a>Sell</a>
            </Link>
        </nav>
    )
}

export default Navigation
