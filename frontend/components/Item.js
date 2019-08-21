import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import {formatPrice} from "../utils/money"
import DeleteItem from "./DeleteItem"
import AddToCart from "./AddToCart"
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

            <PriceTag>{formatPrice(price)}</PriceTag>

            <p>{description}</p>

            <ItemButtons>
                <Link href={`/update/${id}`}>
                    <a>Edit ✍🏼</a>
                </Link>

                <AddToCart id={id}/>
                <DeleteItem id={id}>Delete ❌</DeleteItem>
            </ItemButtons>
        </ItemWrapper>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
}

export default Item
