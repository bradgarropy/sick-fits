import React from "react"
import {useState, useEffect} from "react"
import {Query, Mutation} from "react-apollo"
import {gql} from "apollo-boost"
import Router from "next/router"
import {withRouter} from "next/router"
import Error from "./Error"
import {Form} from "../styles"

const READ_ITEM_QUERY = gql`
    query READ_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            id
            title
            description
            price
        }
    }
`

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int
    ) {
        updateItem(
            data: {
                title: $title
                description: $description
                price: $price
            },
            where: {id: $id}
        ) {
            id
            title
            description
            price
        }
    }
`

const UpdateItem = ({router}) => {
    const {id} = router.query
    const [updates, setUpdates] = useState({})

    return (
        <Query query={READ_ITEM_QUERY} variables={{id}}>
            {({loading, error, data}) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error: {error.message}</p>

                const {item} = data

                return (
                    <Mutation mutation={UPDATE_ITEM_MUTATION}>
                        {(updateItem, {loading, error}) => {
                            const onChange = event => {
                                const {name, type, value} = event.target
                                const val = (type === "number") ? parseFloat(value) : value

                                setUpdates({
                                    ...updates,
                                    [name]: val,
                                })
                            }

                            const onSubmit = async event => {
                                event.preventDefault()

                                const response = await updateItem({
                                    variables: {
                                        id: router.query.id,
                                        ...updates
                                    }
                                })

                                Router.push(`/item?id=${response.data.updateItem.id}`)
                            }

                            return (
                                <Form onSubmit={onSubmit}>
                                    <h2>Update your item!</h2>

                                    <Error error={error}/>

                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <label htmlFor="title">
                                            Title
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                placeholder="Title"
                                                defaultValue={item.title}
                                                onChange={onChange}
                                                required
                                                />
                                        </label>

                                        <label htmlFor="description">
                                            Description
                                            <textarea
                                                id="description"
                                                name="description"
                                                placeholder="Describe your item"
                                                defaultValue={item.description}
                                                onChange={onChange}
                                                required
                                                />
                                        </label>

                                        <label htmlFor="price">
                                            Price
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder="0.00"
                                                defaultValue={item.price}
                                                onChange={onChange}
                                                required
                                                />
                                        </label>

                                        <button type="submit">Save</button>
                                    </fieldset>
                                </Form>
                            )
                        }}
                    </Mutation>
                )
            }}
        </Query>
    )
}

export default withRouter(UpdateItem)
export {UPDATE_ITEM_MUTATION}
