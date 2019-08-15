import React from "react"
import {useQuery} from "@apollo/react-hooks"
import {READ_USER_QUERY} from "./User"
import Signin from "./Signin"

const PleaseSignIn = props => {
    const {loading, data} = useQuery(READ_USER_QUERY)
    const {me} = data

    if (loading) {
        return <p>Loading...</p>
    }

    if (!me) {
        return (
            <>
                <p>Please sign in to continue.</p>
                <Signin/>
            </>
        )
    }

    return props.children
}

export default PleaseSignIn
