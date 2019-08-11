import React from "react"
import {useState} from "react"
import {useRouter} from "next/router"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {Form} from "../styles"
import Error from "./Error"
import {READ_USER_QUERY} from "./User"

const RESET_MUTATION = gql`
    mutation RESET_MUTATION(
        $token: String!
        $password: String!
        $confirmPassword: String!
    ) {
        reset(
            token: $token
            password: $password
            confirmPassword: $confirmPassword
        ) {
            id
            name
            email
        }
    }
`

const Reset = () => {
    const router = useRouter()
    const {token} = router.query

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [reset, {loading, error}] = useMutation(RESET_MUTATION, {
        variables: {
            token,
            password,
            confirmPassword,
        },
        refetchQueries: [{query: READ_USER_QUERY}],
    })

    const onSubmit = async event => {
        event.preventDefault()

        await reset()

        setPassword("")
        setConfirmPassword("")
    }

    return (
        <Form method="post" onSubmit={onSubmit}>
            <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset your password!</h2>

                <Error error={error}/>

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

                <label htmlFor="confirmPassword">
                    Confirm Password
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={event =>
                            setConfirmPassword(event.target.value)
                        }
                    />
                </label>

                <button type="submit">Reset!</button>
            </fieldset>
        </Form>
    )
}

export default Reset
