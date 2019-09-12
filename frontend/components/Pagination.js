import React from "react"
import Link from "next/link"
import styled from "styled-components"
import {gql} from "apollo-boost"
import {useQuery} from "@apollo/react-hooks"
import Head from "next/head"
import {useRouter} from "next/router"
import Error from "./Error"

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`

const PaginationWrapper = styled.div`
    text-align: center;
    display: inline-grid;
    grid-template-columns: repeat(4, auto);
    align-items: stretch;
    justify-content: center;
    align-content: center;
    margin: 2rem 0;
    border: 1px solid ${props => props.theme.lightgrey};
    border-radius: 10px;

    & > * {
        margin: 0;
        padding: 15px 30px;
        border-right: 1px solid ${props => props.theme.lightgrey};

        &:last-child {
            border-right: 0;
        }
    }

    a[aria-disabled="true"] {
        color: grey;
        pointer-events: none;
    }
`

const Pagination = () => {
    const router = useRouter()
    const page =
        Object.keys(router.query).length > 0 ? parseInt(router.query.page) : 1

    const {loading, error, data} = useQuery(PAGINATION_QUERY)

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <Error error={error} />
    }

    const {count} = data.itemsConnection.aggregate
    const pages = Math.ceil(count / process.env.pagination.perPage)

    return (
        <PaginationWrapper>
            <Head>
                <title>
                    Sick Fits! | Page {page} of {pages}
                </title>
            </Head>

            <Link href={`/shop/page/${page - 1}`}>
                <a aria-disabled={page <= 1}>👈🏼 Prev</a>
            </Link>

            <p>
                Page {page} of {pages}
            </p>
            <p>{count} Items</p>

            <Link href={`/shop/page/${page + 1}`}>
                <a aria-disabled={page >= pages}>Next 👉🏼</a>
            </Link>
        </PaginationWrapper>
    )
}

Pagination.propTypes = {}

export default Pagination
