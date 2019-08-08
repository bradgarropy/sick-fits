import React from "react"
import {useState} from "react"
import {useMutation} from "@apollo/react-hooks"
import {useQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {useRouter} from "next/router"
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
            data: {title: $title, description: $description, price: $price}
            where: {id: $id}
        ) {
            id
            title
            description
            price
        }
    }
`

const UpdateItem = () => {
    const router = useRouter()
    const {id} = router.query
    const [updates, setUpdates] = useState({})

    const {loading: queryLoading, error: queryError, data} = useQuery(
        READ_ITEM_QUERY,
        {variables: {id}},
    )

    const [
        updateItem,
        {loading: mutationLoading, error: mutationError},
    ] = useMutation(UPDATE_ITEM_MUTATION)

    if (queryLoading) {
        return <p>Loading...</p>
    }

    if (queryError) {
        return <Error error={queryError}/>
    }

    const {item} = data
    const onChange = event => {
        const {name, type, value} = event.target
        const val = type === "number" ? parseFloat(value) : value

        setUpdates({
            ...updates,
            [name]: val,
        })
    }

    const onSubmit = async event => {
        event.preventDefault()

        await updateItem({
            variables: {
                id: router.query.id,
                ...updates,
            },
        })
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Update your item!</h2>

            <Error error={mutationError}/>

            <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
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

                <button type="submit">
                    {mutationLoading ? "Saving" : "Save"}
                </button>
            </fieldset>
        </Form>
    )
}

export default UpdateItem
export {UPDATE_ITEM_MUTATION}
