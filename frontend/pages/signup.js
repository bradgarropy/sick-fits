import React from "react"
import styled from "styled-components"
import Signup from "../components/Signup"
import Signin from "../components/Signin"

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 20px;
`

const SignupPage = () => {
    return (
        <Columns>
            <Signup/>
            <Signin/>
        </Columns>
    )
}

export default SignupPage
