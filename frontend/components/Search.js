import React from "react"
import Downshift from "downshift"
import {resetIdCounter} from "downshift"
import {useLazyQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import debounce from "lodash.debounce"
import {DropDown, DropDownItem, SearchStyles} from "../styles"
import Router from "next/router"

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($text: String!) {
        items(
            where: {
                OR: [{title_contains: $text}, {description_contains: $text}]
            }
        ) {
            id
            title
            image
        }
    }
`

const Search = () => {
    const [search, {called, loading, data}] = useLazyQuery(SEARCH_ITEMS_QUERY)

    const onChange = debounce(async event => {
        await search({variables: {text: event.target.value}})
    }, 350)

    const onSelect = item => {
        Router.push(`/item/${item.id}`)
    }

    resetIdCounter()

    return (
        <SearchStyles>
            <Downshift
                itemToString={item => (item ? item.title : "")}
                onChange={onSelect}
            >
                {({
                    getInputProps,
                    getItemProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                }) => {
                    return (
                        <div>
                            <input
                                {...getInputProps({
                                    id: "search",
                                    type: "search",
                                    placeholder: "Search for an item!",
                                    className: loading ? "loading" : "",
                                    onChange: event => {
                                        event.persist()
                                        onChange(event)
                                    },
                                })}
                            />

                            {isOpen && (
                                <DropDown>
                                    {called &&
                                        !loading &&
                                        data.items &&
                                        data.items.map((item, index) => {
                                            return (
                                                <DropDownItem
                                                    key={item.id}
                                                    highlighted={
                                                        index ===
                                                        highlightedIndex
                                                    }
                                                    {...getItemProps({item})}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        width="50"
                                                    />
                                                    {item.title}
                                                </DropDownItem>
                                            )
                                        })}

                                    {called &&
                                        !loading &&
                                        !data.items.length && (
                                            <DropDownItem>
                                                Nothing found for {inputValue}
                                            </DropDownItem>
                                        )}
                                </DropDown>
                            )}
                        </div>
                    )
                }}
            </Downshift>
        </SearchStyles>
    )
}

export default Search
