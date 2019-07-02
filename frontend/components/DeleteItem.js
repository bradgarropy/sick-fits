import React from "react"
import PropTypes from "prop-types"

const DeleteItem = ({children}) => {
    const onClick = () => {

    }

    return (
        <button>{children}</button>
    )
}

DeleteItem.propTypes = {
    children: PropTypes.node,
}

export default DeleteItem
