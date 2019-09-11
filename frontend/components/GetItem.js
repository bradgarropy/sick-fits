import React from "react"
import {useQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {useRouter} from "next/router"
import styled from "styled-components"
import Error from "./Error"
import Head from "next/head"

const ItemWrapper = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${({theme}) => theme.shadow};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`

const READ_ITEM_QUERY = gql`
    query READ_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            id
            title
            price
            description
            largeImage
        }
    }
`

const GetItem = () => {
    const router = useRouter()
    const {id} = router.query

    const {loading, error, data} = useQuery(READ_ITEM_QUERY, {variables: {id}})

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <Error error={error}/>
    }

    const {item} = data

    if (!item) {
        return <p>No item found for {id}</p>
    }

    return (
        <>
            <Head>
                <title>Sick Fits! | {item.title}</title>
            </Head>

            <ItemWrapper>
                <img src={item.largeImage} alt={item.title}/>
                <div className="details">
                    <h2>Viewing {item.title}</h2>
                    <p>{item.description}</p>
                </div>
            </ItemWrapper>
        </>
    )
}

export default GetItem
export {READ_ITEM_QUERY}
