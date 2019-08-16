import React from "react"
import PropTypes from "prop-types"
import {useMutation} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import {READ_ITEMS_QUERY} from "./Items"

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(where: {id: $id}) {
            id
        }
    }
`

const DeleteItem = ({children, id}) => {
    const update = cache => {
        const data = cache.readQuery({query: READ_ITEMS_QUERY})
        data.items = data.items.filter(item => item.id !== id)
        cache.writeQuery({query: READ_ITEMS_QUERY, data})
    }

    const [deleteItem, {error}] = useMutation(DELETE_ITEM_MUTATION)
    error && alert(error)

    const onClick = async() => {
        if (confirm("Are you sure you want to delete this item?")) {
            deleteItem({variables: {id}})
        }
    }

    return <button onClick={onClick}>{children}</button>
}

DeleteItem.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
}

export default DeleteItem
