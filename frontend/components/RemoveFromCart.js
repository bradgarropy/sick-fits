import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {READ_USER_QUERY} from "./User"

const DELETE_CART_ITEM_MUTATION = gql`
    mutation DELETE_CART_ITEM_MUTATION($id: ID!) {
        removeFromCart(id: $id) {
            id
        }
    }
`

const BigButton = styled.button`
    font-size: 3rem;
    background: none;
    border: 0;

    &:hover {
        color: ${({theme}) => theme.red};
        cursor: pointer;
    }
`

const RemoveFromCart = ({id}) => {
    const [removeFromCart, {loading}] = useMutation(DELETE_CART_ITEM_MUTATION)

    const onClick = () => {
        removeFromCart({
            variables: {id},
            refetchQueries: [{query: READ_USER_QUERY}],
        })
    }

    return (
        <div>
            <BigButton
                disabled={loading}
                title={`Delet${loading ? "ing" : "e"} Item`}
                onClick={onClick}
            >
                &times;
            </BigButton>
        </div>
    )
}

RemoveFromCart.propTypes = {
    id: PropTypes.string.isRequired,
}

export default RemoveFromCart
