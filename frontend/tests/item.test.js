import React from "react"
import {render} from "@testing-library/react"
import Item from "../components/Item"

const item = {
    id: "abc123",
    title: "cool item",
    price: 5000,
    description: "this item is really cool!",
    image: "dog.jpg",
    largeImage: "large-dog.jpg",
}

describe("<Item>", () => {
    test("snapshot", () => {
        const {container} = render(<Item item={item}/>)

        expect(container).toMatchSnapshot()
    })

    test("title", () => {
        const {getByText} = render(<Item item={item}/>)
        const title = getByText(item.title)

        expect(title.tagName).toEqual("A")
    })

    test("price", () => {
        const {getByText} = render(<Item item={item}/>)
        const price = getByText("$50")

        expect(price.tagName).toEqual("SPAN")
    })

    test("image", () => {
        const {getByAltText} = render(<Item item={item}/>)
        const image = getByAltText(item.title)

        expect(image.tagName).toEqual("IMG")
        expect(image.attributes.src.value).toEqual(item.image)
    })

    test("buttons", () => {
        const {getByText} = render(<Item item={item}/>)
        const editButton = getByText(/Edit/)
        const addToCartButton = getByText(/Add To Cart/)
        const deleteButton = getByText(/Delete/)

        expect(editButton.tagName).toEqual("A")
        expect(addToCartButton.tagName).toEqual("BUTTON")
        expect(deleteButton.tagName).toEqual("BUTTON")
    })
})
