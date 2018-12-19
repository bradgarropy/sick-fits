import React from "react"
import Link from "next/link"
import StyledHeader from "./styles/StyledHeader"
import Logo from "./styles/Logo"
import Navigation from "./Navigation"

const Header = () => {
    return (
        <StyledHeader>
            <div className="bar">
                <Logo>
                    <Link href="/">
                        <a>Sick Fits</a>
                    </Link>
                </Logo>
                <Navigation/>
            </div>

            <div className="sub-bar">
                <p>Search</p>
            </div>

            <div>Cart</div>
        </StyledHeader>
    )
}

Header.propTypes = {}

// export
export default Header
