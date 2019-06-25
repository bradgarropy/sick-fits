import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {ThemeProvider} from "styled-components"
import Meta from "./Meta"
import Header from "./Header"
import GlobalStyles from "../styles/GlobalStyles"
import theme from "../styles/theme"

const PageWrapper = styled.div`
    background: white;
    color: ${({theme}) => theme.black};
`

const Container = styled.div`
    max-width: ${({theme}) => theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
`

const Page = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <PageWrapper>
                <Meta/>
                <Header/>
                <GlobalStyles/>

                <Container>
                    {children}
                </Container>
            </PageWrapper>
        </ThemeProvider>
    )
}

Page.propTypes = {
    children: PropTypes.node,
}

export default Page
