const totalItems = cart => {
    const total = cart.reduce((total, cartItem) => total + cartItem.quantity, 0)
    return total
}

export {totalItems}
