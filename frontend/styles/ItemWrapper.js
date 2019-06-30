import styled from "styled-components"

const ItemWrapper = styled.div`
    background: white;
    border: 1px solid ${({theme}) => theme.offWhite};
    box-shadow: ${({theme}) => theme.shadow};
    position: relative;
    display: flex;
    flex-direction: column;

    img {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }

    p {
        font-size: 12px;
        line-height: 2;
        font-weight: 300;
        flex-grow: 1;
        padding: 0 3rem;
        font-size: 1.5rem;
    }
`

export {ItemWrapper}
