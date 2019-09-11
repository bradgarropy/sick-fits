import React from "react"
import {useRouter} from "next/router"
import {render} from "@testing-library/react"
import {MockedProvider} from "@apollo/react-testing"
import wait from "waait"
import GetItem, {READ_ITEM_QUERY} from "../components/GetItem"
import {mockItem} from "./utils"

jest.mock("next/router")

describe("<GetItem>", () => {
    test("renders", async() => {
        useRouter.mockImplementation(() => ({
            query: {
                id: mockItem.id,
            },
        }))

        const mock = {
            request: {
                query: READ_ITEM_QUERY,
                variables: {id: mockItem.id},
            },
            result: {
                data: {item: mockItem},
            },
        }

        const {debug, getByText} = render(
            <MockedProvider mocks={[mock]} addTypename={false}>
                <GetItem/>
            </MockedProvider>,
        )

        const loading = getByText("Loading...")
        expect(loading.tagName).toEqual("P")

        await wait()
        debug()
    })
})
