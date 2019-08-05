import React from "react"
import {Mutation} from "react-apollo"
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
    return (
        <Mutation
            mutation={SIGNOUT_MUTATION}
            refetchQueries={[{query: READ_USER_QUERY}]}
        >
            {signout => {
                return (
                    <button onClick={signout}>Signout</button>
                )
            }}
        </Mutation>
    )
}

export default Signout
