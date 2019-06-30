import styled from "styled-components"

const ItemButtons = styled.div`
    display: grid;
    width: 100%;
    border-top: 1px solid ${({theme}) => theme.lightGrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${({theme}) => theme.lightGrey};

    & > * {
        background: white;
        border: 0;
        font-family: 'radnika_next';
        font-size: 1rem;
        padding: 1rem;
    }
`

export {ItemButtons}
