import {formatPrice} from "../utils/money"

describe("format price", () => {
    test("with single digit cents", () => {
        const price = formatPrice(5)
        expect(price).toEqual("$0.05")
    })

    test("with double digit cents", () => {
        const price = formatPrice(23)
        expect(price).toEqual("$0.23")
    })

    test("with multiple of ten cents", () => {
        const price = formatPrice(40)
        expect(price).toEqual("$0.40")
    })

    test("single digit without cents", () => {
        const price = formatPrice(200)
        expect(price).toEqual("$2")
    })

    test("single digit with cents", () => {
        const price = formatPrice(205)
        expect(price).toEqual("$2.05")
    })

    test("double digit without cents", () => {
        const price = formatPrice(3300)
        expect(price).toEqual("$33")
    })

    test("double digit with cents", () => {
        const price = formatPrice(1234)
        expect(price).toEqual("$12.34")
    })
})
