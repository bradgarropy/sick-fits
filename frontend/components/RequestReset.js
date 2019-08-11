import React from "react"
import {useState} from "react"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {Form} from "../styles"
import Error from "./Error"
import {READ_USER_QUERY} from "./User"

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`

const RequestReset = () => {
    const [email, setEmail] = useState("")

    const [reset, {loading, error, called}] = useMutation(
        REQUEST_RESET_MUTATION,
        {
            variables: {email},
            refetchQueries: [{query: READ_USER_QUERY}],
        },
    )

    const onSubmit = async event => {
        event.preventDefault()

        await reset()
        setEmail("")
    }

    return (
        <Form method="post" onSubmit={onSubmit}>
            <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset your password!</h2>

                <Error error={error}/>

                {!error && !loading && called && (
                    <p>Check your email for a link to reset your password!</p>
                )}

                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        autoComplete="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </label>

                <button type="submit">Reset!</button>
            </fieldset>
        </Form>
    )
}

export default RequestReset
