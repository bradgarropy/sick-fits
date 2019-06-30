import React from "react"
import {useState} from "react"
import {Mutation} from "react-apollo"
import {gql} from "apollo-boost"
import Router from "next/router"
import Error from "../components/Error"
import {Form} from "../styles"

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
    ) {
        createItem(data: {
            title: $title
            description: $description
            price: $price
        }) {
            id
            title
            description
            price
        }
    }
`

const ItemForm = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)

    return (
        <Mutation mutation={CREATE_ITEM_MUTATION}>
            {(createItem, {loading, error}) => {
                return (
                    <Form onSubmit={async event => {
                        event.preventDefault()

                        const response = await createItem({
                            variables: {
                                title,
                                description,
                                price
                            }
                        })

                        const {id} = response.data.createItem
                        Router.push(`/item?id=${id}`)

                    }}>
                        <h2>Sell something!</h2>

                        <Error error={error}/>

                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    value={title}
                                    onChange={event => setTitle(event.target.value)}
                                    required
                                    />
                            </label>

                            <label htmlFor="description">
                                Description
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe your item"
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
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
                                    value={price}
                                    onChange={event => setPrice(parseFloat(event.target.value))}
                                    required
                                    />
                            </label>

                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )
            }}
        </Mutation>
    )
}

export default ItemForm
export {CREATE_ITEM_MUTATION}
