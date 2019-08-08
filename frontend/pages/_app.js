import React from "react"
import App from "next/app"
import {Container} from "next/app"
import Page from "../components/Page"
import {ApolloProvider} from "@apollo/react-hooks"
import withApollo from "../utils/with-apollo"

class MyApp extends App {
    render() {
        const {Component, pageProps, apolloClient} = this.props

        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Page>
                        <Component {...pageProps}/>
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withApollo(MyApp)
