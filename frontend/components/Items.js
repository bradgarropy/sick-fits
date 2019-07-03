import React from "react"
import {Query} from "react-apollo"
import {gql} from "apollo-boost"
import styled from "styled-components"
import Item from "./Item"
import {Center} from "../styles"
import Error from "./Error"

const READ_ITEMS_QUERY = gql`
    query READ_ITEMS_QUERY {
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
            <Query query={READ_ITEMS_QUERY}>
                {({loading, error, data}) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <Error error={error}/>

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
export {READ_ITEMS_QUERY}
