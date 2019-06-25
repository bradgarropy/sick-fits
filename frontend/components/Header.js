import React from "react"
import Link from "next/link"
import Navigation from "./Navigation"

const Header = () => {
    return (
        <header>
            <div className="bar">
                <Link href="/">
                    <a>Sick Fits</a>
                </Link>
                <Navigation/>
            </div>

            <div className="sub-bar">Search</div>

            <div>Cart</div>
        </header>
    )
}

export default Header
