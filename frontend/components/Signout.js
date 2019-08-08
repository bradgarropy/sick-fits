import React from "react"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {READ_USER_QUERY} from "./User"

const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signout {
            message
        }
    }
`

const Signout = () => {
    const [signout] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{query: READ_USER_QUERY}],
    })

    return <button onClick={signout}>Signout</button>
}

export default Signout
