const formatPrice = amount => {
    const options = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }

    if (amount % 100 === 0) {
        options.minimumFractionDigits = 0
    }

    const formatter = new Intl.NumberFormat("en-US", options)
    const formatted = formatter.format(amount / 100)

    return formatted
}

const calculateTotal = cart => {
    const totalPrice = cart.reduce((total, cartItem) => {
        if (!cartItem.item) {
            return total
        }

        return total + cartItem.quantity * cartItem.item.price
    }, 0)

    return totalPrice
}

export {formatPrice, calculateTotal}
