import React from "react"
import PropTypes from "prop-types"
import Meta from "./Meta"
import Header from "./Header"

const Page = ({children}) => {
    return (
        <>
            <Meta/>
            <Header/>
            {children}
        </>
    )
}

Page.propTypes = {
    children: PropTypes.node,
}

export default Page
