const totalItems = order => {
    const total = order.items.reduce((total, item) => total + item.quantity, 0)
    return total
}

export {totalItems}
