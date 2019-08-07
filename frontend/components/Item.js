import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import format from "../utils/money"
import DeleteItem from "./DeleteItem"
import {ItemWrapper, ItemTitle, ItemButtons, PriceTag} from "../styles"

const Item = ({item}) => {
    const {id, title, price, description, image} = item

    return (
        <ItemWrapper>
            {image && <img src={image} alt={title}/>}

            <ItemTitle>
                <Link href={`/item/${id}`}>
                    <a>{title}</a>
                </Link>
            </ItemTitle>

            <PriceTag>{format(price)}</PriceTag>

            <p>{description}</p>

            <ItemButtons>
                <Link href={`/update/${id}`}>
                    <a>Edit ✍🏼</a>
                </Link>

                <button>Add To Cart 🛒</button>
                <DeleteItem id={id}>Delete ❌</DeleteItem>
            </ItemButtons>
        </ItemWrapper>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
}

export default Item
