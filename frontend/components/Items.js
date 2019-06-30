import React from "react"
import {Query} from "react-apollo"
import {gql} from "apollo-boost"
import styled from "styled-components"
import Item from "./Item"
import {Center} from "../styles"

const GET_ITEMS = gql`
    {
        items {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`

const ItemList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 60px;
    max-width: ${({theme}) => theme.maxWidth};
    margin: 0 auto;
`

const Items = () => {
    return (
        <Center>
            <Query query={GET_ITEMS}>
                {({loading, error, data}) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error: {error.message}</p>

                    const {items} = data

                    return (
                        <ItemList>
                            {items.map(item => <Item key={item.id} item={item}/>)}
                        </ItemList>
                    )
                }}
            </Query>
        </Center>
    )
}

export default Items
