import React from "react"
import {useState} from "react"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {Form} from "../styles"
import Error from "./Error"
import {READ_USER_QUERY} from "./User"

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $name: String!
        $email: String!
        $password: String!
    ) {
        signup(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [signup, {loading, error}] = useMutation(SIGNUP_MUTATION, {
        variables: {
            name,
            email,
            password,
        },
        refetchQueries: [{query: READ_USER_QUERY}],
    })

    const onSubmit = async event => {
        event.preventDefault()

        await signup()

        setName("")
        setEmail("")
        setPassword("")
    }

    return (
        <Form method="post" onSubmit={onSubmit}>
            <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign up for an account!</h2>

                <Error error={error}/>

                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        autoComplete="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </label>

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
                        autoComplete="new-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </label>

                <button type="submit">Sign Up!</button>
            </fieldset>
        </Form>
    )
}

export default Signup
