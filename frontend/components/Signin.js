import React from "react"
import {useState} from "react"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {Form} from "../styles"
import Error from "./Error"
import {READ_USER_QUERY} from "./User"

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            name
            email
        }
    }
`

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [signin, {loading, error}] = useMutation(SIGNIN_MUTATION, {
        variables: {
            email,
            password,
        },
        refetchQueries: [{query: READ_USER_QUERY}],
    })

    const onSubmit = async event => {
        event.preventDefault()

        await signin()
        setEmail("")
        setPassword("")
    }

    return (
        <Form method="post" onSubmit={onSubmit}>
            <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign in to your account!</h2>

                <Error error={error}/>

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

                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </label>

                <button type="submit">Sign In!</button>
            </fieldset>
        </Form>
    )
}

export default Signin
