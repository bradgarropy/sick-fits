import React from "react"
import {useState} from "react"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import Router from "next/router"
import Error from "./Error"
import {Form} from "../styles"

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String!
        $largeImage: String!
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
            title
            description
            price
            image
            largeImage
        }
    }
`

const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [largeImage, setLargeImage] = useState("")
    const [createItem, {loading, error}] = useMutation(CREATE_ITEM_MUTATION)

    const onSubmit = async event => {
        event.preventDefault()

        const response = await createItem({
            variables: {
                title,
                description,
                price,
                image,
                largeImage,
            },
        })

        const {id} = response.data.createItem
        Router.push(`/item/${id}`)
    }

    const uploadFile = async event => {
        const file = event.target.files[0]
        const data = new FormData()

        data.append("file", file)
        data.append("upload_preset", "sick-fits")

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/bradgarropy/image/upload",
            {method: "POST", body: data},
        )

        const images = await response.json()
        const image = images.url
        const largeImage = images.eager[0].url

        setImage(image)
        setLargeImage(largeImage)
    }

    return (
        <Form method="post" onSubmit={onSubmit}>
            <h2>Sell something!</h2>

            <Error error={error} />

            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="image">
                    Image
                    <input
                        type="file"
                        id="image"
                        name="image"
                        placeholder="Upload an image"
                        onChange={uploadFile}
                        required
                    />
                    {image && (
                        <img src={image} alt="upload preview" width="200" />
                    )}
                </label>

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
                        onChange={event =>
                            setPrice(parseFloat(event.target.value))
                        }
                        required
                    />
                </label>

                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    )
}

export default CreateItem
export {CREATE_ITEM_MUTATION}
