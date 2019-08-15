import React from "react"
import Permissions from "../components/Permissions"
import PleaseSignIn from "../components/PleaseSignIn"

const PermissionsPage = () => {
    return (
        <PleaseSignIn>
            <Permissions/>
        </PleaseSignIn>
    )
}

export default PermissionsPage
