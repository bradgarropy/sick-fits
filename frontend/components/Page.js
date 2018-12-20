import React from "react"
import PropTypes from "prop-types"
import Router from "next/router"
import NProgress from "nprogress"
import {ThemeProvider} from "styled-components"
import {createGlobalStyle} from "styled-components"
import Meta from "./Meta"
import Header from "./Header"
import theme from "./styles/theme"
import StyledPage from "./styles/StyledPage"
import Container from "./styles/Container"

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'radnika_next';
        src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
        font-family: 'radnika_next';
    }
    a {
        text-decoration: none;
        color: ${props => props.theme.black};
    }
    button {
        font-family: 'radnika_next';
    }
`

Router.onRouteChangeStart = () => {
    NProgress.start()
}

Router.onRouteChangeComplete = () => {
    NProgress.done()
}

Router.onRouteChangeError = () => {
    NProgress.done()
}

class Page extends React.Component {
    static propTypes = {children: PropTypes.node}

    state = {}

    render = () => {
        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <GlobalStyle/>
                    <StyledPage>
                        <Meta/>
                        <Header/>
                        <Container>{this.props.children}</Container>
                    </StyledPage>
                </React.Fragment>
            </ThemeProvider>
        )
    }
}

// export
export default Page
