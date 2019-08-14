import React from "react"
import CreateItem from "../components/CreateItem"
import PleaseSignIn from "../components/PleaseSignIn"

const SellPage = () => {
    return (
        <PleaseSignIn>
            <CreateItem/>
        </PleaseSignIn>
    )
}

export default SellPage
