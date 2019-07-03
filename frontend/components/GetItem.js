import React from "react"
import PropTypes from "prop-types"
import {Query} from "react-apollo"
import {gql} from "apollo-boost"
import {withRouter} from "next/router"
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

const GetItem = ({router}) => {
    const {id} = router.query

    return (
        <Query query={READ_ITEM_QUERY} variables={{id}}>
            {({loading, error, data}) => {
                const {item} = data
                if (loading) return <p>Loading...</p>
                if (error) return <Error error={error}/>
                if (!item) return <p>No item found for {id}</p>

                return (
                    <>
                        <Head>
                            <title>Sick Fits | {item.title}</title>
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
            }}
        </Query>
    )
}

GetItem.propTypes = {

}

export default withRouter(GetItem)
