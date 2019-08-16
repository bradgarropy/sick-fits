import React from "react"
import PermissionsTable from "../components/PermissionsTable"
import PleaseSignIn from "../components/PleaseSignIn"

const PermissionsPage = () => {
    return (
        <PleaseSignIn>
            <PermissionsTable/>
        </PleaseSignIn>
    )
}

export default PermissionsPage
