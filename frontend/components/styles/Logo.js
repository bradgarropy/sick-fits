import styled from "styled-components"

const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    z-index: 2;
    transform: skew(-7deg);

    a {
        padding: 0.5rem 1rem;
        background: ${props => props.theme.red};
        color: white;
        text-transform: uppercase;
        text-decoration: none;
    }

    @media (max-width: 1300px) {
        margin: 0;
        text-align: center;
    }
`

export default Logo
