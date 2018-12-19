import React from "react"
import PropTypes from "prop-types"
import {ThemeProvider} from "styled-components"
import Meta from "./Meta"
import Header from "./Header"
import theme from "./styles/theme"
import StyledPage from "./styles/StyledPage"
import Container from "./styles/Container"

class Page extends React.Component {
    static propTypes = {children: PropTypes.node}

    state = {}

    render = () => {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta/>
                    <Header/>
                    <Container>{this.props.children}</Container>
                </StyledPage>
            </ThemeProvider>
        )
    }
}

// export
export default Page
