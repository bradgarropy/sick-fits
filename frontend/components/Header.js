import React from "react"
import Link from "next/link"
import Router from "next/router"
import styled from "styled-components"
import Navigation from "./Navigation"
import NProgress from "nprogress"

Router.onRouteChangeStart = () => {
    NProgress.start()
}

Router.onRouteChangeComplete = () => {
    NProgress.done()
}

Router.onRouteChangeError = () => {
    NProgress.done()
}

const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);

    a {
        padding: 0.5rem 1rem;
        background: ${({theme}) => theme.red};
        color: white;
        transform: uppercase;
        text-decoration: none;
    }

    @media(max-width: 1300px) {
        margin: 0;
        text-align: center;
    }
`

const HeaderWrapper = styled.header`
    .bar {
        border-bottom: 10px solid ${({theme}) => theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;

        @media(max-width: 1300px) {
            grid-template-columns: 1fr;
            justify-content: center;
        }
    }

    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid ${({theme}) => theme.lightGrey};
    }
`

const Header = () => {
    return (
        <HeaderWrapper>
            <div className="bar">
                <Logo>
                    <Link href="/">
                        <a>Sick Fits</a>
                    </Link>
                </Logo>

                <Navigation/>
            </div>

            <div className="sub-bar">Search</div>

            <div>Cart</div>
        </HeaderWrapper>
    )
}

export default Header
